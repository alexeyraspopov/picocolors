import { readFile, writeFile } from "node:fs/promises"

let script = await readFile("picocolors.js", "utf8")

script = script.replace('require != null && require("tty")', '(await import("tty"))')

let lines = script.split(/\r?\n/)
lines.splice(-3, 3)
script = lines.join("\n")

script += `
let colors = createColors()
colors.createColors = createColors
let {
  reset, bold, dim, italic, underline, inverse, hidden, strikethrough, 
  black, red, green, yellow, blue, magenta, cyan, white, gray,
  bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
} = colors

export {
  isColorSupported, reset, bold, dim, italic, underline, inverse, hidden, strikethrough, 
  black, red, green, yellow, blue, magenta, cyan, white, gray,
  bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, createColors
}
export default colors
`;

await writeFile("picocolors.mjs", script)
