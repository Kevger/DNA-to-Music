<template>
  <v-container>
    <v-progress-linear
      color="teal"
      :value="(this.config.i / this.config.maxIndex) * 100"
      stream
      buffer-value="0"
    ></v-progress-linear>
    <div :id="svgId"></div>
  </v-container>
</template>
<script>
export default {
  props: {
    config: {
      type: Object
    },
    svgId: {
      type: String
    }
  },
  data() {
    return {
      cv: undefined
    };
  },
  mounted() {
    this.cv = this.$svg(this.svgId);
  },
  destroyed() {
    this.cv.clear();
    this.cv.remove();
  },
  watch: {
    config() {
      if (this.config && this.config.base) {
        const yOffset = 50;
        const baseXSize = 70;
        const baseGap = baseXSize / 10;
        const baseYSize = 50;
        const duration = 200;
        const scale = 0.8;
        const coloring = {
          A: "#1B5E20",
          U: "#FFC107",
          G: "#FF9800",
          C: "#8BC34A"
        };
        const rects = [];
        this.cv.clear();
        //his.cv
        // .text("AS: " + this.config.amino)
        // .move(20, yOffset)
        // .font({
        //   fill: "#000",
        //   family: "Inconsolata",
        //   size: 30,
        //   anchor: "left"
        // });
        //his.cv
        // .text("Note: " + this.config.note)
        // .move(20, 50 + yOffset)
        // .font({
        //   fill: "#000",
        //   family: "Inconsolata",
        //   size: 30,
        //   anchor: "left"
        // });

        for (let i = 0; i < this.config.base.length; ++i) {
          rects[i] = this.cv
            .rect(baseXSize, baseYSize)
            .fill(coloring[this.config.base[i]])
            .move((baseGap + baseXSize) * i + window.innerWidth / 6, yOffset)
            .radius(5)
            .animate({
              duration: duration / 4
            })
            .scale(scale)
            .attr({ stroke: "#000", "stroke-width": 1 })
            .rotate(2.5 - Math.random() * 5)
            .animate({
              duration: (duration * 3) / 4
            })
            .scale(1)
            .rotate(0)
            .attr({ stroke: "#FFF", "stroke-width": 0 });
        }
      }
    }
  }
};
</script>
