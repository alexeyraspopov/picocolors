/* @prettier */
import { run, bench, summary } from "mitata"

import * as colorette from "colorette"
import kleur from "kleur"
import * as kleurColors from "kleur/colors"
import chalk from "chalk"
import chalk5 from "chalk5"
import ansi from "ansi-colors"
import cliColor from "cli-color"
import picocolors from "../picocolors.js"
import * as nanocolors from "nanocolors"
import * as yoctocolors from "yoctocolors"

summary(() => {
	let index = 1e8

	bench(
		"chalk v4",
		() =>
			chalk.red(".") +
			chalk.yellow(".") +
			chalk.green(".") +
			chalk.bgRed(chalk.black(" ERROR ")) +
			chalk.red(
				" Add plugin " + chalk.yellow("name") + " to use time limit with " + chalk.yellow(++index)
			)
	)

	bench(
		"chalk v5",
		() =>
			chalk5.red(".") +
			chalk5.yellow(".") +
			chalk5.green(".") +
			chalk5.bgRed(chalk5.black(" ERROR ")) +
			chalk5.red(
				" Add plugin " + chalk5.yellow("name") + " to use time limit with " + chalk5.yellow(++index)
			)
	)

	bench(
		"yoctocolors",
		() =>
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
	)

	bench(
		"cli-color",
		() =>
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
	)

	bench(
		"ansi-colors",
		() =>
			ansi.red(".") +
			ansi.yellow(".") +
			ansi.green(".") +
			ansi.bgRed(ansi.black(" ERROR ")) +
			ansi.red(
				" Add plugin " + ansi.yellow("name") + " to use time limit with " + ansi.yellow(++index)
			)
	)

	bench(
		"kleur",
		() =>
			kleur.red(".") +
			kleur.yellow(".") +
			kleur.green(".") +
			kleur.bgRed(kleur.black(" ERROR ")) +
			kleur.red(
				" Add plugin " + kleur.yellow("name") + " to use time limit with " + kleur.yellow(++index)
			)
	)

	bench(
		"kleur/colors",
		() =>
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
	)

	bench(
		"colorette",
		() =>
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
	)

	bench(
		"nanocolors",
		() =>
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
	)

	bench(
		"picocolors",
		() =>
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
	)
})

await run()
