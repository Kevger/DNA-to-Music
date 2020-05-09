<template>
  <v-app>
    <v-app-bar color="green" dark app>
      <v-icon x-large>mdi-dna</v-icon>DNA Synthesizer - Future Of Making 2
    </v-app-bar>

    <v-content>
      <v-container>
        <GeneInput @dnaUpdated="onDnaUpdate" />
        <v-row no-gutters>
          <v-col xs="12" sm="12" md="4" lg="4" xl="4">
            <Settings
              :algorithms="algorithms"
              :synthesizers="shownSynthesizers"
              :specificConfigs="specificConfigs"
              :noteValues="[
                '1n',
                '2n',
                '4n',
                '8n',
                '16n',
                '32n',
                '2n.',
                '4n.',
                '8n.',
                '16n.',
                '32n.'
              ]"
              @settingsUpdated="onSettingsUpdate"
              @addedConfigsUpdated="onAddedConfigsUpdate"
              @playingUpdated="onPlayingUpdate"
              @rewindUpdated="onRewindUpdate"
              :reset="resetPlayer"
            />
          </v-col>
          <v-col xs="12" sm="12" md="8" lg="8" xl="8">
            <GeneOutput :update="updateOuput" :activeAlgorithms="activeAlgorithms"></GeneOutput>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-dialog v-model="loading" fullscreen>
      <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
        <v-layout justify-center align-center>
          Lade Instrumente...
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>

    <v-footer color="green" class="font-weight-medium">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Future of Making</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import GeneInput from "./components/GeneInput";
import Settings from "./components/Settings";
import GeneOutput from "./components/GeneOutput";

import {
  interpretations,
  startMusic,
  stopMusic,
  resetMusic,
  setSettings,
  getVoices,
  availableSynthesizers,
  loadInstruments
} from "./plugins/dnatomusic";

export default {
  name: "App",

  components: {
    GeneInput,
    Settings,
    GeneOutput
  },

  data: () => ({
    dna: "",
    resetPlayer: false,
    stopped: false,
    updateOuput: [],
    activeAlgorithms: 0,
    algorithms: ["Basen", "Aminos", "Codons", "Sprache"],
    algorithm: "",
    synthesizers: availableSynthesizers,
    visualizationActive: true,
    specificConfigs: {
      Basen: ["Keine"],
      Aminos: ["Keine"],
      Codons: ["Keine"],
      Sprache: ["DNA", "Codon", "Amino", "Human", "Gedicht", "Drogenrap"]
    },
    addedConfigs: [],
    loading: true
  }),
  computed: {
    shownSynthesizers() {
      if (this.algorithm == "Sprache") {
        return getVoices();
      } else {
        return this.synthesizers;
      }
    }
  },
  mounted() {
    console.log("Loading instruments....");
    const loadingDoneCallback = () => {
      this.loading = false;
      console.log("Loading instruments done...");
    };
    loadInstruments(loadingDoneCallback);
  },
  methods: {
    onDnaUpdate(dna) {
      this.dna = dna;
      console.log("DNA updated");
    },
    onSettingsUpdate(settings) {
      setSettings(settings);
      this.algorithm = settings.algorithm;
      this.visualizationActive = settings.visualizationActive;
    },
    onAddedConfigsUpdate(addedConfigs) {
      this.addedConfigs = addedConfigs;
    },

    onRewindUpdate() {
      resetMusic();
      console.log("Music rewinded");
      this.stopped = false;
      this.resetPlayer = !this.resetPlayer;
    },
    onPlayingUpdate(isPlaying) {
      const callback = information => {
        if (this.visualizationActive)
          this.$set(this.updateOuput, information.key, information);
      };

      if (isPlaying) {
        if (this.stopped) {
          startMusic();
          this.stopped = false;
        } else if (this.dna == "" || this.algorithm == "") {
          console.log("Error no valid information");
          this.onRewindUpdate();
        } else {
          for (let i = 0; i < this.addedConfigs.length; ++i) this.update;
          this.activeAlgorithms = 0;
          const activeInstruments = this.addedConfigs.map(c =>
            interpretations[c.algorithm](
              this.dna.substr(c.startPosition),
              c,
              c.algorithm != "Sprache" ? callback : this.onRewindUpdate
            )
          );
          activeInstruments.forEach(ai => ai.start());
          this.updateOuput = Array(this.addedConfigs.length).fill({});
          this.activeAlgorithms = this.addedConfigs.length;
          startMusic();
          console.log("Sound started!");
        }
      } else {
        stopMusic();
        this.stopped = true;
        console.log("Sound stopped!");
      }
    }
  }
};
</script>
