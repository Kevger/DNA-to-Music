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
  noteTableCodons,
  createRandomNoteTable
} from "./noteTables";

const Tone = require("tone");

export const usedInstruments = [
  "piano",
  "guitar-acoustic",
  "guitar-electric",
  "guitar-nylon",
  "bass-electric",
  "xylophone",
  "violin",
  "cello",
  "contrabass",
  "harp",
  "flute",
  "clarinet",
  "saxophone",
  "trombone",
  "trumpet",
  "tuba",
  "organ",
  "bassoon",
  "french-horn",
  "harmonium"
];
export const availableSynthesizers = ["MonoSynth", "MembraneSynth"].concat(
  usedInstruments
);
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
  Tone.Master.volume.value = -35 + (settings.volume / 100) * 50;
  speechVolume = settings.volume / 100;
  speechSpeed = (settings.bpm / 300) * 4;
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
  Bases: (dna, config, callback) => {
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
  "Amino acids": (dna, config, callback) => {
    const synthesizer = config.synthesizer;
    let noteList;
    if ("random" == config.specificConfig) {
      noteList = createRandomNoteTable(
        Object.keys(noteTableAminos[Object.keys(noteTableAminos)[0]])
      );
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
    let noteList;
    if ("random" == config.specificConfig) {
      noteList = createRandomNoteTable(
        Object.keys(noteTableCodons[Object.keys(noteTableCodons)[0]])
      );
    } else {
      noteList = noteTableCodons[config.specificConfig];
    }
    const notes = extractCodons(dna, 3, 3).map(a => noteList[a]);
    const synth = createSynth(config.synthesizer);
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
  },
  Speech: (dna, config, callbackEnd) => {
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
      case "Amino acids":
        text = getAminos(extractCodons(dna, 3, 3))
          .map(s => AANames[s])
          .join(" ");
        break;
      case "Text":
        text = dnaToText(dna);
        break;
      case "Lyric":
        text = dnaToText(dna, dnaLyricTable);
        break;
      default:
        console.log("unknown synthesizer");
        callbackEnd();
        return undefined;
    }

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
  }
};
