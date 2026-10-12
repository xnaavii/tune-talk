import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		// Run the server in Frankfurt, next to the Neon database (eu-central-1),
		// instead of Vercel's default Washington, D.C. region.
		nitro({ vercel: { functions: { regions: ["fra1"] } } }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});

export default config;
