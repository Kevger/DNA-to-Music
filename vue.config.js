module.exports = {
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "DNA-Synthesizer",
    msTileColor: "#7ED321",
    manifestOptions: {
      background_color: "#7ED321"
    },
    workboxOptions: {
      skipWaiting: true
    }
  }
};
