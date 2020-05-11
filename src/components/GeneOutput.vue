<template>
  <v-container fluid>
    <v-divider></v-divider>
    <template v-for="field in createdFields">
      <GeneOutputField
        :config="field.config"
        :svgId="field.svgId"
        :key="field.key"
      ></GeneOutputField>
    </template>
  </v-container>
</template>

<script>
import GeneOutputField from "./GeneOutputField";

export default {
  components: {
    GeneOutputField
  },

  props: {
    update: { type: Array },
    activeAlgorithms: { type: Number }
  },
  data() {
    return {
      createdFields: []
    };
  },
  mounted() {},
  watch: {
    activeAlgorithms() {
      this.createdFields = [];
      this.$forceUpdate();
      for (let i = 0; i < this.activeAlgorithms; ++i) {
        this.$set(this.createdFields, i, {
          key: i,
          config: { i: -1, base: [] },
          svgId: "svg" + i
        });
      }
      this.$forceUpdate();
    },
    update() {
      for (let i = 0; i < this.activeAlgorithms; ++i)
        if (this.createdFields[i].config.i != this.update[i].i)
          this.createdFields[i].config = this.update[i];
      this.$forceUpdate();
    }
  }
};
</script>
