import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        if (id.includes("@mui")) {
                            return "vendor_mui";
                        }
                        return "vendor";
                    }
                },
            },
        },
    },
    plugins: [react(), tsconfigPaths()],
});
