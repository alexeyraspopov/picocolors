type Formatter = (input: string | number | null | undefined) => string

interface Colors {
	isColorSupported: boolean
	reset: Formatter
	bold: Formatter
	dim: Formatter
	italic: Formatter
	underline: Formatter
	inverse: Formatter
	hidden: Formatter
	strikethrough: Formatter
	black: Formatter
	red: Formatter
	green: Formatter
	yellow: Formatter
	blue: Formatter
	magenta: Formatter
	cyan: Formatter
	white: Formatter
	gray: Formatter
	bgBlack: Formatter
	bgRed: Formatter
	bgGreen: Formatter
	bgYellow: Formatter
	bgBlue: Formatter
	bgMagenta: Formatter
	bgCyan: Formatter
	bgWhite: Formatter
}

declare const picocolors: Colors & { createColors: (enabled: boolean) => Colors }

export = picocolors
