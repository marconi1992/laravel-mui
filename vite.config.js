import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        if (id.includes("@mui")) {
                            return "vendor_mui";
                        }

                        if (id.includes("apexcharts")) {
                            return "vendor_apexcharts";
                        }

                        return "vendor"; // all other package goes here
                    }
                },
            },
        },
    },
    server: {
        host: "0.0.0.0",
        hmr: {
            host: "localhost",
        },
    },
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
        visualizer({
            template: "treemap", // or sunburst
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: "analice.html",
        }),
    ],
});
