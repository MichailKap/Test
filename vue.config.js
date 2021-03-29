module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data:
        `
          @import "@/styles/variables.scss";
          @import "@/styles/main.scss";
        `
      }
    }
  },
  publicPath: "/Test/"
}