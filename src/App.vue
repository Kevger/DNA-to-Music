<template>
  <v-app>
    <v-app-bar color="green" dark app>
      <v-icon x-large>mdi-dna</v-icon>DNA Synthesizer - Future Of Making 2
      <v-spacer />
      <v-btn color="green" dark small @click="explainingWhy = true"
        >About</v-btn
      >
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn
              href="https://cellular-narratives.web.app"
              target="_blank"
              text
            >
              <span class="mr-2">Cellular Narratives</span>
              <v-icon>mdi-account-switch-outline</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              href="https://epidemic-simulations.web.app"
              target="_blank"
              text
            >
              <span class="mr-2">Epidemic Simulations</span>
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn href="https://creaition-webapp.web.app" target="_blank" text>
              <span class="mr-2">Cre[ai]tion</span>
              <v-icon>mdi-robot</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container>
        <GeneInput @dnaUpdated="onDnaUpdate" @openHelp="explaining = true" />
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
                '32n.',
                '1t',
                '2t',
                '4t',
                '8t',
                '16t',
                '32t',
                '1m',
                '2m',
                '4m',
                '8m',
                '16m'
              ]"
              @settingsUpdated="onSettingsUpdate"
              @addedConfigsUpdated="onAddedConfigsUpdate"
              @playingUpdated="onPlayingUpdate"
              @rewindUpdated="onRewindUpdate"
              :reset="resetPlayer"
            />
          </v-col>
          <v-col xs="12" sm="12" md="8" lg="8" xl="8">
            <GeneOutput
              :update="updateOuput"
              :activeAlgorithms="activeAlgorithms"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-dialog v-model="loading" fullscreen>
      <v-container
        fluid
        fill-height
        style="background-color: rgba(255, 255, 255, 0.5);"
      >
        <v-layout justify-center align-center>
          Loading instruments...
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
    <v-dialog v-model="explaining" fullscreen>
      <ExplanationGeneral @windowClosed="explaining = false" />
    </v-dialog>
    <v-dialog v-model="explainingWhy" fullscreen>
      <ExplanationWhy @windowClosed="explainingWhy = false" />
    </v-dialog>
    <v-dialog v-model="processing" fullscreen>
      <v-container
        fluid
        fill-height
        style="background-color: rgba(255, 255, 255, 0.5);"
      >
        <v-layout justify-center align-center>
          Algorithms are computing...
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
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
import ExplanationGeneral from "./components/ExplanationGeneral";
import ExplanationWhy from "./components/ExplanationWhy";
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
import {
  noteTableBases,
  noteTableAminos,
  noteTableCodons,
  speechTable
} from "./plugins/noteTables";

export default {
  name: "App",

  components: {
    GeneInput,
    Settings,
    GeneOutput,
    ExplanationGeneral,
    ExplanationWhy
  },

  data: () => ({
    dna: "",
    resetPlayer: false,
    stopped: false,
    updateOuput: [],
    activeAlgorithms: 0,
    algorithms: Object.keys(interpretations),
    algorithm: "",
    synthesizers: availableSynthesizers,
    visualizationActive: true,
    specificConfigs: {
      Bases: Object.keys(noteTableBases),
      "Amino acids": Object.keys(noteTableAminos),
      Codons: Object.keys(noteTableCodons),
      Speech: Object.keys(speechTable)
    },
    addedConfigs: [],
    loading: true,
    processing: false,
    explaining: true,
    explainingWhy: false
  }),
  computed: {
    shownSynthesizers() {
      if (this.algorithm == "Speech") {
        return getVoices();
      } else {
        return this.synthesizers;
      }
    }
  },
  mounted() {
    const loadingDoneCallback = () => {
      this.loading = false;
    };
    loadInstruments(loadingDoneCallback);
  },
  destroyed() {
    resetMusic();
  },
  methods: {
    onDnaUpdate(dna) {
      this.dna = dna;
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
      this.stopped = false;
      this.resetPlayer = !this.resetPlayer;
    },

    onPlayingUpdate(info) {
      const callback = information => {
        this.processing = false;
        if (this.visualizationActive)
          this.$set(this.updateOuput, information.key, information);
      };

      this.processing = true;
      this.$forceUpdate();
      if (info.configsChanged) {
        resetMusic();
        this.stopped = false;
      }
      let onlySpeech = true;
      this.addedConfigs.forEach(
        c => (onlySpeech = c.algorithm != "Speech" ? false : onlySpeech)
      );
      if (onlySpeech) this.processing = false;

      setTimeout(() => {
        try {
          if (info.isPlaying) {
            if (this.stopped) {
              startMusic();
              this.stopped = false;
            } else {
              for (let i = 0; i < this.addedConfigs.length; ++i) this.update;
              this.activeAlgorithms = 0;

              const activeInstruments = this.addedConfigs.map(c =>
                interpretations[c.algorithm](
                  this.dna.substr(c.startPosition),
                  c,
                  c.algorithm != "Speech" ? callback : this.onRewindUpdate
                )
              );
              for (let i = 0; i < activeInstruments.length; ++i)
                activeInstruments[i].start(this.addedConfigs[i].startDelay);
              this.updateOuput = Array(this.addedConfigs.length).fill({});
              this.activeAlgorithms = this.addedConfigs.length;
              startMusic();
            }
          } else {
            stopMusic();
            this.stopped = true;
            this.processing = false;
          }
        } catch (e) {
          console.log("Error: " + e);
          this.processing = false;
          this.onRewindUpdate();
        }
      }, 100);
    }
  }
};
</script>
