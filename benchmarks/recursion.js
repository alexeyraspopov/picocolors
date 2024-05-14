#!/usr/bin/env node

// Benchmark results are unstable. To have more stable results:
// 1. Restart OS. Do not run any applications. Put power cable to laptop.
// 2. Run tests 5 times.
// 3. Took the best result for each candidate.

let benchmark = require("benchmark")
let colorette = require("colorette")
let kleur = require("kleur")
let kleurColors = require("kleur/colors")
let chalk = require("chalk")
let ansi = require("ansi-colors")
let cliColor = require("cli-color")
let picocolors = require("../picocolors.js")
let picocolorsw = require("../picocolors-w.js")
let nanocolors = require("nanocolors")

function formatNumber(number) {
	return String(number)
		.replace(/\d{3}$/, ",$&")
		.replace(/^(\d|\d\d)(\d{3},)/, "$1,$2")
}

let suite = new benchmark.Suite()
let out
let count = 1000
let input = "lorem ipsum dolor sit amet"

suite
	.add("chalk", () => {
		out = chalk.blue(chalk.red(input).repeat(count))
	})
	.add("cli-color", () => {
		out = cliColor.blue(cliColor.red(input).repeat(count))
	})
	.add("ansi-colors", () => {
		out = ansi.blue(ansi.red(input).repeat(count))
	})
	.add("kleur", () => {
		out = kleur.blue(kleur.red(input).repeat(count))
	})
	.add("kleur/colors", () => {
		out = kleurColors.blue(kleurColors.red(input).repeat(count))
	})
	.add("colorette", () => {
		out = colorette.blue(colorette.red(input).repeat(count))
	})
	.add("nanocolors", () => {
		out = nanocolors.blue(nanocolors.red(input).repeat(count))
	})
	.add("picocolors", () => {
		out = picocolors.blue(picocolors.red(input).repeat(count))
	})
	.add("updated", () => {
		out = picocolorsw.blue(picocolorsw.red(input).repeat(count))
	})
	.on("cycle", event => {
		let prefix = event.target.name === "picocolors" ? "+ " : "  "
		let name = event.target.name.padEnd("kleur/colors  ".length)
		let hz = formatNumber(event.target.hz.toFixed(0)).padStart(10)
		process.stdout.write(`${prefix}${name}${picocolors.bold(hz)} ops/sec\n`)
	})
	.on("error", event => {
		process.stderr.write(picocolors.red(event.target.error.toString()) + "\n")
		process.exit(1)
	})
	.run()
