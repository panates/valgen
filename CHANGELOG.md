# Changelog

<!-- rman:documented-up-to 88d78fca4a6923eefb800bbb06c2ffd751ecfe65 -->

## v7.0.5 (2026-10-12)

### 🧹 Chores

- sync lockfile (820b08f)
- update dependencies (5b4812d)

### 💬 General Changes

- Merge remote-tracking branch 'origin/dev' into dev (f9befff)

---

## v7.0.4 (2026-10-10)

### 🐛 Bug Fixes

- import only isValid and parseISO from date-fns (7252ce0)

### 🧹 Chores

- add contributors (1931582)
- migrate to rman 2.x and the shared GitHub Actions workflows (ac8b0c5)
- update dependencies and remove unused packages in package-lock.json (bd847ee)

---

## v7.0.3 (2026-09-13)

### 🐛 Bug Fixes

- point coverage badge at dev instead of the stale master record (bb5abeb)

### 📚 Documentation

- add real TSDoc to the core module (cac3693)
- add real TSDoc to every rule function across all categories (8b23503)

### 🧹 Chores

- remove deprecated homepage field from package.json (be403e3)
- update dpdm check script to skip dynamic imports and set circular dependency exit code (6a3f716)

---

## v7.0.2 (2026-09-10)

### 🧹 Chores

- update dependencies and homepage in package.json and package-lock.json (decb178)

---

## v7.0.1 (2026-09-10)

### 🐛 Bug Fixes

- oneOf was crushing the real error when every candidate failed (e5870e1)
- oneOf reports the actual candidate error directly, not a generic one (f6c5490)

### 📚 Documentation

- track a baseline commit for the API reference, document the practice (2af6d02)
- bump API docs baseline to the oneOf fix commit (398e85a)
- bump API docs baseline to the oneOf direct-error-message fix (d504378)

---

## v7.0.0 (2026-09-08)

### ✨ Features

- Integrate `graphify` for knowledge graph generation and add related documentation and scripts (c51144f)
- add a benchmark tool and fix real perf/correctness issues it found (c8660e7)
- write benchmark results to BENCHMARKS.md and show live progress (9bfb49c)

### 🐛 Bug Fixes

- correct several validator edge-case bugs (e313dd3)
- more validator correctness fixes and a doc correction (f96c5ae)
- stateful regex and wrong property lookup in two rules (bf875e4)
- forward options in allOf/oneOf and fix iif's success check (bf76ca5)
- stop the memory pass's own forceGc() from erasing what it measures (01cf98e)
- bugs found while writing the API reference docs (21940b8)

### ⚡ Performance and Optimizations

- fix remaining wrong-slot nested calls, benchmark rest of utility-rules (d60ee5d)

### 📚 Documentation

- add a detailed API reference and rewrite the README (96f6697)

### 🧪 Tests

- raise coverage to ~99% and fix bugs found along the way (fc7d6b3)
- add benchmarks for all format-rules and fix two stale JSDoc comments (ce39180)

### 🧹 Chores

- Updated dependencies (4bae352)
- update dependencies (npm packages) (36ec1b4)
- remove dead helper files (7c17682)
- refresh BENCHMARKS.md from a new run (74dd529)

---

## v6.2.2 (2026-05-21)

### ✨ Features

- Add `separators` option to `toDateString` for enhanced formatting customization (39c3016)

---

## v6.2.1 (2026-05-21)

### ✨ Features

- Added `separators` option to `isDateString`, updated logic and tests for custom separator handling (3a35c11)

### 🧹 Chores

- updated dependencies (7ecff7e)

---

## v6.2.0 (2026-05-14)

### ✨ Features

- Added `fixed` validator (96f0101)

### 🔧 Refactoring

- Replaced hardcoded validator names with function names, added nullable validator and tests (569d1b2)

---

## v6.1.0 (2026-04-30)

### ✨ Features

- Added isInstanceOf validator with tests and export (2bee3dc)

### 🔧 Refactoring

- Updated imports for consistency and maintenance, upgraded dependencies in package-lock.json (b9a25a2)

---

## v6.0.3 (2026-04-06)

### 🔧 Refactoring

- Removed isPassportNumber.CountryCode type (1bd50a1)

---

## v6.0.2 (2026-04-06)

### 🔧 Refactoring

- Exposed "isCreditCard.Provider" type (b3c042e)
- Exposed "isPassportNumber.Locale" type (6e8b29c)
- Exposed "isPassportNumber.CountryCode" type (1591c10)

---

## v6.0.1 (2026-04-06)

### 🔧 Refactoring

- Exposed "MobilePhoneLocale" (3770944)

---

## v6.0.0 (2026-04-06)

### 🔧 Refactoring

- Minor typing update (8c09683)
- Improved typing exports using namespaces (6e755fb)

### 🧹 Chores

- Ignored .tsbuildinfo in .gitignore (80b08e0)

### 💬 General Changes

- Fixed issues for new lint rules (9fdde3a)

---

## v5.20.0 (2026-04-06)

### ✨ Features

- Added UID version 6,7 and 8 validation support (f4ea352)

### 🧹 Chores

- Updated deps (ae6473f)

---

## v5.19.5 (2026-02-23)

### 🐛 Bug Fixes

- Fixed "ms" serialization issue (1d5e0ee)

### 🧹 Chores

- Removed unnecessary comment (93e8104)

---

## v5.19.4 (2026-01-20)

### ✨ Features

- Handle TypeScript enums in isEnum validator (7a2dbd9)

---

## v5.19.3 (2026-01-19)

### 🐛 Bug Fixes

- toDateString do not trim (123495e)

---

## v5.19.2 (2026-01-19)

### 🔧 Refactoring

- Refactored isDateString options (01919ae)

---

## v5.19.1 (2026-01-19)

### ✨ Features

- Added "trim" option to "toDateString" (bbc3793)

### 🧪 Tests

- Set timezone for entire job in test workflow (345cb19)

---

## v5.19.0 (2026-01-19)

### 💬 General Changes

- Removed cjs support (7fe05c6)

---

## v5.18.3 (2026-01-19)

### 🐛 Bug Fixes

- Fixed precision and trim issue of isDate rule (33a7de2)

### 🧹 Chores

- Updated deps (9448baa)

### 💬 General Changes

- npm Trusted publishing update (b5ebdd2)

---

## v5.18.2 (2025-08-29)

### 🔧 Refactoring

- Set precision of toDateString() to "day" (0de2c4d)

### 🧹 Chores

- Updated node ver (cdedcc9)
- Updated node options (b649be9)
- Updated deps (9f0e4ac)

---

## v5.18.1 (2025-08-27)

### 🐛 Bug Fixes

- Increased ms precision (f4b2d16)

### 🧹 Chores

- Updated deps (c2b75d7)

---

## v5.18.0 (2025-07-31)

### ✨ Features

- isTime accept Date instance (4e0fbb0)

### 🐛 Bug Fixes

- Minor fix in isDate rule (c79b729)

---

## v5.17.3 (2025-07-30)

### ✨ Features

- isDate can parse date string without signs (e7b9170)

---

## v5.17.2 (2025-07-29)

### 🔧 Refactoring

- Minor date rule optimization (aac3924)

---

## v5.17.1 (2025-07-24)

### 🐛 Bug Fixes

- isDate milliseconds padding (501650a)

### 🧹 Chores

- Removed js-temporal/polyfill from package.json (3c8702b)

---

## v5.17.0 (2025-07-24)

### 🔧 Refactoring

- Refactored isDate and isDateString validation rules refactor: Optimizations fix: Minor bug fixes chore: Updated dependencies (18a86ec)

---

## v5.16.0 (2025-07-16)

### 🔧 Refactoring

- Refactored isDate and isDateString validation rules (de4c59b)

---

## v5.15.4 (2025-07-11)

### 🔧 Refactoring

- Exported default isTime rule (edfbce1)

---

## v5.15.3 (2025-06-20)

### ✨ Features

- Adde default value option to "required" rule (378329d)

### 🧹 Chores

- Corrected test describe text (0971c4b)
- Updated dependencies (d5929d7)

---

## v5.15.2 (2025-05-27)

### 🔧 Refactoring

- Refactored isGte, isGt, isLte, isLt typing (c5bb3c6)

---

## v5.15.1 (2025-05-27)

### ✨ Features

- Added isTime rule (fcc15e7)

### 🐛 Bug Fixes

- Error message fix (3414801)

### 🔧 Refactoring

- Removed path filter (28d9c17)

### 🧹 Chores

- Updated dependencies (6e476f8)

---

## v5.15.0 (2025-04-24)

### ✨ Features

- Added isEqual, isNotEqual rules (8d8bdaf)
- Added discriminator validation to oneOf rule (12a806c)

### 🔧 Refactoring

- Removed union rule. Use oneOf rule instead (ca378c6)
- Fixes and improvements (5d569f4)

---

## v5.14.1 (2025-04-21)

### 🐛 Bug Fixes

- Fixed validation issue while using silent mode (524afed)

### 🤖 Continuous Integration

- Added workflows (b47cca1)

### 💬 General Changes

- Added qc script (cf01918)
- Fixed nycrc file (277bf4f)
- Added publishConfig (c48e1bd)
- Fixed paths (9cbf033)
- Moved from nyc to c8 (9ff73ec)

---

## v5.14.0 (2025-03-30)

### 🔧 Refactoring

- Moved from jest to mocha refactor: Updated dependencies doc: Updated CHANGELOG template ci: Moved to new workflows (acea761)

---

## v5.13.4 (2025-03-26)

### 🐛 Bug Fixes

- isNotEmpty do not work for number and boolean types (e5175d8)

---

## v5.13.3 (2025-03-17)

### 🐛 Bug Fixes

- isEmpty and isNotEmpty rules adds error issue twice (d74b9af)

---

## v5.13.2 (2025-03-15)

### 🐛 Bug Fixes

- Fixed ignoring pipe validators if context.errors has items. (0b02ca1)

---

## v5.13.1 (2025-03-14)

### 🐛 Bug Fixes

- Fixed validation of Date, Buffer and ArrayBuffer objects of isEmpty and isNotEmpty rules (24992b8)

### 🧹 Chores

- Removed Node 16 tests (606e01a)

---

## v5.13.0 (2025-02-03)

### 🔧 Refactoring

- Updated dependencies (dca11c1)
- Changed error messages to "positive sentences" refactor: Optimized Context extending chore: Updated dependencies (3b746df)

### 🧹 Chores

- Updated github workflow (661738f)

### 💬 General Changes

- Added missing script (dd019d9)
- Fixed ts config (e3251ce)

---

## v5.12.0 (2024-11-04)

### 🔧 Refactoring

- Move from 'validator' library to "@browsery/validator" for ESM compatibility (5a0d1bd)

---

## v5.11.0 (2024-11-04)

### 💬 General Changes

- Updated dependencies (f348c6c)

---

## v5.10.0 (2024-09-14)

### 🧹 Chores

- Moved from circleci to github actions (179e630)

### 💬 General Changes

- Circular imports (f2a83b9)

---

## v5.9.0 (2024-08-20)

### 💬 General Changes

- Fixed compatibility for "Node16" and "NodeNext" moduleResolution options (9985ad6)

---

## v5.8.2 (2024-08-12)

### 💬 General Changes

- Applied publint to check package.json (cbb7553)

---

## v5.8.1 (2024-08-12)

### 💬 General Changes

- Applied publint to check package.json (cf051f4)

---

## v5.8.0 (2024-08-12)

### 💬 General Changes

- Rollback to ES2020 (bb198c6)

---

## v5.7.0 (2024-08-09)

### 💬 General Changes

- Made ready for Node16 moduleResolution (fc45964)

---

## v5.6.0 (2024-07-14)

### 💬 General Changes

- Added isNotNull and isNotNullish rules (19902a5)

---

## v5.5.0 (2024-07-14)

### 💬 General Changes

- Now pipe can return original input value when returnIndex = -1 (baf698c)
- Removed coercing of isNull and isNullish rules (4337d0a)
- Changed error message (3edf948)
- Moved eslint config to @panates/eslint-config Moved code formatting to prettier Improved error handling (c2f3e2d)

---

## v5.4.1 (2024-05-18)

### 💬 General Changes

- Exposed toBigint (50ad810)

---

## v5.4.0 (2024-05-18)

### 💬 General Changes

- Updated circleci config (101361c)
- Added returnIndex to pipe() (87458ad)

---

## v5.3.2 (2024-05-18)

### 💬 General Changes

- Fixed coveralls token (ede2734)
- Updated dependencies (9e618ab)

---

## v5.3.1 (2024-05-18)

### 💬 General Changes

- Fixed rule name (73d90d1)
- Reorganized many rules (e470fe7)
- Updated code documentation (81e7ccf)

---

## v5.3.0 (2024-05-06)

### 💬 General Changes

- Added validation generation option to enable coercing by default. Exposed toArray, toBoolean, toDate, toDateString, toInteger, toNumber,toString validators Changed rule error messages (5b012ee)

---

## v5.2.2 (2024-03-29)

### 💬 General Changes

- Updated dependencies (636ce75)
- Updated dependencies Updated typing (9d9af6f)

---

## v5.2.1 (2024-03-27)

### 💬 General Changes

- Updated dependencies (117bab5)

---

## v5.2.0 (2024-01-04)

### 💬 General Changes

- Now validator options persist in context (418901f)

---

## v5.1.0 (2023-12-23)

### 💬 General Changes

- Moved from "dayjs" to "date-fns" (fd240af)

---

## v5.0.1 (2023-12-23)

### 💬 General Changes

- Moved all validator factories into "factories" namespace, Exposed default created validators (2ac5abd)
- Added new rules (ddcab7c)

---

## v5.0.0 (2023-12-21)

### 💬 General Changes

- Moved all validator factories into "factories" namespace, Exposed default created validators (e93dddd)

---

## v4.3.2 (2023-12-08)

### 💬 General Changes

- Pass "_this" parameter to preValidation and postValidation methods (bdb6a97)
- Updated dependenices (a539d1b)

---

## v4.3.1 (2023-12-04)

### 💬 General Changes

- Made preValidation and postValidation static (71fa530)

---

## v4.3.0 (2023-12-02)

### 💬 General Changes

- Added [preValidation] and [postValidation] to isObject rule (2f8351d)
- Updated dependencies (4ff01f0)

---

## v4.2.5 (2023-11-27)

### 💬 General Changes

- Fixed isArray error location property. Updated dependencies (b42ca30)

---

## v4.2.4 (2023-11-20)

### 💬 General Changes

- Added json parsing feature to isObject validator (0cd128a)

---

## v4.2.3 (2023-11-20)

### 💬 General Changes

- Optimized error messages (21e29dc)

---

## v4.2.2 (2023-11-15)

### 💬 General Changes

- Changed "trim" option Fixed bugs (b5eff4f)

---

## v4.2.1 (2023-11-15)

### 💬 General Changes

- Fixed generating invalid date string (6407ac6)

---

## v4.2.0 (2023-11-15)

### 💬 General Changes

- Added test for "label" option (162f41a)
- Removed "format" option and added "precision" option to isDate validator Removed "format" option and added "precision" and "trim" options to isDateString validator (2e332a6)

---

## v4.1.0 (2023-10-31)

### 💬 General Changes

- Updated validation messages. Added isNullish validator (066fc4e)

---

## v4.0.1 (2023-10-24)

### 💬 General Changes

- Added "coerce" option to isNull and isUndefined rules (8c02040)

---

## v4.0.0 (2023-08-17)

### 💬 General Changes

- Initial release of v4.0.0-alpha.1 (499af8e)
- Implemented all initial validators and tests (0ff5c5c)
- Improved isDateString (59d0d14)
- Added isBigint validator (87ba007)
- Fixed isObject coerce issue (47c7d4e)
- Updated dayjs (e212dd2)
- Updated deps (d20588e)
- Better error handling (91dae2f)
- Updated dependencies (804e00c)
