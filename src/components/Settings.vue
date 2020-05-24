<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Settings</v-card-title>
          <v-card-subtitle
            >Settings of the algorithm to be added</v-card-subtitle
          >

          <v-row no-gutters>
            <v-col cols="5">
              <v-select
                v-model="algorithm"
                class="mx-4"
                :items="algorithms"
                label="Algorithm"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col cols="5">
              <v-select
                v-model="specificConfig"
                class="mx-4"
                :items="shownSpecificConfigs"
                label="Scale"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-btn fab color="green" dark small @click="explaining = true">
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="7">
              <v-select
                v-model="synthesizer"
                class="mx-4"
                :items="synthesizers"
                label="Synthesizer / Instrument"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="startPosition"
                class="mx-4"
                value="0"
                type="number"
                label="Starting position"
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <template v-if="!isSpeech">
              <v-col>
                <v-select
                  v-model="noteValue"
                  class="mx-4"
                  :items="noteValues"
                  label="Base note value"
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="tempo"
                  class="mx-4"
                  :items="noteValues"
                  label="Tempo"
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="startDelay"
                  class="mx-4"
                  :items="noteValues"
                  label="Delay"
                  dense
                  outlined
                ></v-select>
              </v-col>
            </template>
            <v-col>
              <v-alert
                :value="isSpeech"
                dense
                outlined
                type="error"
                transition="scale-transition"
              >
                <strong>Experimental!</strong>
                <p>
                  Text synthesis is not available on every browser/device or
                  only allowed for a limited number of characters. The speed and
                  volume of the synthesis cannot be changed afterwards.
                  Visualization of text synthesis is also not available.
                </p>
              </v-alert>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>Controls</v-card-title>
          <v-card-subtitle
            >Control of all active algorithms. Add more using the plus
            symbol.</v-card-subtitle
          >
          <v-container>
            <v-slider
              v-model="bpm"
              max="300"
              min="1"
              step="1"
              label="BPM"
              append-icon="mdi-metronome"
              thumb-label
              outlined
            ></v-slider>

            <v-slider
              prepend-icon="mdi-volume-low"
              append-icon="mdi-volume-high"
              thumb-label
              v-model="volume"
              max="100"
              min="0"
              step="1"
              outlined
            ></v-slider>

            <v-divider></v-divider>

            <v-card-actions>
              <v-tooltip bottom>
                <template #activator="{on: tooltip}">
                  <v-btn color="green" fab @click="add" v-on="tooltip">
                    <v-icon large>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add Algorithm</span>
              </v-tooltip>

              <v-btn
                color="green"
                :disabled="addedConfigsEmpty"
                fab
                @click="toggle"
              >
                <v-icon large>
                  {{ isPlaying ? "mdi-pause" : "mdi-play" }}
                </v-icon>
              </v-btn>

              <v-tooltip bottom>
                <template #activator="{on: tooltip}">
                  <v-btn color="green" fab @click="rewind" v-on="tooltip">
                    <v-icon large>mdi-rewind</v-icon>
                  </v-btn>
                </template>
                <span>Rewind and reload algorithms</span>
              </v-tooltip>

              <v-switch
                dense
                class="mx-4"
                persistent-hint
                hint="Disabling the visualization can increase performance"
                v-model="visualizationActive"
                label="Visualization"
              ></v-switch>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>Active Algorithms</v-card-title>
          <v-card-subtitle
            >All parallel running algorithms. Only after a new run.
            activated.</v-card-subtitle
          >
          <v-container>
            <v-chip
              color="yellow"
              class="mr-2"
              v-for="conf in addedConfigs"
              :key="conf.uniqueKey"
              @click:close="remove(conf.uniqueKey)"
              close
            >
              <strong>{{ conf.algorithm[0] }}</strong>
              /{{ conf.synthesizer.substring(0, 16) }}/{{
                isSpeech ? conf.noteValue + "/" : null
              }}{{ conf.specificConfig.substring(0, 5) }}/{{
                isSpeech ? conf.tempo + "/" : ""
              }}sp{{ conf.startPosition }}
            </v-chip>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      color="amber"
      multi-line
      top
      v-model="notificationPerformance"
      :timeout="20000"
    >
      Performance may be degraded if too many algorithms are running in
      parallel. To improve performance, switch off the visualization, run fewer
      algorithms or cut the length of the sequence.
      <v-btn class="mx-4" @click="notificationPerformance = false" text
        >Schließen</v-btn
      >
    </v-snackbar>
    <v-dialog v-model="explaining" fullscreen>
      <ExplanationSettings
        @windowClosed="explaining = false"
      ></ExplanationSettings>
    </v-dialog>
  </v-container>
</template>

<script>
import ExplanationSettings from "./ExplanationSettings";
export default {
  components: {
    ExplanationSettings
  },

  data() {
    return {
      bpm: 55,
      algorithm: this.algorithms[1],
      isPlaying: false,
      volume: 40,
      synthesizer: this.synthesizers[2],
      startPosition: 0,
      specificConfig: this.specificConfigs[this.algorithms[1]][0],
      settings: {},
      addedConfigs: [],
      noteValue: this.noteValues[2],
      tempo: this.noteValues[4],
      notificationSpeech: false,
      notificationPerformance: false,
      uniqueKeyIndex: 0,
      visualizationActive: true,
      startDelay: this.noteValues[0],
      explaining: false,
      configsChanged: false
    };
  },
  props: {
    algorithms: { type: Array },
    reset: { type: Boolean },
    synthesizers: { type: Array },
    specificConfigs: { type: Object },
    noteValues: { type: Array }
  },
  created() {
    this.updateSettings();
    this.add();
    this.startPosition = 1;
    this.tempo = this.noteValues[9];
    this.add();
    this.updateAddedConfigs();
    this.configsChanged = false;
  },
  methods: {
    updateAddedConfigs() {
      for (let i = 0; i < this.addedConfigs.length; ++i) {
        this.addedConfigs[i].key = i;
      }
      this.$emit("addedConfigsUpdated", this.addedConfigs);
      this.notificationPerformance = this.addedConfigs.length >= 4;
      this.configsChanged = true;
    },
    add() {
      this.addedConfigs.push({
        algorithm: this.algorithm,
        key: this.addedConfigs.length,
        synthesizer: this.synthesizer,
        specificConfig: this.specificConfig,
        noteValue: this.noteValue,
        startPosition: this.startPosition,
        tempo: this.tempo,
        uniqueKey: this.uniqueKeyIndex++,
        startDelay: this.startDelay
      });
      this.updateAddedConfigs();
    },
    remove(key) {
      this.addedConfigs = this.addedConfigs.filter(
        conf => conf.uniqueKey != key
      );
      this.updateAddedConfigs();
    },
    toggle() {
      this.isPlaying = !this.isPlaying;
      this.$emit("playingUpdated", {
        isPlaying: this.isPlaying,
        configsChanged: this.configsChanged && this.isPlaying
      });
      if (this.configsChanged && this.isPlaying) this.configsChanged = false;
    },
    rewind() {
      this.isPlaying = false;
      this.$emit("rewindUpdated");
    },
    updateSettings() {
      this.settings = {
        bpm: this.bpm,
        volume: this.volume,
        algorithm: this.algorithm,
        visualizationActive: this.visualizationActive
      };
      this.$emit("settingsUpdated", this.settings);
    }
  },
  computed: {
    shownSpecificConfigs() {
      return this.specificConfigs[this.algorithm];
    },
    addedConfigsEmpty() {
      return !(Array.isArray(this.addedConfigs) && this.addedConfigs.length);
    },
    isSpeech() {
      return this.algorithm == "Speech";
    }
  },
  watch: {
    synthesizers() {
      this.synthesizer = this.synthesizers[0];
    },
    algorithm() {
      this.updateSettings();
      this.specificConfig = this.shownSpecificConfigs[0];
      if (this.algorithm == "Speech") this.notificationSpeech = true;
    },
    bpm() {
      this.updateSettings();
    },
    volume() {
      this.updateSettings();
    },
    synthesizer() {
      this.updateSettings();
    },
    reset() {
      this.isPlaying = false;
    },
    specificConfig() {
      this.updateSettings();
    },
    visualizationActive() {
      this.updateSettings();
    },
    startDelay() {
      this.updateSettings();
    }
  }
};
</script>
