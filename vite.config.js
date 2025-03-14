import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  const PORT = parseInt(env.PORT || "3000", 10);

  // Set NODE_ENV based on command and mode
  const nodeEnv = mode === "production" ? "production" : "development";
  process.env.NODE_ENV = nodeEnv;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/client"),
      },
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: `http://localhost:${PORT}`,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("proxy error", err);
            });
            proxy.on("proxyReq", (proxyReq, req, _res) => {
              console.log(
                "Sending Request to the Target:",
                req.method,
                req.url
              );
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url
              );
            });
          },
        },
      },
    },
    define: {
      // Set NODE_ENV based on mode
      "process.env.NODE_ENV": JSON.stringify(nodeEnv),
      // Expose env variables to the client
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
  };
});
