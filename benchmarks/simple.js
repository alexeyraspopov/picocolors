#!/usr/bin/env node

// Benchmark results are unstable. To have more stable results:
// 1. Restart OS. Do not run any applications. Put power cable to laptop.
// 2. Run tests 5 times.
// 3. Took the best result for each candidate.

let benchmark = require("benchmark")
let colorette = require("colorette")
let kleur = require("kleur")
let kleurColors = require("kleur/colors")
let chalk5 = require("./chalk5").default
let chalk4 = require("chalk4")
let ansi = require("ansi-colors")
let cliColor = require("cli-color")
let picocolors = require("../picocolors.js")
let nanocolors = require("nanocolors")
let yoctocolors = require("./yoctocolors")

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
