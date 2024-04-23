// ../client/vite.config.ts
import { defineConfig } from "file:///Users/muhozhuk/Desktop/dev/pixel-punch-game/node_modules/vite/dist/node/index.js";
import react from "file:///Users/muhozhuk/Desktop/dev/pixel-punch-game/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///Users/muhozhuk/Desktop/dev/pixel-punch-game/node_modules/dotenv/lib/main.js";
import * as path from "path";
var __vite_injected_original_dirname = "/Users/muhozhuk/Desktop/dev/pixel-punch-game/packages/client";
dotenv.config();
var vite_config_default = defineConfig({
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: path.join(__vite_injected_original_dirname, "dist/client"),
    rollupOptions: {
      input: {
        app: "./index.html",
        sw: "./sw.js"
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === "sw" ? "[name].js" : "assets/js/[name]-[hash].js";
        }
      }
    }
  },
  optimizeDeps: {
    include: ["@mui/material", "@mui/material/colors/red"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL211aG96aHVrL0Rlc2t0b3AvZGV2L3BpeGVsLXB1bmNoLWdhbWUvcGFja2FnZXMvY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbXVob3podWsvRGVza3RvcC9kZXYvcGl4ZWwtcHVuY2gtZ2FtZS9wYWNrYWdlcy9jbGllbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL211aG96aHVrL0Rlc2t0b3AvZGV2L3BpeGVsLXB1bmNoLWdhbWUvcGFja2FnZXMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmRvdGVudi5jb25maWcoKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGRlZmluZToge1xuICAgIF9fU0VSVkVSX1BPUlRfXzogcHJvY2Vzcy5lbnYuU0VSVkVSX1BPUlQgfHwgMzAwMSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgYnVpbGQ6IHtcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICBvdXREaXI6IHBhdGguam9pbihfX2Rpcm5hbWUsICdkaXN0L2NsaWVudCcpLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGFwcDogJy4vaW5kZXguaHRtbCcsXG4gICAgICAgIHN3OiAnLi9zdy5qcycsXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBhc3NldEluZm8gPT4ge1xuICAgICAgICAgIC8vIFNlcnZpY2VXb3JrZXIgXHUwNDNEXHUwNDQzXHUwNDM2XHUwNDNEXHUwNDNFIFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQzRVx1MDQzNlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzIgXHUwNDNBXHUwNDNFXHUwNDQwXHUwNDM1XHUwNDNEXHUwNDRDXG4gICAgICAgICAgcmV0dXJuIGFzc2V0SW5mby5uYW1lID09PSAnc3cnXG4gICAgICAgICAgICA/ICdbbmFtZV0uanMnXG4gICAgICAgICAgICA6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcyc7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsnQG11aS9tYXRlcmlhbCcsICdAbXVpL21hdGVyaWFsL2NvbG9ycy9yZWQnXSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVyxTQUFTLG9CQUFvQjtBQUNuWSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLFlBQVksVUFBVTtBQUh0QixJQUFNLG1DQUFtQztBQUl6QyxPQUFPLE9BQU87QUFHZCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixpQkFBaUIsUUFBUSxJQUFJLGVBQWU7QUFBQSxFQUM5QztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBVSxhQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFDTCxhQUFhO0FBQUEsSUFDYixRQUFhLFVBQUssa0NBQVcsYUFBYTtBQUFBLElBQzFDLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLElBQUk7QUFBQSxNQUNOO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0IsZUFBYTtBQUUzQixpQkFBTyxVQUFVLFNBQVMsT0FDdEIsY0FDQTtBQUFBLFFBQ047QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxpQkFBaUIsMEJBQTBCO0FBQUEsRUFDdkQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
