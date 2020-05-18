<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Einstellungen</v-card-title>
          <v-card-subtitle
            >Einstellungen des hinzuzufügenden Algorithmus</v-card-subtitle
          >

          <v-row no-gutters>
            <v-col>
              <v-select
                v-model="algorithm"
                class="mx-4"
                :items="algorithms"
                label="Algorithmus"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="specificConfig"
                class="mx-4"
                :items="shownSpecificConfigs"
                label="Spezifisch"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col cols="1">
              <v-btn fab color="green" dark small @click="explaining = true">
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-select
                v-model="synthesizer"
                class="mx-4"
                :items="synthesizers"
                label="Synthesizer"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="startPosition"
                class="mx-4"
                value="0"
                type="number"
                label="Startposition"
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col>
              <v-select
                :disabled="isSpeech"
                v-model="noteValue"
                class="mx-4"
                :items="noteValues"
                label="Grundnotenwert"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                :disabled="isSpeech"
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
                :disabled="isSpeech"
                v-model="startDelay"
                class="mx-4"
                :items="noteValues"
                label="Verzögerung"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>Steuerung</v-card-title>
          <v-card-subtitle>
            Steuerung aller aktiven Algorithmen. Hinzufügen weiterer durch das
            Plussymbol.
          </v-card-subtitle>
          <v-container>
            <v-slider
              v-model="bpm"
              max="400"
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
                <span>Algorithmus hinzufügen</span>
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
                <span>Zurückspulen und Algorithmen neuladen</span>
              </v-tooltip>

              <v-switch
                dense
                class="mx-4"
                persistent-hint
                hint="Die Deaktivierung der Visualisierung kann Leistungssteigerungen erwirken"
                v-model="visualizationActive"
                label="Visualisierung"
              ></v-switch>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>Aktive Algorithmen</v-card-title>
          <v-card-subtitle>
            Alle parallel ablaufende Algorithmen. Erst bei neuem Durchlauf
            aktiv.
          </v-card-subtitle>
          <v-container>
            <v-chip
              color="yellow"
              class="mr-2"
              v-for="conf in addedConfigs"
              :key="conf.uniqueKey"
              @click:close="remove(conf.key)"
              close
            >
              <strong>{{ conf.algorithm }}</strong>
              /{{ conf.synthesizer }}/{{
                conf.algorithm != "Sprache"
                  ? conf.noteValue
                  : conf.specificConfig
              }}/{{ conf.algorithm != "Sprache" ? conf.tempo + "/" : "" }}+sp{{
                conf.startPosition
              }}
            </v-chip>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      color="amber"
      bottom
      v-model="notificationSpeech"
      :timeout="20000"
    >
      Textsynthese ist nicht auf jedem Browser verfügbar oder nur für eine
      beschränkte Anzahl von Zeichen zulässig. Die Geschwindigkeit und
      Lautstärke der Synthese lassen sich nicht im Nachhinein ändern.
      Visualisierung der Textsynthese nicht verfügbar.
      <v-btn class="mx-4" @click="notificationSpeech = false" text
        >Schließen</v-btn
      >
    </v-snackbar>
    <v-snackbar
      color="amber"
      multi-line
      top
      v-model="notificationPerformance"
      :timeout="20000"
    >
      Es kann zu Performanceeinbrüchen bei zu vielen parallel laufenden
      Algorithmen kommen. Zur Verbesserung die Visualisierung abschalten oder
      weniger Algorithmen laufen lassen.
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
      bpm: 70,
      algorithm: this.algorithms[1],
      isPlaying: false,
      volume: 30,
      synthesizer: this.synthesizers[4],
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
      explaining: false
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
    this.add();
    this.updateAddedConfigs();
  },
  methods: {
    updateAddedConfigs() {
      this.$emit("addedConfigsUpdated", this.addedConfigs);
      this.notificationPerformance = this.addedConfigs.length >= 4;
    },
    add() {
      const maxConfigs = 30;
      if (this.addedConfigs.length < maxConfigs) {
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
      } else {
        alert(`Maximal ${maxConfigs} Konfigurationen zulässig`);
      }
    },
    remove(key) {
      this.addedConfigs = this.addedConfigs.filter(conf => conf.key != key);
      this.updateAddedConfigs();
    },
    toggle() {
      this.isPlaying = !this.isPlaying;
      this.$emit("playingUpdated", this.isPlaying);
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
      return this.algorithm == "Sprache";
    }
  },
  watch: {
    synthesizers() {
      this.synthesizer = this.synthesizers[0];
    },
    algorithm() {
      this.updateSettings();
      this.specificConfig = this.shownSpecificConfigs[0];
      if (this.algorithm == "Sprache") this.notificationSpeech = true;
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
