let argv = process.argv || [],
	env = process.env
let isColorSupported =
	!("NO_COLOR" in env || argv.includes("--no-color")) &&
	("FORCE_COLOR" in env ||
		argv.includes("--color") ||
		process.platform === "win32" ||
		(require != null && require("tty").isatty(1) && env.TERM !== "dumb") ||
		"CI" in env)

let formatter =
	(open, close, replace = open) =>
	input => {
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

const _colors = {
	reset: ["\x1b[0m", "\x1b[0m"],
	bold: ["\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m"],
	dim: ["\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m"],
	italic: ["\x1b[3m", "\x1b[23m"],
	underline: ["\x1b[4m", "\x1b[24m"],
	inverse: ["\x1b[7m", "\x1b[27m"],
	hidden: ["\x1b[8m", "\x1b[28m"],
	strikethrough: ["\x1b[9m", "\x1b[29m"],
	black: ["\x1b[30m", "\x1b[39m"],
	red: ["\x1b[31m", "\x1b[39m"],
	green: ["\x1b[32m", "\x1b[39m"],
	yellow: ["\x1b[33m", "\x1b[39m"],
	blue: ["\x1b[34m", "\x1b[39m"],
	magenta: ["\x1b[35m", "\x1b[39m"],
	cyan: ["\x1b[36m", "\x1b[39m"],
	white: ["\x1b[37m", "\x1b[39m"],
	gray: ["\x1b[90m", "\x1b[39m"],
	bgBlack: ["\x1b[40m", "\x1b[49m"],
	bgRed: ["\x1b[41m", "\x1b[49m"],
	bgGreen: ["\x1b[42m", "\x1b[49m"],
	bgYellow: ["\x1b[43m", "\x1b[49m"],
	bgBlue: ["\x1b[44m", "\x1b[49m"],
	bgMagenta: ["\x1b[45m", "\x1b[49m"],
	bgCyan: ["\x1b[46m", "\x1b[49m"],
	bgWhite: ["\x1b[47m", "\x1b[49m"],
}

let createColors = (enabled = isColorSupported) => {
	const colors = { isColorSupported: enabled }
	for (const [key, value] of Object.entries(_colors)) {
		colors[key] = enabled ? formatter(...value) : String
	}
	return colors
}

module.exports = createColors()
module.exports.createColors = createColors
