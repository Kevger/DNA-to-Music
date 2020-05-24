<template>
  <v-container>
    <v-card>
      <v-app-bar color="green" dark>
        <v-icon x-large>mdi-dna</v-icon>
        <span class="headline">Settings explained</span>
      </v-app-bar>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Instrument / Synthesizer</v-card-title>
              <v-card-text>
                Determines which synthesizer or instrument should be used for
                the specific algorithm. In speech synthesis, this determines the
                voice.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Note mapping</v-card-title>
              <v-card-text>
                The played notes are mapped to the bases, amino acids or codons.
                You can choose how they relate to each other.
                <P></P>
                <TranslationTable
                  textButton="Current Mapping"
                  :translation-pair-table="translationTablePairs"
                  label="Current note mapping"
                  information="Depending on the instrument and algorithm not all possible notes can be represented"
                ></TranslationTable>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Starting position</v-card-title>
              <v-card-text>
                Determines from which position in the DNA the algorithm should
                start reading. A change of the start position by a single base
                leads to completely different results for codons and thus for
                notes.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Notation</v-card-title>
              <v-card-text>
                Timing notation of the notes
                <v-row>
                  <v-col>
                    <strong>n = note </strong>
                  </v-col>
                  <v-col>
                    <strong>n.= dotted note</strong>
                  </v-col>
                  <v-col>
                    <strong>t = note triplet</strong>
                  </v-col>
                  <v-col>
                    <strong>m = measure</strong>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Base note value</v-card-title>
              <v-card-text>
                Specifies the duration of the individual notes. For example, a
                quarter note is played for half the length of a half note.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Tempo</v-card-title>
              <v-card-text>
                Specifies the tempo at which the notes are read and played. A
                tempo of a sixteenth note plays twice as fast as an eighth note.
                If the base note value is slower than the tempo, the individual
                notes overlap. Tempo is used to coordinate instruments with each
                other.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Delay</v-card-title>
              <v-card-text>
                This allows the instruments to be started one after the other
                with a time delay. This way, for example, one instrument can be
                set to always play during the pauses of the other.
              </v-card-text>
            </v-card>
          </v-col>
          <v-card-actions>
            <v-btn dark fab bottom right color="green" @click="closeWindow">
              <v-icon>mdi-check-bold</v-icon>
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import TranslationTable from "./TranslationTable";

export default {
  components: {
    TranslationTable
  },
  props: {
    translationTablePairs: { type: Object }
  },
  data() {
    return {};
  },
  methods: {
    closeWindow() {
      this.$emit("windowClosed");
    }
  }
};
</script>
