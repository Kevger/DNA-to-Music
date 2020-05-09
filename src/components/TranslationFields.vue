<template>
  <v-row dense>
    <v-col cols="5">
      <v-textarea
        rows="4"
        v-model="leftText"
        outlined
        clearable
        counter
        :label="leftLabel"
        type="text"
      ></v-textarea>
    </v-col>
    <v-col cols="2" justify="center" align="center">
      <v-row dense>
        <v-col cols="12" justify="center" align="center">
          <v-btn small @click="onLeftRightTranslation" color="green">
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12" justify="center" align="center">
          <v-dialog width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="light-green" small v-on="on">
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list rounded>
                <v-list-item-group>
                  <v-subheader>Translationstabelle</v-subheader>
                  <v-list-item
                    v-for="item in translationPairtable"
                    :key="item.key"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="item.key"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="item.symbol"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="12" justify="center" align="center">
          <v-btn small @click="onRightLeftTranslation" color="green">
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="5">
      <v-textarea
        v-model="rightText"
        rows="4"
        outlined
        clearable
        counter
        :label="rightLabel"
        type="text"
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      leftText: "",
      rightText: ""
    };
  },
  props: {
    leftRightTranslation: { type: Function },
    rightLeftTranslation: { type: Function },
    leftLabel: { type: String },
    rightLabel: { type: String },
    color: { type: String },
    translationPairtable: { type: Object }
  },
  methods: {
    onLeftRightTranslation() {
      this.rightText = this.leftRightTranslation(this.leftText);
    },
    onRightLeftTranslation() {
      this.leftText = this.rightLeftTranslation(this.rightText);
    }
  }
};
</script>
