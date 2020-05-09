<template>
  <v-card>
    <v-app-bar color="green" dark>
      <v-icon x-large>mdi-dna</v-icon>
      <v-toolbar-title>
        <span class="headline">DNA-Textübersetzer</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-container fluid>
      <TranslationFields
        :leftRightTranslation="dnaToText"
        :rightLeftTranslation="textToDna"
        :translationPairtable="dnaTextTablePairs"
        leftLabel="DNA"
        rightLabel="Text"
      ></TranslationFields>
      <TranslationFields
        :leftRightTranslation="dnaToAmino"
        :rightLeftTranslation="aminoToDna"
        :translationPairtable="dnaAminoTablePairs"
        leftLabel="DNA"
        rightLabel="Aminosäuren"
      ></TranslationFields>
      <TranslationFields
        :leftRightTranslation="dnaToRna"
        :rightLeftTranslation="rnaToDna"
        :translationPairtable="{ 1: { key: 'T', symbol: 'U' } }"
        leftLabel="DNA"
        rightLabel="RNA"
      ></TranslationFields>
    </v-container>
  </v-card>
</template>

<script>
import TranslationFields from "./TranslationFields";
import {
  dnaToText,
  extractCodons,
  textToDna,
  getAminos,
  dnaTextTable,
  codonTable
} from "./../plugins/dnaConverter";

export default {
  data: () => ({ textToDna: textToDna, dnaToText: dnaToText }),
  components: {
    TranslationFields
  },
  methods: {
    dnaToAmino(dna) {
      return getAminos(
        extractCodons(
          dna
            .replace(/\s/g, "")
            .toUpperCase()
            .replace(/T/g, "U"),
          3,
          3
        )
      ).join("-");
    },
    aminoToDna(aminos) {
      const aminoDnaTable = {};
      Object.keys(codonTable).forEach(key => {
        aminoDnaTable[codonTable[key]] = key;
      });

      return aminos
        .replace(/-/g, " ")
        .split(/\s/)
        .map(b => aminoDnaTable[b])
        .join("")
        .replace(/U/g, "T");
    },
    dnaToRna(dna) {
      return dna
        .toUpperCase()
        .replace(/\s/g, "")
        .replace(/T/g, "U");
    },
    rnaToDna(rna) {
      return rna
        .toUpperCase()
        .replace(/\s/g, "")
        .replace(/U/g, "T");
    }
  },
  computed: {
    dnaTextTablePairs() {
      const pairTable = {};
      const escapeCharacter = { " ": "space", "\t": "tab", "\n": "newline" };
      const escapeChecker = s => escapeCharacter[s] || s;
      let i = 1;
      Object.keys(dnaTextTable).forEach(codon => {
        pairTable[i++] = {
          key: codon,
          symbol: escapeChecker(dnaTextTable[codon])
        };
      });
      return pairTable;
    },
    dnaAminoTablePairs() {
      const pairTable = {};
      let i = 1;
      Object.keys(codonTable).forEach(codon => {
        pairTable[i++] = {
          key: codon,
          symbol: codonTable[codon]
        };
      });
      return pairTable;
    }
  }
};
</script>
