module.exports = {
  // ...
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 37.5
            // exclude: /node_modules|folder_name/i
          })
        ]
      }
    }
  }
};
