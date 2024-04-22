import del from "rollup-plugin-delete"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

export default {
	input: "./src/index.ts",
	output: {
		dir: "./dist/node",
		format: "cjs",
	},
	plugins: [
		del({ targets: "./dist/*" }),
		typescript({
			tsconfig: "./tsconfig.json",
		}),
		resolve(),
		commonjs(),
		copy({
            targets: [{ src: "./.env", dest: "./dist" }],
        }),
	],
}