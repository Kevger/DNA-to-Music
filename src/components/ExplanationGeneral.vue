<template>
  <v-container>
    <v-card>
      <v-app-bar color="green" dark>
        <v-icon x-large>mdi-dna</v-icon>
        <span class="headline">Willkommen zum DNA-Synthesizer</span>
      </v-app-bar>
      <v-container>
        <v-card-title>Allgemein</v-card-title>
        <v-card-text>
          Mithilfe dieses Tools kannst du sowohl jegliche DNA, als auch RNA in
          Töne und Musik überführen. Dazu stehen dir eine Vielzahl von
          Instrumenten und Synthesizern zur Auswahl, die nach eigenem Gusto
          kombiniert werden können, um sogar orchestralische Klänge zu erzeugen.
          Die Einstellungen lassen dich Takt, Grundtondauer, Instrumente,
          Startindex, Startverzögerung das jeweilige Notenspektrum und den zu
          nutzenden Algorithmus auswählen. Mit etwas Feingefühl kannst du sogar
          aus Pathogenen musikalische Erfahrungen herausholen. Mit dem
          Plus-Symbol
          <v-icon>mdi-plus</v-icon>kannst du die zurzeit ausgewählten
          Einstellungen zu den bestehenden aktiven hinzufügen, erst dann werden
          diese im nächsten Durchlauf aktiv. Bevor Änderungen wirksam werden,
          muss der Zurücksetzknopf <v-icon>mdi-rewind</v-icon>betätigt werden.
          Je mehr Algoritmen und vor allem je länger die Basenabfolge ist, desto
          länger dauert die anfängliche Berechnung. Es bietet sich deswegen für
          das Experimentieren an, nicht vollständige Genome zu nutzen, sondern
          kleinere Teilausschnitte.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title>Algorithmen</v-card-title>
        <v-col cols="12">
          <v-card>
            <v-card-title>Basen</v-card-title>
            <v-card-text>
              Beim einfachsten wird die DNA, die aus den vier Grundbausteinbasen
              A,G,T,C besteht einzeln Base für Base gelesen und in eine
              korrespondierende Note überführt. Hier stehen für jedes Instrument
              pro Konfiguration vier Noten zur Verfügung.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Aminos</v-card-title>
            <v-card-text>
              In der Natur wird die DNA in der Regel zu einer RNA transkribiert
              und anschließend wird diese in eine Aminosäurenabfolge
              umgewandelt. Dafür werden bei der RNA immer drei Basen zusammen
              gelesen, die dann eine entsprechende Aminosäure kodieren. Bei vier
              verschiedenen möglichen Basen und drei Stellen ergeben sich 64
              mögliche Kodierungen, jedoch gibt es nur 20 kanonische Aminosäuren
              und einem Stopsignal. Dies führt bei den meisten Aminosäuren zu
              Mehrfachbelegungen. 20 Aminosäuren und ein Stopsignal können in
              diesem Fall 21 verschiedene Noten kodieren.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>Codons</v-card-title>
            <v-card-text>
              Im direkten Vergleich zum vorangehenden Aminoalgorithmus werden
              hier alle 64 Codons in Noten überführt.
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
