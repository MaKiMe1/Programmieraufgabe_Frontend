import { defineConfig } from "@vue/cli-service";

export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": fileURLtoPath(new URL("./src", import.meta.url)),
//     },
//   },
  server: {
    proxy: {
      "/course": "http://localhost:8090",
    },
  },
});
