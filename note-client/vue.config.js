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
  },
  // publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  devServer: {
    proxy: "http://localhost:3000/api"
  }
};
