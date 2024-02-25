import { readFile } from "node:fs/promises"

let script = await readFile("node_modules/yoctocolors/index.js", "utf8")

script = script.replace("import tty from 'node:tty'", "const tty = require('node:tty')")

process.stdout.write(script);
