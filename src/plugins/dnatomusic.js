import {
  extractCodons,
  getAminos,
  dnaToText,
  AANames,
  dnaLyricTable
} from "./dnaConverter";
import { SampleLibrary } from "./Tonejs-Instruments";
import {
  noteTableBases,
  noteTableAminos,
  createRandomNoteTable
} from "./noteTables";

const Tone = require("tone");

export const usedInstruments = [
  "piano",
  "bass-electric",
  "bassoon",
  "cello",
  "clarinet",
  "contrabass",
  "flute",
  "french-horn",
  "guitar-acoustic",
  "guitar-electric",
  "guitar-nylon",
  "harmonium",
  "harp",
  "organ",
  "saxophone",
  "trombone",
  "trumpet",
  "tuba",
  "violin",
  "xylophone"
];
export const availableSynthesizers = [
  "PolySynth",
  "MonoSynth",
  "MembraneSynth",
  "PluckSynth"
].concat(usedInstruments);
let instruments;

let isSpeech = false;
let isTone = false;
let speechVolume = 0.5;
let speechSpeed = 1;
let voices = window.speechSynthesis.getVoices();

export function loadInstruments(callback) {
  instruments = SampleLibrary.load({
    instruments: usedInstruments,
    minify: false
  });
  Tone.Buffer.on("load", callback);
}

export function setSettings(settings) {
  Tone.Transport.bpm.value = settings.bpm;
  Tone.Master.volume.value = -25 + (settings.volume / 100) * 50;
  speechVolume = settings.volume / 100;
  speechSpeed = (settings.bpm / 400) * 4;
}

export function getVoices() {
  voices = window.speechSynthesis.getVoices();
  return voices.map(voice => voice.name);
}

export function startMusic() {
  if (isSpeech) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }
  if (isTone) {
    Tone.Transport.loop = false;
    Tone.Transport.start();
  }
}
export function stopMusic() {
  if (window.speechSynthesis.speaking) window.speechSynthesis.pause();
  Tone.Transport.pause();
}
export function resetMusic() {
  window.speechSynthesis.cancel();
  Tone.Transport.stop();
  Tone.Transport.cancel();
  isTone = false;
  isSpeech = false;
}

function createSynth(synthesizer) {
  isTone = true;
  if (usedInstruments.includes(synthesizer))
    return instruments[synthesizer].toMaster();
  else return new Tone[synthesizer]({ polyphony: 4 }).toMaster();
}

export const interpretations = {
  Sprache: (dna, config, callbackEnd) => {
    const type = config.specificConfig;
    const voice = config.synthesizer;
    let text = "";
    switch (type) {
      case "DNA":
        text = [...dna].join(" ").replace(/U/g, "T");
        break;
      case "Codon":
        text = extractCodons(dna, 3, 3)
          .join(" ")
          .toLowerCase()
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        break;
      case "Amino":
        text = getAminos(extractCodons(dna, 3, 3))
          .map(s => AANames[s])
          .join(" ");
        break;
      case "Human":
        text = dnaToText(dna);
        break;
      case "Gedicht":
        text = dnaToText(dna, dnaLyricTable);
        break;
      default:
        console.log("unknown synthesizer");
        callbackEnd();
        return undefined;
    }
    console.log(text);

    window.speechSynthesis.cancel();
    if ("speechSynthesis" in window) {
      isSpeech = true;
      const speechUtterance = new SpeechSynthesisUtterance(text);
      speechUtterance.volume = speechVolume;
      speechUtterance.rate = speechSpeed;
      speechUtterance.onend = callbackEnd;
      speechUtterance.voice = voices.filter(v => v.name == voice)[0];
      return { start: () => window.speechSynthesis.speak(speechUtterance) };
    } else {
      console.log("speech synthesis not supported - please update browser");
      callbackEnd();
      return undefined;
    }
  },
  Basen: (dna, config, callback) => {
    const synthesizer = config.synthesizer;
    let noteList;
    if ("random" == config.specificConfig) {
      noteList = createRandomNoteTable(["A", "U", "G", "C"]);
    } else {
      noteList = noteTableBases[config.specificConfig];
    }

    const notes = [...dna].map(base => noteList[base]);
    const synth = createSynth(synthesizer);
    let i = 0;
    const maxIndex = notes.length - 1;

    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, config.noteValue, time);
        Tone.Draw.schedule(() => {
          callback({
            base: dna.charAt(i),
            note: note,
            i: i,
            maxIndex: maxIndex,
            amino: "",
            key: config.key
          });
          if (++i >= dna.length) i = 0;
        }, time);
      },
      notes,
      config.tempo
    );
    return synthPart;
  },
  Aminos: (dna, config, callback) => {
    const synthesizer = config.synthesizer;
    let noteList;
    if ("random" == config.specificConfig) {
      noteList = createRandomNoteTable(Object.keys(noteTableAminos[1]));
    } else {
      noteList = noteTableAminos[config.specificConfig];
    }
    const sequenceCreator = (synthesizer, dna, speed) => {
      const aminos = getAminos(extractCodons(dna, 3, 3));
      const notes = aminos.map(a => noteList[a]);
      const synth = createSynth(synthesizer);
      let i = 0;
      const maxIndex = aminos.length - 1;
      const synthPart = new Tone.Sequence(
        function(time, note) {
          synth.triggerAttackRelease(note, speed, time);
          Tone.Draw.schedule(() => {
            callback({
              note: note,
              base: [...dna.slice(i * 3, i * 3 + 3)],
              amino: aminos[i],
              i: i,
              maxIndex: maxIndex,
              key: config.key
            });
            if (++i >= aminos.length) i = 0;
          }, time);
        },
        notes,
        config.tempo
      );

      return synthPart;
    };

    return sequenceCreator(synthesizer, dna, config.noteValue);
  },
  Codons: (dna, config, callback) => {
    const synthesizer = config.synthesizer;
    const codonTable = {
      UUU: "A0",
      UUC: "A1",
      UUA: "A2",
      UUG: "A3",

      UCU: "A4",
      UCC: "A5",
      UCA: "A6",
      UCG: "A7",

      UAU: "B0",
      UAC: "B1",
      UAA: "B2",
      UAG: "B3",

      UGU: "B4",
      UGC: "B5",
      UGA: "B6",
      UGG: "B7",

      CUU: "C8",
      CUC: "C1",
      CUA: "C2",
      CUG: "C3",

      CCU: "C4",
      CCC: "C5",
      CCA: "C6",
      CCG: "C7",

      CAU: "D8",
      CAC: "D1",
      CAA: "D2",
      CAG: "D3",

      CGU: "D4",
      CGC: "D5",
      CGA: "D6",
      CGG: "D7",

      AUU: "E1",
      AUC: "E2",
      AUA: "E3",
      AUG: "E4",

      ACU: "E5",
      ACC: "E6",
      ACA: "E7",
      ACG: "E8",

      AAU: "F1",
      AAC: "F2",
      AAA: "F3",
      AAG: "F4",

      AGU: "F5",
      AGC: "F6",
      AGA: "F7",
      AGG: "F8",

      GUU: "G1",
      GUC: "G2",
      GUA: "G3",
      GUG: "G4",

      GCU: "G5",
      GCC: "G6",
      GCA: "G7",
      GCG: "G8",

      GAU: "A#2",
      GAC: "D#3",
      GAA: "C#5",
      GAG: "D#4",

      GGU: "C#4",
      GGC: "F#4",
      GGA: "G#4",
      GGG: "D#5"
    };
    const notes = extractCodons(dna, 3, 3).map(a => codonTable[a]);
    const synth = createSynth(synthesizer);
    let i = 0;
    const maxIndex = notes.length - 1;
    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, config.noteValue, time);
        Tone.Draw.schedule(() => {
          callback({
            config: config,
            note: note,
            base: [...dna.slice(i * 3, i * 3 + 3)],
            i: i,
            maxIndex: maxIndex,
            key: config.key
          });
          if (++i >= notes.length) i = 0;
        }, time);
      },
      notes,
      config.tempo
    );

    return synthPart;
  }
};
