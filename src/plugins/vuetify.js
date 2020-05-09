import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#8bc34a",
        secondary: "#4caf50",
        accent: "#9c27b0",
        error: "#e91e63",
        warning: "#f44336",
        info: "#ffc107",
        success: "#009688"
      }
    }
  }
});
