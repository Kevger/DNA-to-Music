<template>
  <v-card>
    <v-app-bar color="green" dark>
      <v-icon x-large>mdi-dna</v-icon>
      <span class="headline">DNA text translator</span>
    </v-app-bar>
    <v-container fluid>
      <v-textarea
        rows="4"
        @input="debounceDnaInput"
        v-model="dna"
        outlined
        clearable
        counter
        label="DNA"
        type="text"
      >
        <template v-slot:append-outer>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
                fab
                color="green"
                dark
                small
                @click="loadSequence"
                v-on="on"
              >
                <v-icon>mdi-upload</v-icon>
              </v-btn>
            </template>
            <span>Load DNA sequence into the main program</span>
          </v-tooltip>
        </template>
      </v-textarea>
      <v-alert
        :value="alert"
        dense
        outlined
        type="error"
        transition="scale-transition"
      >
        Invalid entry - Please enter only DNA consisting of the bases
        <strong>A, T, G, C</strong>.
      </v-alert>
      <v-textarea
        rows="4"
        @input="debounceRnaInput"
        v-model="rna"
        outlined
        clearable
        counter
        label="RNA"
        type="text"
      >
        <template v-slot:append-outer>
          <TranslationTable
            :translation-pair-table="dnaRnaTablePairs"
            label="DNA-RNA transcription table"
          />
        </template>
      </v-textarea>
      <v-textarea
        rows="4"
        @input="debounceAminoInput"
        v-model="amino"
        outlined
        clearable
        counter
        label="Amino acids"
        type="text"
      >
        <template v-slot:append-outer>
          <TranslationTable
            :translation-pair-table="dnaAminoTablePairs"
            label="DNA amino acids Translation table"
            information="There are 64 possible codons, 61 of which are intended for 20 amino acids and three as stop signals. Thus the assignment of codon to amino acid is unique, but for almost all amino acids to the codon no longer."
          />
        </template>
      </v-textarea>
      <v-textarea
        rows="4"
        @input="debounceTextInput"
        v-model="text"
        outlined
        clearable
        counter
        label="Text"
        type="text"
      >
        <template v-slot:append-outer>
          <TranslationTable
            :translation-pair-table="dnaTextTablePairs"
            label="DNA Text Translation Table"
            information="Not all characters like capital letters can be coded due to the limitation to 64 possible codons."
          />
        </template>
      </v-textarea>
    </v-container>
  </v-card>
</template>

<script>
import {
  dnaToText,
  extractCodons,
  textToDna,
  getAminos,
  dnaTextTable,
  codonTable,
  dnaToRna,
  rnaToDna,
  dnaRnaTable
} from "./../plugins/dnaConverter";
import TranslationTable from "./TranslationTable";

const debounce = require("lodash/debounce");
const debounceDelay = 500;
export default {
  data: () => ({
    dna: "",
    rna: "",
    amino: "",
    text: "",
    alert: false
  }),
  components: {
    TranslationTable
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
      aminos = aminos || "";
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
      return dnaToRna(dna || "");
    },
    rnaToDna(rna) {
      return rnaToDna(rna || "");
    },
    dnaToEverything() {
      this.rna = this.dnaToRna(this.dna);
      this.amino = this.dnaToAmino(this.dna);
      this.text = dnaToText(this.dna);
      this.alert = false;
    },
    debounceDnaInput: debounce(function() {
      if (/^[atguc\s]+$/i.test(this.dna)) {
        this.dnaToEverything();
      } else {
        this.alert = true;
      }
    }, debounceDelay),
    debounceRnaInput: debounce(function() {
      this.dna = this.rnaToDna(this.rna);
      this.dnaToEverything();
    }, debounceDelay),
    debounceAminoInput: debounce(function() {
      this.dna = this.aminoToDna(this.amino);
      this.dnaToEverything();
    }, debounceDelay),
    debounceTextInput: debounce(function() {
      this.dna = textToDna(this.text || "");
      this.dnaToEverything();
    }, debounceDelay),
    loadSequence() {
      this.$emit("loadDna", this.dna);
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
    },
    dnaRnaTablePairs() {
      const pairTable = {};
      let i = 1;
      Object.keys(dnaRnaTable).forEach(codon => {
        pairTable[i++] = {
          key: codon,
          symbol: dnaRnaTable[codon]
        };
      });
      return pairTable;
    }
  }
};
</script>
