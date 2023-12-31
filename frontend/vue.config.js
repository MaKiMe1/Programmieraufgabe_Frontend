const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/course": {
        target: "http://localhost:8090/",
        ws: true,
        changeOrigin: true,
      },
      "/user": {
        target: "http://localhost:8090/",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
