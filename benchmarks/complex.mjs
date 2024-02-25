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

let suite = new benchmark.Suite()
let out

let index = 1e8

suite
	.add("chalk5", () => {
		out =
			chalk5.red(".") +
			chalk5.yellow(".") +
			chalk5.green(".") +
			chalk5.bgRed(chalk5.black(" ERROR ")) +
			chalk5.red(
				" Add plugin " + chalk5.yellow("name") + " to use time limit with " + chalk5.yellow(++index)
			)
	})
	.add("chalk4", () => {
		out =
			chalk4.red(".") +
			chalk4.yellow(".") +
			chalk4.green(".") +
			chalk4.bgRed(chalk4.black(" ERROR ")) +
			chalk4.red(
				" Add plugin " + chalk4.yellow("name") + " to use time limit with " + chalk4.yellow(++index)
			)
	})
	.add("cli-color", () => {
		out =
			cliColor.red(".") +
			cliColor.yellow(".") +
			cliColor.green(".") +
			cliColor.bgRed(cliColor.black(" ERROR ")) +
			cliColor.red(
				" Add plugin " +
					cliColor.yellow("name") +
					" to use time limit with " +
					cliColor.yellow(++index)
			)
	})
	.add("ansi-colors", () => {
		out =
			ansi.red(".") +
			ansi.yellow(".") +
			ansi.green(".") +
			ansi.bgRed(ansi.black(" ERROR ")) +
			ansi.red(
				" Add plugin " + ansi.yellow("name") + " to use time limit with " + ansi.yellow(++index)
			)
	})
	.add("kleur", () => {
		out =
			kleur.red(".") +
			kleur.yellow(".") +
			kleur.green(".") +
			kleur.bgRed(kleur.black(" ERROR ")) +
			kleur.red(
				" Add plugin " + kleur.yellow("name") + " to use time limit with " + kleur.yellow(++index)
			)
	})
	.add("kleur/colors", () => {
		out =
			kleurColors.red(".") +
			kleurColors.yellow(".") +
			kleurColors.green(".") +
			kleurColors.bgRed(kleurColors.black(" ERROR ")) +
			kleurColors.red(
				" Add plugin " +
					kleurColors.yellow("name") +
					" to use time limit with " +
					kleurColors.yellow(++index)
			)
	})
	.add("colorette", () => {
		out =
			colorette.red(".") +
			colorette.yellow(".") +
			colorette.green(".") +
			colorette.bgRed(colorette.black(" ERROR ")) +
			colorette.red(
				" Add plugin " +
					colorette.yellow("name") +
					" to use time limit with " +
					colorette.yellow(++index)
			)
	})
	.add("nanocolors", () => {
		out =
			nanocolors.red(".") +
			nanocolors.yellow(".") +
			nanocolors.green(".") +
			nanocolors.bgRed(nanocolors.black(" ERROR ")) +
			nanocolors.red(
				" Add plugin " +
					nanocolors.yellow("name") +
					" to use time limit with " +
					nanocolors.yellow(++index)
			)
	})
	.add("yoctocolors", () => {
		out =
			yoctocolors.red(".") +
			yoctocolors.yellow(".") +
			yoctocolors.green(".") +
			yoctocolors.bgRed(yoctocolors.black(" ERROR ")) +
			yoctocolors.red(
				" Add plugin " +
					yoctocolors.yellow("name") +
					" to use time limit with " +
					yoctocolors.yellow(++index)
			)
	})
	.add("picocolors", () => {
		out =
			picocolors.red(".") +
			picocolors.yellow(".") +
			picocolors.green(".") +
			picocolors.bgRed(picocolors.black(" ERROR ")) +
			picocolors.red(
				" Add plugin " +
					picocolors.yellow("name") +
					" to use time limit with " +
					picocolors.yellow(`${++index}`)
			)
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
