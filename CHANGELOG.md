# Changelog

## [v1.1.1](https://github.com/alexeyraspopov/picocolors/releases/tag/v1.1.1)

- Moved TypeScript declarations to a `d.ts` file ([#82](https://github.com/alexeyraspopov/picocolors/pull/82))
- Reworked color detection algorithm to properly work with empty strings in `NO_COLOR` and `FORCE_COLOR` env variables ([#87](https://github.com/alexeyraspopov/picocolors/pull/87))
- Eliminated `require()` call to make the package compatible with some tools ([#87](https://github.com/alexeyraspopov/picocolors/pull/87))

## [v1.1.0](https://github.com/alexeyraspopov/picocolors/releases/tag/v1.1.0)

- Added bright color variants ([#55](https://github.com/alexeyraspopov/picocolors/pull/55))

## [v1.0.1](https://github.com/alexeyraspopov/picocolors/releases/tag/v1.0.1)

- Updated color detection mechanism to work properly on Vercel Edge Runtime ([#64](https://github.com/alexeyraspopov/picocolors/pull/64))
- Remove use of recursion to avoid possible stack overflow for very long inputs ([#56](https://github.com/alexeyraspopov/picocolors/pull/56))

## [v1.0.0](https://github.com/alexeyraspopov/picocolors/releases/tag/v1.0.0)

- Removed several code elements to reduce the package size ([#31](https://github.com/alexeyraspopov/picocolors/pull/31))
- Fixed optional flag for `createColors()` in TypeScript typings ([#34](https://github.com/alexeyraspopov/picocolors/pull/34))

## [v0.2.1](https://github.com/alexeyraspopov/picocolors/releases/tag/v0.2.1)

- Removed semicolons to reduce the package size ([#28](https://github.com/alexeyraspopov/picocolors/pull/28))
- Fixed type definitions ([#29](https://github.com/alexeyraspopov/picocolors/pull/29))
- Made `createColors()` use `isColorSupported` if no flag was provided ([`aaf57e1`](https://github.com/alexeyraspopov/picocolors/commit/aaf57e14b250112c6ad4fbeff08ad78cafc6c887))

## [v0.2.0](https://github.com/alexeyraspopov/picocolors/releases/tag/v0.2.0)

- Removed ESM Module to fix the rest of compatibility issues and reduce package size ([#26](https://github.com/alexeyraspopov/picocolors/pull/26))
- Added support for non-string inputs ([`3276400`](https://github.com/alexeyraspopov/picocolors/commit/3276400d5046c93ae56648e3db137a20b1f420b4))

## [v0.1.0](https://github.com/alexeyraspopov/picocolors/releases/tag/v0.1.0)

- Added CommonJS support ([#7](https://github.com/alexeyraspopov/picocolors/pull/7))
- Ensured Node.js 6+ support ([#8](https://github.com/alexeyraspopov/picocolors/pull/8))
- Added Browsers support ([#10](https://github.com/alexeyraspopov/picocolors/pull/10))
