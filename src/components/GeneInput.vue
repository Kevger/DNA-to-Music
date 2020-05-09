<template>
  <v-container fluid>
    <v-card>
      <v-row dense>
        <v-col xs="12" sm="12" md="4" lg="4" xl="4">
          <v-container>
            <v-card-text>
              Links die Basenabfolge (RNA oder DNA) eingeben, die anschließend
              in Musik überführt werden soll. Gene bestehen ausschließlich aus
              A,T,G,C Abfolgen. Virale RNA besitzt U anstatt T.
            </v-card-text>
            <v-select
              class="mx-4"
              v-model="selectedSample"
              :items="sampleGenesNames"
              label="Beispielgene"
              @change="loadSampleDna"
            >Samples</v-select>
            <v-text-field
              class="mx-4"
              label="NCBI Nukleotidsuche"
              v-model="searchTerm"
              @change="searchNCBI"
              placeholder="HIV-1 Genome"
            ></v-text-field>

            <v-card-actions>
              <v-dialog max-width="800">
                <template v-slot:activator="{ on }">
                  <v-btn color="green" dark v-on="on">
                    <v-icon>mdi-format-text-rotation-none</v-icon>DNA-Übersetzer
                  </v-btn>
                </template>
                <TranslationPopup></TranslationPopup>
              </v-dialog>
            </v-card-actions>
          </v-container>
          <v-alert
            :value="alert"
            dense
            outlined
            type="error"
            dismissible
            transition="scale-transition"
            @input="closeAlert"
          >
            Falsche Eingabe - Bitte nur DNA bestehend aus den Basen
            <strong>A, T, G, C, U</strong> eingeben.
          </v-alert>
        </v-col>
        <v-col xs="12" sm="12" md="8" lg="8" xl="8">
          <v-textarea
            class="mx-4"
            @input="debounceDNAInput"
            v-model="dna"
            clearable
            outlined
            rows="11"
            counter
            label="Basenabfolge"
            type="text"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { sampleGenes } from "./../plugins/sampleGenes";
import TranslationPopup from "./TranslationPopup";
const debounce = require("lodash/debounce");

export default {
  components: {
    TranslationPopup
  },
  data: () => ({
    dna: "",
    alert: false,
    searchTerm: "",
    selectedSample: Object.keys(sampleGenes)[0],
    sampleGenesNames: (() => Object.keys(sampleGenes).map(s => s))()
  }),
  created() {
    this.loadSampleDna();
  },
  methods: {
    searchNCBI() {
      const url =
        "https://www.ncbi.nlm.nih.gov/nuccore/?term=" + this.searchTerm;
      window.open(url);
    },
    loadSampleDna() {
      this.dna = sampleGenes[this.selectedSample];
      this.updateDna();
    },
    updateDna() {
      if (/^[atguc\s]+$/i.test(this.dna)) {
        this.dna = this.dna.replace(/\s/g, "").toUpperCase();
        this.$emit("dnaUpdated", this.dna.replace(/T/g, "U"));
        this.alert = false;
      } else {
        this.alert = true;
      }
    },
    closeAlert() {
      this.alert = false;
    },
    debounceDNAInput: debounce(function() {
      this.updateDna();
    }, 1000)
  }
};
</script>
