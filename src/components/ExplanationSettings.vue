<template>
  <v-container>
    <v-card>
      <v-app-bar color="green" dark>
        <v-icon x-large>mdi-dna</v-icon>
        <span class="headline">Einstellungen</span>
      </v-app-bar>
      <v-container>
        <v-card-title>Parameter</v-card-title>
        <v-col cols="12">
          <v-card>
            <v-card-title>Synthesizer / Instrument</v-card-title>
            <v-card-text>
              Bestimmt welcher Synthesizer oder Instrument für den spezifischen
              Algorithmus genutzt werden soll. In der Sprachsynthese wird die
              hier die Stimme gewählt.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Tonleiter</v-card-title>
            <v-card-text>Platzhalter</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Startposition</v-card-title>
            <v-card-text>
              Bestimmt ab welcher Position der Algorithmus in der DNA zu lesen
              anfangen soll. Eine Veränderung der Startposition um eine einzige
              Base, führt bei den Codons und somit bei den Noten zu völlig
              anderen Ergebnissen.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Grundnotenwert</v-card-title>
            <v-card-text
              >Gibt die Dauer der einzelnen Noten an. Eine viertel Note wird
              beispielsweise halb so lange gespielt wie eine halbe.</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Tempo</v-card-title>
            <v-card-text>
              Gibt das Tempo an, mit dem die Noten gelesen und gespielt werden.
              Eine Tempo von einem Sechzehntel spielt doppelt so schnell wie ein
              Achtel. Wenn der Grundnotenwert langsamer ist als das Tempo, dann
              überlappen sich die einzelnen Noten. Mit dem Tempo lassen sich
              Instrumente untereinander koordinieren
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Verzögerung</v-card-title>
            <v-card-text>
              Damit lassen sich die Instrumente zeitverzögert nacheinander
              starten. So kann beispielsweise ein Instrument genau so
              eingestellt werden, dass es immer in den Pausen des anderen
              spielt.
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
