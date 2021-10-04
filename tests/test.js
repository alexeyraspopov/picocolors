let pc = require("../picocolors.js")
let assert = require("assert")

const FMT = {
	reset: ["\x1b[0m", "\x1b[0m"],
	bold: ["\x1b[1m", "\x1b[22m"],
	dim: ["\x1b[2m", "\x1b[22m"],
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

test("color matching", () => {
	for (let format in FMT) {
		assert.equal(pc[format]("string"), FMT[format][0] + "string" + FMT[format][1])
		console.log(pc[format]("testing: " + format))
	}
})

test("format/color nesting", () => {
	assert.equal(
		pc.bold(`BOLD ${pc.red(`RED ${pc.dim("DIM")} RED`)} BOLD`),
		FMT.bold[0] +
			"BOLD " +
			FMT.red[0] +
			"RED " +
			FMT.dim[0] +
			"DIM" +
			FMT.dim[1] +
			FMT.bold[0] +
			" RED" +
			FMT.red[1] +
			" BOLD" +
			FMT.bold[1]
	)
})

test("proper wrapping", () => {
	assert.equal(
		pc.red(pc.bold("==TEST==")),
		FMT.red[0] + FMT.bold[0] + "==TEST==" + FMT.bold[1] + FMT.red[1]
	)
})

test("complex case of wrapping", () => {
	assert.equal(
		pc.bold(pc.yellow(pc.bgRed(pc.italic("==TEST==")))),
		FMT.bold[0] +
			FMT.yellow[0] +
			FMT.bgRed[0] +
			FMT.italic[0] +
			"==TEST==" +
			FMT.italic[1] +
			FMT.bgRed[1] +
			FMT.yellow[1] +
			FMT.bold[1]
	)

	assert.equal(
		pc.cyan(pc.bold(pc.underline("==TEST=="))),
		FMT.cyan[0] +
			FMT.bold[0] +
			FMT.underline[0] +
			"==TEST==" +
			FMT.underline[1] +
			FMT.bold[1] +
			FMT.cyan[1]
	)
})

test("close sequence replacement", () => {
	assert.equal(
		pc.red(`foo ${pc.yellow("bar")} baz`),
		FMT.red[0] + "foo " + FMT.yellow[0] + "bar" + FMT.red[0] + " baz" + FMT.red[1]
	)

	assert.equal(
		pc.bold(`foo ${pc.red(pc.dim("bar"))} baz`),
		FMT.bold[0] +
			"foo " +
			FMT.red[0] +
			FMT.dim[0] +
			"bar" +
			FMT.dim[1] +
			FMT.bold[0] +
			FMT.red[1] +
			" baz" +
			FMT.bold[1]
	)

	assert.equal(
		pc.yellow(`foo ${pc.red(pc.bold("red"))} bar ${pc.cyan("cyan")} baz`),
		FMT.yellow[0] +
			"foo " +
			FMT.red[0] +
			FMT.bold[0] +
			"red" +
			FMT.bold[1] +
			FMT.yellow[0] +
			" bar " +
			FMT.cyan[0] +
			"cyan" +
			FMT.yellow[0] +
			" baz" +
			FMT.yellow[1]
	)
})

test("non-string input", () => {
	assert.equal(pc.red(), FMT.red[0] + "undefined" + FMT.red[1])
	assert.equal(pc.red(undefined), FMT.red[0] + "undefined" + FMT.red[1])
	assert.equal(pc.red(0), FMT.red[0] + "0" + FMT.red[1])
	assert.equal(pc.red(NaN), FMT.red[0] + "NaN" + FMT.red[1])
	assert.equal(pc.red(null), FMT.red[0] + "null" + FMT.red[1])
	assert.equal(pc.red(true), FMT.red[0] + "true" + FMT.red[1])
	assert.equal(pc.red(false), FMT.red[0] + "false" + FMT.red[1])
	assert.equal(pc.red(Infinity), FMT.red[0] + "Infinity" + FMT.red[1])
})

function test(name, fn) {
	try {
		fn()
		console.log(pc.green("✓ " + name))
	} catch (error) {
		console.log(pc.red("✗ " + name))
		throw error
	}
}
