#!/usr/bin/env node

// Benchmark results are unstable. To have more stable results:
// 1. Restart OS. Do not run any applications. Put power cable to laptop.
// 2. Run tests 5 times.
// 3. Took the best result for each candidate.

import benchmark from "benchmark"
import * as colorette from "colorette"
import kleur from "kleur"
import * as kleurColors from "kleur/colors"
import chalk5 from "chalk5"
import chalk4 from "chalk4"
import ansi from "ansi-colors"
import cliColor from "cli-color"
import picocolors from "../picocolors.js"
import * as nanocolors from "nanocolors"
import * as yoctocolors from "yoctocolors"

function formatNumber(number) {
	return String(number)
		.replace(/\d{3}$/, ",$&")
		.replace(/^(\d{1,3})(\d{3},)/, "$1,$2")
}

console.log(colorette.green("colorette"))
console.log(kleur.green("kleur"))
console.log(chalk5.green("chalk5"))
console.log(chalk4.green("chalk4"))
console.log(ansi.green("ansi"))
console.log(cliColor.green("cliColor"))
console.log(picocolors.green("picocolors"))
console.log(nanocolors.green("nanocolors"))
console.log(yoctocolors.green("yoctocolors"))

let suite = new benchmark.Suite()
let out

suite
	.add("chalk5", () => {
		out = chalk5.red("Add plugin to use time limit")
	})
	.add("chalk4", () => {
		out = chalk4.red("Add plugin to use time limit")
	})
	.add("cli-color", () => {
		out = cliColor.red("Add plugin to use time limit")
	})
	.add("ansi-colors", () => {
		out = ansi.red("Add plugin to use time limit")
	})
	.add("kleur", () => {
		out = kleur.red("Add plugin to use time limit")
	})
	.add("kleur/colors", () => {
		out = kleurColors.red("Add plugin to use time limit")
	})
	.add("colorette", () => {
		out = colorette.red("Add plugin to use time limit")
	})
	.add("nanocolors", () => {
		out = nanocolors.red("Add plugin to use time limit")
	})
	.add("yoctocolors", () => {
		out = yoctocolors.red("Add plugin to use time limit")
	})
	.add("picocolors", () => {
		out = picocolors.red("Add plugin to use time limit")
	})
	.on("cycle", event => {
		let prefix = event.target.name === "picocolors" ? "+ " : "  "
		let name = event.target.name.padEnd("kleur/colors  ".length)
		let hz = formatNumber(event.target.hz.toFixed(0)).padStart(11)
		process.stdout.write(`${prefix}${name}${picocolors.bold(hz)} ops/sec\n`)
	})
	.on("error", event => {
		process.stderr.write(picocolors.red(event.target.error.toString()) + "\n")
		process.exit(1)
	})
	.run()
