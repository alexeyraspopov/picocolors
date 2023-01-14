let tty = require("tty")

let isColorSupported =
	!("NO_COLOR" in process.env || process.argv.includes("--no-color")) &&
	("FORCE_COLOR" in process.env ||
		process.argv.includes("--color") ||
		process.platform === "win32" ||
		(tty.isatty(1) && process.env.TERM !== "dumb") ||
		"CI" in process.env)

let formatter =
	(open, close, replace = open) =>
		!isColorSupported ? String : input => {
			let string = "" + input
			let index = string.indexOf(close, open.length)
			return ~index
				? open + replaceClose(string, close, replace, index) + close
				: open + string + close
		}

let replaceClose = (string, close, replace, index) => {
	let start = string.substring(0, index) + replace
	let end = string.substring(index + close.length)
	let nextIndex = end.indexOf(close)
	return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end
}

let createColors = (enabled = isColorSupported) => ({
	isColorSupported: enabled,
	reset: enabled ? s => `\x1b[0m${s}\x1b[0m` : String,
	bold: formatter("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m"),
	dim: formatter("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m"),
	italic: formatter("\x1b[3m", "\x1b[23m"),
	underline: formatter("\x1b[4m", "\x1b[24m"),
	inverse: formatter("\x1b[7m", "\x1b[27m"),
	hidden: formatter("\x1b[8m", "\x1b[28m"),
	strikethrough: formatter("\x1b[9m", "\x1b[29m"),
	black: formatter("\x1b[30m", "\x1b[39m"),
	red: formatter("\x1b[31m", "\x1b[39m"),
	green: formatter("\x1b[32m", "\x1b[39m"),
	yellow: formatter("\x1b[33m", "\x1b[39m"),
	blue: formatter("\x1b[34m", "\x1b[39m"),
	magenta: formatter("\x1b[35m", "\x1b[39m"),
	cyan: formatter("\x1b[36m", "\x1b[39m"),
	white: formatter("\x1b[37m", "\x1b[39m"),
	gray: formatter("\x1b[90m", "\x1b[39m"),
	bgBlack: formatter("\x1b[40m", "\x1b[49m"),
	bgRed: formatter("\x1b[41m", "\x1b[49m"),
	bgGreen: formatter("\x1b[42m", "\x1b[49m"),
	bgYellow: formatter("\x1b[43m", "\x1b[49m"),
	bgBlue: formatter("\x1b[44m", "\x1b[49m"),
	bgMagenta: formatter("\x1b[45m", "\x1b[49m"),
	bgCyan: formatter("\x1b[46m", "\x1b[49m"),
	bgWhite: formatter("\x1b[47m", "\x1b[49m"),
})

module.exports = createColors()
module.exports.createColors = createColors
