import { Colors, Formatter } from "./types"

export { Colors }

declare type Generator = (enabled?: boolean) => Colors

declare const picocolors: Colors & { createColors: Generator }

export default picocolors

export let isColorSupported: boolean
export let reset: Formatter
export let bold: Formatter
export let dim: Formatter
export let italic: Formatter
export let underline: Formatter
export let inverse: Formatter
export let hidden: Formatter
export let strikethrough: Formatter
export let black: Formatter
export let red: Formatter
export let green: Formatter
export let yellow: Formatter
export let blue: Formatter
export let magenta: Formatter
export let cyan: Formatter
export let white: Formatter
export let gray: Formatter
export let bgBlack: Formatter
export let bgRed: Formatter
export let bgGreen: Formatter
export let bgYellow: Formatter
export let bgBlue: Formatter
export let bgMagenta: Formatter
export let bgCyan: Formatter
export let bgWhite: Formatter

export let createColors: Generator
