import copy from "rollup-plugin-copy"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"

export default {
	input: "./src/index.ts",
	output: {
		dir: "./dist/node",
		format: "cjs",
	},
	plugins: [
		typescript({
			tsconfig: "./tsconfig.json",
		}),
		resolve(),
		commonjs(),
		json(),
		copy({
            targets: [{ src: "./.env", dest: "./dist" }],
        }),
	],
}