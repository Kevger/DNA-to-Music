<template>
  <v-container>
    <v-card>
      <v-app-bar color="green" dark>
        <v-icon x-large>mdi-dna</v-icon>
        <span class="headline">Welcome to DNA-Synthesizer</span>
      </v-app-bar>
      <v-container>
        <v-card-title>General</v-card-title>
        <v-card-text>
          With this tool you can transform any DNA and RNA into sounds and
          music. You can choose from a variety of instruments and synthesizers
          that can be combined to create even orchestral sounds. The settings
          let you choose the beat, key signature, instruments, start index,
          start delay, note spectrum and algorithm to be used. With a little
          sensitivity, you can even get musical experiences out of pathogens.
          With the plus symbol
          <v-icon>mdi-plus</v-icon>you can add the currently selected settings
          to the existing active ones, only then they will become active in the
          next run. The more algorithms and
          especially the longer the base sequence, the longer the initial
          computation takes. Therefore, it is advisable for experiments not to
          use complete genomes, but rather small sections of them.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title>Algorithms</v-card-title>
        <v-col cols="12">
          <v-card>
            <v-card-title>Bases</v-card-title>
            <v-card-text>
              In this algorithm, the simplest of those presented here, the DNA,
              which consists of the four basic building block bases A,G,T,C, is
              read individually base by base and converted into a corresponding
              note. Here, four notes are available for each instrument per
              configuration.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Amino acids</v-card-title>
            <v-card-text>
              In nature, DNA is usually transcribed into RNA and then converted
              into an amino acid sequences. To do this, three bases are always
              read together in the RNA, which then code for a corresponding
              amino acid. With four different possible bases and three
              positions, there are 64 possible codons, but there are only 20
              canonical amino acids and one stop signal. This leads to multiple
              codons for most amino acids. 20 amino acids and a stop signal can
              code 21 different notes in this case.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Codons</v-card-title>
            <v-card-text>
              In direct comparison to the previous amino acid algorithm, here
              all 64 codons are converted into notes.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Speech</v-card-title>
            <v-card-text>
              <strong>Experimental version!</strong>
              <p>
                Translate DNA by means of speech synthesis into bases, amino
                acids, codons, language or into poetry.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-card-actions>
          <v-btn dark fab bottom right color="green" @click="closeWindow">
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
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
