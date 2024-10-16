/* @prettier */
import { run, bench, summary } from "mitata"

import * as colorette from "colorette"
import kleur from "kleur"
import * as kleurColors from "kleur/colors"
import chalk from "chalk"
import ansi from "ansi-colors"
import cliColor from "cli-color"
import picocolors from "../picocolors.js"
import * as nanocolors from "nanocolors"

let count = 1000
let input = "lorem ipsum dolor sit amet"

summary(() => {
	bench("chalk", () => {
		return chalk.blue(chalk.red(input).repeat(count))
	})

	bench("cli-color", () => {
		return cliColor.blue(cliColor.red(input).repeat(count))
	})

	bench("ansi-colors", () => {
		return ansi.blue(ansi.red(input).repeat(count))
	})

	bench("kleur", () => {
		return kleur.blue(kleur.red(input).repeat(count))
	})

	bench("kleur/colors", () => {
		return kleurColors.blue(kleurColors.red(input).repeat(count))
	})

	bench("colorette", () => {
		return colorette.blue(colorette.red(input).repeat(count))
	})

	bench("nanocolors", () => {
		return nanocolors.blue(nanocolors.red(input).repeat(count))
	})

	bench("picocolors", () => {
		return picocolors.blue(picocolors.red(input).repeat(count))
	})
})

await run()
