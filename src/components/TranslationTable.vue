<template>
  <v-dialog width="600px">
    <template #activator="{ on: dialog }">
      <v-tooltip left>
        <template #activator="{ on: tooltip }">
          <v-btn
            :fab="textButton ? false : true"
            color="green"
            dark
            small
            v-on="{ ...dialog, ...tooltip }"
          >
            {{ textButton ? textButton : null }}
            <v-icon v-if="textButton === null">mdi-help</v-icon>
          </v-btn>
        </template>
        <span>{{ label }}</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>{{ label }}</v-card-title>
      <v-card-text>{{ information }}</v-card-text>
      <v-list rounded>
        <v-list-item-group>
          <v-list-item v-for="item in translationPairTable" :key="item.key">
            <v-list-item-content>
              <v-list-item-title v-text="item.key"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-html="item.symbol"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    translationPairTable: { type: Object },
    label: { type: String },
    information: { type: String },
    textButton: { type: String, default: null }
  }
};
</script>
