/* @prettier */
import { buildSync } from "esbuild"
import { dirname } from "node:path"

console.table({
  picocolors: build(`export { default as picocolors } from "../picocolors.js"`),
  colorette: build(`export * as colorette from "colorette"`),
  chalk: build(`export { default as chalk } from "chalk"`),
  kleur: build(`export { default as kleur } from "kleur"`),
  "kleur/colors": build(`export * as kleurColors from "kleur/colors"`),
  "ansi-colors": build(`export { default as ansi } from "ansi-colors"`),
  "cli-color": build(`export { default as cliColor } from "cli-color"`),
  nanocolors: build(`export * as nanocolors from "nanocolors"`),
})

function build(contents) {
  let root = dirname(new URL(import.meta.url).pathname)
  let result = buildSync({
    bundle: true,
    write: false,
    minify: false,
    platform: "node",
    stdin: { contents, loader: "js", resolveDir: root },
  })
  let code = result.outputFiles[0].text
  return { "size (KB)": toKB(code.length) }
}

function toKB(value) {
  return (((value / 1024) * 100) | 0) / 100
}
