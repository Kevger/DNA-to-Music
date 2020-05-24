import {
  dnaLyricTable,
  dnaRnaTable,
  codonTable,
  dnaTextTable
} from "./dnaConverter";

export const availableNotes = [
  null,
  "A0",
  "A#0",
  "B0",
  "C1",
  "C#1",
  "C1",
  "D1",
  "E1",
  "F1",
  "G1",
  "G#1",
  "A1",
  "A#1",
  "B1",
  "C2",
  "C#2",
  "D2",
  "D#2",
  "E2",
  "F2",
  "F#2",
  "G2",
  "G#2",
  "A2",
  "A#2",
  "B2",
  "C3",
  "C#3",
  "D3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
  "C#5",
  "D5",
  "D#5",
  "E5",
  "F5",
  "F#5",
  "G5",
  "G#5",
  "A5",
  "A#5",
  "B5",
  "C6",
  "C#6",
  "D6",
  "D#6",
  "E6",
  "F6",
  "F#6",
  "G6",
  "G#6",
  "A6",
  "A#6",
  "B6",
  "C7",
  "C#7",
  "D7",
  "D#7",
  "E7",
  "F7",
  "F#7",
  "G7",
  "G#7",
  "A7",
  "A#7",
  "B7",
  "C8",
  "C#8",
  "D8",
  "D#8",
  "E8",
  "F8",
  "F#8",
  "G8",
  "G#8",
  "A8",
  "A#8",
  "B8",
  "C9",
  "C#9",
  "D9",
  "D#9",
  "E9",
  "F9",
  "F#9",
  "G9",
  "G#9"
];

export const speechTable = {
  DNA: dnaRnaTable,
  Codon: codonTable,
  "Amino acids": codonTable,
  Lyric: dnaLyricTable,
  Text: dnaTextTable
};

export const noteTableBases = {
  "C4 E4 G4 B4": {
    A: "C4",
    U: "E4",
    C: "G4",
    G: "B4"
  },
  "C#4 E#4 G#4 B#4": {
    A: "C#4",
    U: "E#4",
    C: "G#4",
    G: "B#4"
  },
  "C3 Eb3 G3 Bb3": {
    A: "C3",
    U: "Eb3",
    C: "G3",
    G: "Bb3"
  },
  "C1 E1 G1 B1": {
    A: "C1",
    U: "E1",
    C: "G1",
    G: "B1"
  },
  "G3 G5 C6  ": {
    A: "G3",
    U: "G5",
    C: "C6",
    G: null
  },
  random: {}
};

export const noteTableAminos = {
  "Default 1": {
    phe: "A1",
    leu: "A2",
    ser: "A3",
    tyr: "A4",
    cys: "C1",
    trp: "C2",
    pro: "C3",
    his: "C4",
    gln: "D1",
    arg: "D2",
    ile: "D3",
    thr: "D4",
    asn: "G1",
    lys: "G2",
    val: "G3",
    ala: "G4",
    asp: "F1",
    glu: "F2",
    met: "F3",
    gly: null,
    stp: "A0"
  },
  "Default 2": {
    phe: "A1",
    leu: "B1",
    ser: "C1",
    tyr: "D1",
    cys: "E1",
    trp: "F1",
    pro: "G1",
    his: "A1",
    gln: "B1",
    arg: "C2",
    ile: "D2",
    thr: "E2",
    asn: "F2",
    lys: "A3",
    val: "B3",
    ala: "C3",
    asp: "D4",
    glu: "E4",
    met: "F4",
    gly: "G4",
    stp: null
  },
  "Default 3": {
    phe: "A3",
    leu: "B3",
    ser: "C3",
    tyr: "D3",
    cys: "E3",
    trp: "F3",
    pro: "A4",
    his: "B4",
    gln: "C4",
    arg: "D4",
    ile: "E4",
    thr: "F4",
    asn: "A5",
    lys: "B5",
    val: "C5",
    ala: "E5",
    asp: "F5",
    glu: "G4",
    met: "G3",
    gly: "F5",
    stp: null
  },
  "Default 4": {
    phe: "C4",
    leu: "D4",
    ser: "E4",
    tyr: "F4",
    cys: "G4",

    trp: "C5",
    pro: "D5",
    his: "E5",
    gln: "F5",
    arg: "G5",

    ile: "C6",
    thr: "B6",
    asn: "D6",
    lys: "E6",
    val: "G6",

    ala: "C7",
    asp: "D7",
    glu: "E7",
    met: "F7",
    gly: "G7",
    stp: null
  },
  "Bass electric optimized": {
    phe: "A#2",
    leu: "A#3",
    ser: "A#4",
    tyr: "A#5",

    cys: "C#2",
    trp: "C#3",
    pro: "C#4",
    his: "C#5",

    gln: "E2",
    arg: "E3",
    ile: "E4",
    thr: "E5",

    asn: "G2",
    lys: "G3",
    val: "G4",
    ala: "G5",

    asp: "A#2",
    glu: "C#2",
    met: null,
    gly: null,
    stp: null
  },

  "Cello optimized": {
    phe: "A#2",
    leu: "A#3",
    ser: "A#4",

    tyr: "B2",
    cys: "B3",
    trp: "B4",

    pro: "C2",
    his: "C3",
    gln: "C4",

    arg: "C#3",
    ile: "C#4",
    thr: "D#2",

    asn: "D#3",
    lys: "D#4",
    val: "F2",

    ala: "F3",

    asp: "F#3",
    glu: "F#4",
    met: "F4",
    gly: null,
    stp: null
  },

  "electric guitar optimized": {
    phe: "A2",
    leu: "A3",
    ser: "A4",
    tyr: "A5",

    cys: "D#3",
    trp: "D#4",
    pro: "D#5",

    his: "C#2",
    gln: "C3",

    arg: "C4",
    ile: "C5",
    thr: "C6",

    asn: "F#2",
    lys: "F#3",
    val: "F#4",

    ala: "F#5",

    asp: "A4",
    glu: "D4",
    met: "C4",
    gly: "F#4",
    stp: null
  },

  "acustic guitar optimized": {
    phe: "A#1",
    leu: "A#2",
    ser: "A#3",
    tyr: "A4",

    cys: "B1",
    trp: "B2",
    pro: "B3",
    his: "B4",

    gln: "C#2",
    arg: "C#3",
    ile: "C#4",
    thr: "C5",

    asn: "G#1",
    lys: "G#2",
    val: "G#3",

    ala: "F#1",

    asp: "F#2",
    glu: "F#3",
    met: "C3",
    gly: "C4",
    stp: null
  },

  "clarinet optimized": {
    phe: "A#2",
    leu: "A#3",
    ser: "A#3",
    tyr: "A#4",

    cys: "D2",
    trp: "D3",
    pro: "D4",

    his: "D5",
    gln: "F2",

    arg: "F3",
    ile: "F4",
    thr: "F5",

    asn: "F#5",

    lys: null,
    val: null,

    ala: null,

    asp: null,
    glu: null,
    met: null,
    gly: null,
    stp: null
  },
  "french-horn optimized": {
    phe: null,
    leu: "A0",
    ser: null,
    tyr: "A1",

    cys: null,
    trp: "C1",
    pro: null,

    his: "C3",
    gln: null,

    arg: "D#1",
    ile: null,

    thr: "D2",

    asn: null,

    lys: "D4",
    val: null,

    ala: "F2",

    asp: null,
    glu: "F4",
    met: null,
    gly: "G1",
    stp: null
  },
  "violin optimized": {
    phe: "A3",
    leu: null,
    ser: "A4",
    tyr: "A5",

    cys: null,
    trp: "A5",
    pro: "A6",
    his: null,

    gln: "C4",
    arg: "C5",
    ile: null,
    thr: "C6",

    asn: "C7",
    lys: "E4",
    val: "E5",

    ala: null,

    asp: "E6",
    glu: "G4",
    met: "G5",
    gly: "G6",
    stp: null
  },
  "xylophone optimized": {
    phe: "C4",
    leu: "C5",
    ser: "C6",
    tyr: "C7",

    cys: null,
    trp: null,
    pro: null,
    his: null,

    gln: "G3",
    arg: "G4",
    ile: "G5",
    thr: "G6",

    asn: "C4",
    lys: "C5",
    val: "C6",

    ala: "C7",

    asp: "G3",
    glu: "G4",
    met: "G5",
    gly: "G6",
    stp: null
  },
  random: {}
};
export const noteTableCodons = {
  "Default 1": {
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
  },
  random: {}
};

export function createRandomNoteTable(keys) {
  let noteTable = {};
  for (let i = 0; i < keys.length; ++i) {
    noteTable[keys[i]] =
      availableNotes[Math.floor(Math.random() * availableNotes.length)];
  }
  return noteTable;
}
