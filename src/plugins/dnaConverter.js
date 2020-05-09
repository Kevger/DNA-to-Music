const AA = {
  phe: "phe",
  leu: "leu",
  ser: "ser",
  tyr: "tyr",
  cys: "cys",
  trp: "trp",
  pro: "pro",
  his: "his",
  gln: "gln",
  arg: "arg",
  ile: "ile",
  thr: "thr",
  asn: "asn",
  lys: "lys",
  val: "val",
  ala: "ala",
  asp: "asp",
  glu: "glu",
  met: "met",
  gly: "gly",
  stp: "stp"
};

export const AANames = {
  phe: "Phenylalanin",
  leu: "Leucin",
  ser: "Serin",
  tyr: "Tyrosin",
  cys: "Cystein",
  trp: "Tryptophan",
  pro: "Prolin",
  his: "Histidin",
  gln: "Glutaminsäure",
  arg: "Arginin",
  ile: "Isoleucin",
  thr: "Threonin",
  asn: "Asparagin",
  lys: "Lysin",
  val: "Valin",
  ala: "Alanin",
  asp: "Asparaginsäure",
  glu: "Glutamin",
  met: "Methionin",
  gly: "Glycin",
  stp: "Stop"
};

export const codonTable = {
  UUU: AA.phe,
  UUC: AA.phe,
  UUA: AA.leu,
  UUG: AA.leu,

  UCU: AA.ser,
  UCC: AA.ser,
  UCA: AA.ser,
  UCG: AA.ser,

  UAU: AA.tyr,
  UAC: AA.tyr,
  UAA: AA.stp,
  UAG: AA.stp,

  UGU: AA.cys,
  UGC: AA.cys,
  UGA: AA.stp,
  UGG: AA.trp,

  CUU: AA.leu,
  CUC: AA.leu,
  CUA: AA.leu,
  CUG: AA.leu,

  CCU: AA.pro,
  CCC: AA.pro,
  CCA: AA.pro,
  CCG: AA.pro,

  CAU: AA.his,
  CAC: AA.his,
  CAA: AA.gln,
  CAG: AA.gln,

  CGU: AA.arg,
  CGC: AA.arg,
  CGA: AA.arg,
  CGG: AA.arg,

  AUU: AA.ile,
  AUC: AA.ile,
  AUA: AA.ile,
  AUG: AA.met,

  ACU: AA.thr,
  ACC: AA.thr,
  ACA: AA.thr,
  ACG: AA.thr,

  AAU: AA.asn,
  AAC: AA.asn,
  AAA: AA.lys,
  AAG: AA.lys,

  AGU: AA.ser,
  AGC: AA.ser,
  AGA: AA.arg,
  AGG: AA.arg,

  GUU: AA.val,
  GUC: AA.val,
  GUA: AA.val,
  GUG: AA.val,

  GCU: AA.ala,
  GCC: AA.ala,
  GCA: AA.ala,
  GCG: AA.ala,

  GAU: AA.asp,
  GAC: AA.asp,
  GAA: AA.glu,
  GAG: AA.glu,

  GGU: AA.gly,
  GGC: AA.gly,
  GGA: AA.gly,
  GGG: AA.gly
};

export const dnaTextTable = {
  UUU: "1",
  UUC: "2",
  UUA: "3",
  UUG: "4",

  UCU: "5",
  UCC: "6",
  UCA: "7",
  UCG: "8",

  UAU: "9",
  UAC: "0",
  UAA: "?",
  UAG: "!",

  UGU: ".",
  UGC: ",",
  UGA: "q",
  UGG: "w",

  CUU: "e",
  CUC: "r",
  CUA: "t",
  CUG: "z",

  CCU: "u",
  CCC: "i",
  CCA: "o",
  CCG: "p",

  CAU: "ü",
  CAC: "a",
  CAA: "s",
  CAG: "d",

  CGU: "f",
  CGC: "g",
  CGA: "h",
  CGG: "j",

  AUU: "k",
  AUC: "l",
  AUA: "ö",
  AUG: "ä",

  ACU: "y",
  ACC: "x",
  ACA: "c",
  ACG: "v",

  AAU: "b",
  AAC: "n",
  AAA: "m",
  AAG: "\n",

  AGU: " ",
  AGC: "\t",
  AGA: "-",
  AGG: "+",

  GUU: "Q",
  GUC: "A",
  GUA: "B",
  GUG: "C",

  GCU: "D",
  GCC: "E",
  GCA: "F",
  GCG: "G",

  GAU: "H",
  GAC: "J",
  GAA: "Z",
  GAG: "N",

  GGU: "U",
  GGC: "L",
  GGA: "M",
  GGG: "I"
};

export const dnaDrogenRapLyric = {
  UUU: "Ketamin ",
  UUC: "Stalin ",
  UUA: "Nackenklatscher ",
  UUG: "Februartermin ",

  UCU: "Alkohol ",
  UCC: "Nordpol ",
  UCA: "Schelle ",
  UCG: "Chinakohl ",

  UAU: "Kokain ",
  UAC: "Abflugtermin ",
  UAA: "Ziehn ",
  UAG: "Benzin ",

  UGU: "Weed ",
  UGC: "und ",
  UGA: "Kenntnis ",
  UGG: "Amphetamin ",

  CUU: "Cash ",
  CUC: "Geld ",
  CUA: "Money ",
  CUG: "Para ",

  CCU: "schieß ",
  CCC: "Nacht ",
  CCA: "Bro ",
  CCG: "Bruder ",

  CAU: "kaufen ",
  CAC: "Bulgari ",
  CAA: "Gucci ",
  CAG: "Rolex ",

  CGU: "Benz ",
  CGC: "high ",
  CGA: "Kopf ",
  CGG: "reich ",

  AUU: "Mutter ",
  AUC: "Gott ",
  AUA: "Lamborghini ",
  AUG: "Digga ",

  ACU: "die ",
  ACC: "der ",
  ACA: "und ",
  ACG: "in ",

  AAU: "zu ",
  AAC: "den ",
  AAA: "das ",
  AAG: "nicht ",

  AGU: "von ",
  AGC: "sie ",
  AGA: "ein  ",
  AGG: "als ",

  GUU: "aber ",
  GUC: "auch ",
  GUA: "ich ",
  GUG: "für ",

  GCU: "Blut ",
  GCC: "stellt ",
  GCA: "alle ",
  GCG: "wollen ",

  GAU: "heute ",
  GAC: "gestern ",
  GAA: "morgen ",
  GAG: "Besitzer ",

  GGU: "Döner ",
  GGC: "Glock ",
  GGA: "Diamand ",
  GGG: "wir "
};

export const dnaLyricTable = {
  UUU: "Orte ",
  UUC: "Sorte ",
  UUA: "Pforte ",
  UUG: "Wohnorte ",

  UCU: "Torte ",
  UCC: "Eskorte ",
  UCA: "Worte ",
  UCG: "Vororte ",

  UAU: "Geld ",
  UAC: "Zelt ",
  UAA: "Welt ",
  UAG: "Held ",

  UGU: "Korn ",
  UGC: "Einhorn ",
  UGA: "Paderborn ",
  UGG: "Popkorn ",

  CUU: "liebe ",
  CUC: "bliebe ",
  CUA: "verschiebe ",
  CUG: "Betriebe ",

  CCU: "Kraft ",
  CCC: "Wirtschaft ",
  CCA: "gestraft ",
  CCG: "Belegschaft ",

  CAU: "Zukunft ",
  CAC: "unvernunft ",
  CAA: "Ankunft ",
  CAG: "Auskunft ",

  CGU: "der ",
  CGC: "die ",
  CGA: "das ",
  CGG: "und ",

  AUU: "in ",
  AUC: "zu ",
  AUA: "den ",
  AUG: "das ",

  ACU: "nicht ",
  ACC: "von ",
  ACA: "sie ",
  ACG: "ist ",

  AAU: "sich ",
  AAC: "mit ",
  AAA: "ich ",
  AAG: "werden ",

  AGU: "gut ",
  AGC: "schlecht ",
  AGA: "finde ",
  AGG: "Döner ",

  GUU: "Pizza ",
  GUC: "Schnitzel ",
  GUA: "Bretzel ",
  GUG: "Drogen ",

  GCU: "er ",
  GCC: "stellt ",
  GCA: "alle ",
  GCG: "wollen ",

  GAU: "heute ",
  GAC: "gestern ",
  GAA: "morgen ",
  GAG: "Besitzer ",

  GGU: "essen ",
  GGC: "trinken ",
  GGA: "schlafen ",
  GGG: "wir "
};

export function extractCodons(rna, windowSize, stepsize) {
  let extracted = [];
  for (let i = 0; i <= rna.length - windowSize; i += stepsize)
    extracted.push(rna.slice(i, i + windowSize));
  return extracted;
}

export const getAminos = codons => codons.map(c => codonTable[c]);

export function dnaToText(dna, translationTable = dnaTextTable) {
  const codons = extractCodons(
    dna
      .replace(/\s/g, "")
      .toUpperCase()
      .replace(/T/g, "U"),
    3,
    3
  )
    .map(b => translationTable[b])
    .join("");
  return codons;
}

export function textToDna(text) {
  const textDnaTable = {};
  Object.keys(dnaTextTable).forEach(key => {
    textDnaTable[dnaTextTable[key]] = key;
  });

  return [...text]
    .map(b => textDnaTable[b])
    .join("")
    .replace(/U/g, "T");
}
