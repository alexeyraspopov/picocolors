import tty from "tty";

export let isColorSupported =
  !("NO_COLOR" in process.env || process.argv.includes("--no-color")) &&
  ("FORCE_COLOR" in process.env ||
    process.argv.includes("--color") ||
    process.platform === "win32" ||
    (tty.isatty(1) && process.env.TERM !== "dumb") ||
    "CI" in process.env);

function formatter(open, close, replace = open) {
  return isColorSupported
    ? (string) =>
        open + replaceClose(string, close, replace, string.indexOf(close, open.length)) + close
    : (string) => string;
}

function replaceClose(string, close, replace, index) {
  if (!~index) return string;
  let start = string.substring(0, index) + replace;
  let end = string.substring(index + close.length);
  return start + replaceClose(end, close, replace, end.indexOf(close));
}

export let reset = (s) => `\x1b[0m${s}\x1b[0m`;
export let bold = formatter("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m");
export let dim = formatter("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m");
export let italic = formatter("\x1b[3m", "\x1b[23m");
export let underline = formatter("\x1b[4m", "\x1b[24m");
export let inverse = formatter("\x1b[7m", "\x1b[27m");
export let hidden = formatter("\x1b[8m", "\x1b[28m");
export let strikethrough = formatter("\x1b[9m", "\x1b[29m");
export let black = formatter("\x1b[30m", "\x1b[39m");
export let red = formatter("\x1b[31m", "\x1b[39m");
export let green = formatter("\x1b[32m", "\x1b[39m");
export let yellow = formatter("\x1b[33m", "\x1b[39m");
export let blue = formatter("\x1b[34m", "\x1b[39m");
export let magenta = formatter("\x1b[35m", "\x1b[39m");
export let cyan = formatter("\x1b[36m", "\x1b[39m");
export let white = formatter("\x1b[37m", "\x1b[39m");
export let gray = formatter("\x1b[90m", "\x1b[39m");
export let bgBlack = formatter("\x1b[40m", "\x1b[49m");
export let bgRed = formatter("\x1b[41m", "\x1b[49m");
export let bgGreen = formatter("\x1b[42m", "\x1b[49m");
export let bgYellow = formatter("\x1b[43m", "\x1b[49m");
export let bgBlue = formatter("\x1b[44m", "\x1b[49m");
export let bgMagenta = formatter("\x1b[45m", "\x1b[49m");
export let bgCyan = formatter("\x1b[46m", "\x1b[49m");
export let bgWhite = formatter("\x1b[47m", "\x1b[49m");
