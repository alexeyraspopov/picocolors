import { readFile } from "node:fs/promises"

let script = await readFile("node_modules/chalk5/source/index.js", "utf8")

script = script.replace("./utilities.js", "./node_modules/chalk5/source/utilities.js")
script = script.replace("./vendor/ansi-styles/index.js", "./node_modules/chalk5/source/vendor/ansi-styles/index.js")
script = script.replace("#ansi-styles", "./node_modules/chalk5/source/vendor/ansi-styles/index.js")
script = script.replace("#supports-color", "./node_modules/chalk5/source/vendor/supports-color/index.js")

process.stdout.write(script);
