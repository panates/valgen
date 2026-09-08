# Benchmarks

Generated 2026-09-08T13:37:09.169Z - Node v24.15.0.

| Name | Ops/sec | Mean time (µs) | Heap/op (KB) | RSS/op (KB) | Samples |
| :--- | ---: | ---: | ---: | ---: | ---: |
| allOf - 1 rule - valid (pass) | 26,957,932 (±1.47%) | 0.04 | 0.00 | 0.00 | 20,225,226 |
| allOf - 2 rules - valid (pass) | 20,497,966 (±1.23%) | 0.05 | 0.00 | 0.00 | 15,385,608 |
| allOf - 3 rules - valid (pass) | 16,905,514 (±1.00%) | 0.06 | 0.00 | 0.00 | 12,695,770 |
| allOf - 3 rules - invalid, fails 1st rule (throws) | 234,017 (±0.97%) | 4.27 | 0.05 | 0.00 | 176,494 |
| allOf - 3 rules - invalid, fails last rule (throws) | 255,546 (±1.60%) | 3.91 | 0.02 | 0.00 | 192,639 |
| allOf - 3 rules - invalid, fails last rule (.silent()) | 242,935 (±1.08%) | 4.12 | 0.03 | 0.00 | 183,074 |
| exists - key present with a value (pass) | 290,303 (±24.39%) | 3.45 | 2.03 | -0.03 | 219,137 |
| exists - key present but undefined (pass) | 242,177 (±44.96%) | 4.13 | 1.49 | 0.01 | 182,196 |
| exists - key missing entirely (throws) | 126,122 (±1.08%) | 7.93 | 3.53 | 0.01 | 95,048 |
| fixed - any input (always passes) | 29,844,045 (±0.85%) | 0.03 | 0.01 | 0.00 | 22,383,900 |
| getLength - string (pass) | 29,851,742 (±1.22%) | 0.03 | 0.00 | 0.00 | 22,432,740 |
| getLength - array (pass) | 23,086,892 (±14.40%) | 0.04 | 0.01 | 0.00 | 17,377,752 |
| getLength - Set (pass) | 23,614,749 (±4.33%) | 0.04 | 0.01 | 0.00 | 17,722,016 |
| getLength - unsupported type (throws) | 307,763 (±1.50%) | 3.25 | 0.40 | 0.00 | 232,180 |
| isAlpha - valid input (pass) | 15,580,024 (±0.99%) | 0.06 | 0.02 | 0.00 | 11,689,237 |
| isAlpha - invalid input (throws) | 316,810 (±0.68%) | 3.16 | 0.38 | 0.00 | 239,039 |
| isAlpha - invalid input (.silent()) | 297,214 (±0.94%) | 3.36 | 0.41 | 0.00 | 224,280 |
| isAlphanumeric - valid input (pass) | 15,752,933 (±0.79%) | 0.06 | 0.01 | 0.00 | 11,826,375 |
| isAlphanumeric - invalid input (throws) | 317,025 (±1.00%) | 3.15 | 0.39 | -0.18 | 239,258 |
| isAlphanumeric - invalid input (.silent()) | 297,499 (±0.46%) | 3.36 | 0.41 | -0.28 | 224,500 |
| isAny - any input (always passes) | 29,863,642 (±1.03%) | 0.03 | 0.01 | 0.00 | 22,435,250 |
| isArray(20 items) - all valid (pass) | 214,172 (±1.86%) | 4.67 | 2.18 | 0.00 | 162,110 |
| isArray(20 items) - one invalid item (throws) | 108,681 (±2.04%) | 9.20 | 3.98 | 0.00 | 81,982 |
| isArray(20 items) - one invalid item (.silent()) | 102,845 (±1.69%) | 9.72 | 4.01 | 0.00 | 77,418 |
| isAscii - valid input (pass) | 16,417,546 (±0.25%) | 0.06 | 0.00 | 0.00 | 12,327,255 |
| isAscii - invalid input (throws) | 303,379 (±4.35%) | 3.30 | 0.31 | 0.00 | 229,244 |
| isAscii - invalid input (.silent()) | 290,638 (±1.27%) | 3.44 | 0.37 | 0.00 | 219,023 |
| isBase64 - valid input (pass) | 8,106,614 (±0.68%) | 0.12 | 0.01 | 0.00 | 6,086,002 |
| isBase64 - invalid input (throws) | 308,221 (±1.65%) | 3.24 | 0.51 | 0.00 | 231,648 |
| isBase64 - invalid input (.silent()) | 292,669 (±0.24%) | 3.42 | 0.46 | -0.02 | 220,575 |
| isBigint - valid input (pass) | 28,599,169 (±1.99%) | 0.03 | 0.01 | 0.00 | 21,465,600 |
| isBigint - invalid input (throws) | 318,119 (±0.52%) | 3.14 | 0.42 | 0.00 | 240,345 |
| isBigint - invalid input (.silent()) | 294,185 (±0.83%) | 3.40 | 0.41 | 0.00 | 222,144 |
| isBoolean - valid input (pass) | 28,355,782 (±1.02%) | 0.04 | 0.01 | 0.00 | 21,284,365 |
| isBoolean - invalid input (throws) | 312,537 (±1.57%) | 3.20 | 0.40 | 0.00 | 235,873 |
| isBoolean - invalid input (.silent()) | 241,601 (±31.61%) | 4.14 | 0.33 | 0.00 | 182,364 |
| isBtcAddress - valid input (pass) | 7,886,494 (±2.57%) | 0.13 | 0.04 | 0.00 | 5,924,100 |
| isBtcAddress - invalid input (throws) | 314,151 (±0.88%) | 3.18 | 0.40 | 0.00 | 237,069 |
| isBtcAddress - invalid input (.silent()) | 281,896 (±1.31%) | 3.55 | 0.38 | 0.00 | 212,962 |
| isCreditCard - valid input (pass) | 3,165,399 (±0.45%) | 0.32 | 0.10 | 0.00 | 2,377,088 |
| isCreditCard - invalid input (throws) | 231,956 (±1.04%) | 4.31 | 0.25 | 0.00 | 175,100 |
| isCreditCard - invalid input (.silent()) | 220,065 (±0.94%) | 4.54 | 0.22 | 0.00 | 165,980 |
| isDate - valid input (pass) | 7,384,545 (±0.39%) | 0.14 | 0.04 | 0.00 | 5,545,761 |
| isDate - invalid input (throws) | 253,208 (±1.13%) | 3.95 | 0.19 | 0.00 | 190,888 |
| isDate - invalid input (.silent()) | 242,213 (±0.82%) | 4.13 | 0.20 | 0.00 | 183,040 |
| isDateString - valid input (pass) | 712,554 (±5.28%) | 1.40 | 0.19 | -0.10 | 535,998 |
| isDateString - invalid input (throws) | 214,103 (±1.31%) | 4.67 | 1.12 | 0.00 | 161,280 |
| isDateString - invalid input (.silent()) | 206,574 (±0.67%) | 4.84 | 1.10 | 0.00 | 155,914 |
| isDecimal - valid input (pass) | 2,728,671 (±3.08%) | 0.37 | 0.12 | 0.00 | 2,053,896 |
| isDecimal - invalid input (throws) | 228,210 (±1.11%) | 4.38 | 0.39 | 0.00 | 172,454 |
| isDecimal - invalid input (.silent()) | 218,640 (±0.98%) | 4.57 | 0.40 | 0.00 | 165,038 |
| isDefined - valid input (pass) | 28,661,187 (±2.93%) | 0.03 | 0.01 | 0.00 | 21,532,331 |
| isDefined - invalid input (throws) | 248,902 (±0.56%) | 4.02 | 0.25 | 0.00 | 187,616 |
| isDefined - invalid input (.silent()) | 227,941 (±2.02%) | 4.39 | 0.14 | 0.00 | 172,221 |
| isEAN - valid input (pass) | 4,710,947 (±1.00%) | 0.21 | 0.07 | 0.00 | 3,536,750 |
| isEAN - invalid input (throws) | 237,759 (±1.14%) | 4.21 | 0.44 | 0.00 | 179,580 |
| isEAN - invalid input (.silent()) | 223,544 (±1.15%) | 4.47 | 0.44 | 0.00 | 168,520 |
| isETHAddress - valid input (pass) | 8,230,517 (±1.10%) | 0.12 | 0.00 | 0.00 | 6,188,028 |
| isETHAddress - invalid input (throws) | 248,017 (±0.78%) | 4.03 | 1.56 | 0.00 | 187,050 |
| isETHAddress - invalid input (.silent()) | 226,849 (±1.72%) | 4.41 | 0.08 | 0.00 | 170,820 |
| isEmail - valid input (pass) | 531,814 (±0.81%) | 1.88 | 0.45 | 0.00 | 399,823 |
| isEmail - invalid input (throws) | 202,788 (±9.78%) | 4.93 | 2.24 | -0.01 | 152,801 |
| isEmail - invalid input (.silent()) | 103,089 (±57.40%) | 9.93 | 2.38 | -0.46 | 79,118 |
| isEmpty - valid input (pass) | 2,787,403 (±68.14%) | 0.40 | 0.20 | -0.66 | 2,298,384 |
| isEmpty - invalid input (throws) | 25,197 (±58.52%) | 38.98 | 1.57 | -0.34 | 20,176 |
| isEmpty - invalid input (.silent()) | 20,353 (±49.93%) | 49.88 | 1.69 | 1.56 | 16,107 |
| isEnum - valid input (pass) | 2,756,927 (±136.50%) | 0.40 | 0.09 | 0.00 | 2,132,628 |
| isEnum - invalid input (throws) | 36,201 (±46.14%) | 27.53 | 1.98 | -2.32 | 28,600 |
| isEnum - invalid input (.silent()) | 14,847 (±30.58%) | 69.55 | 2.11 | -0.99 | 13,015 |
| isEqual - valid input (pass) | 2,794,761 (±83.86%) | 0.36 | 0.00 | -0.04 | 2,144,645 |
| isEqual - invalid input (throws) | 16,163 (±45.30%) | 62.52 | 1.68 | 1.24 | 15,457 |
| isEqual - invalid input (.silent()) | 62,945 (±35.53%) | 15.89 | 1.70 | 0.02 | 47,520 |
| isFQDN - valid input (pass) | 2,137,576 (±14.95%) | 0.47 | 0.94 | 0.02 | 1,634,125 |
| isFQDN - invalid input (throws) | 113,526 (±14.33%) | 8.81 | 1.64 | -2.02 | 85,892 |
| isFQDN - invalid input (.silent()) | 87,179 (±34.88%) | 11.61 | 1.74 | 1.18 | 67,100 |
| isGt - number, valid input (pass) | 10,305,117 (±45.92%) | 0.10 | 0.00 | 0.00 | 7,766,640 |
| isGt - number, invalid input (throws) | 86,984 (±43.86%) | 11.50 | 1.64 | -0.08 | 65,520 |
| isGt - number, invalid input (.silent()) | 179,368 (±33.59%) | 5.59 | 0.15 | 0.00 | 135,604 |
| isGt - string, caseInsensitive - valid (pass) | 13,396,617 (±9.33%) | 0.07 | 0.01 | 0.00 | 10,066,436 |
| isGte - number, valid input (pass) | 27,061,471 (±1.40%) | 0.04 | 0.01 | 0.00 | 20,330,760 |
| isGte - number, invalid input (throws) | 239,422 (±1.24%) | 4.18 | 0.13 | 0.00 | 180,635 |
| isGte - number, invalid input (.silent()) | 229,443 (±1.15%) | 4.36 | 0.10 | 0.00 | 173,055 |
| isHash - valid input (pass) | 2,854,350 (±15.20%) | 0.35 | 0.05 | 0.00 | 2,154,693 |
| isHash - invalid input (throws) | 146,335 (±35.87%) | 6.84 | 0.21 | 0.00 | 110,442 |
| isHash - invalid input (.silent()) | 225,473 (±1.16%) | 4.44 | 0.23 | 0.00 | 170,245 |
| isHex - valid input (pass) | 15,125,301 (±0.72%) | 0.07 | 0.00 | 0.00 | 11,353,055 |
| isHex - invalid input (throws) | 253,154 (±0.52%) | 3.95 | 0.14 | 0.00 | 191,196 |
| isHex - invalid input (.silent()) | 230,884 (±2.90%) | 4.33 | 0.10 | 0.00 | 173,885 |
| isHexColor - valid input (pass) | 10,631,530 (±0.99%) | 0.09 | 0.01 | 0.00 | 7,985,208 |
| isHexColor - invalid input (throws) | 250,313 (±0.59%) | 3.99 | 0.18 | 0.00 | 189,125 |
| isHexColor - invalid input (.silent()) | 236,056 (±0.84%) | 4.24 | 0.15 | 0.00 | 178,080 |
| isIBAN - valid input (pass) | 1,487,583 (±0.22%) | 0.67 | 0.17 | 0.00 | 1,117,801 |
| isIBAN - invalid input (throws) | 216,607 (±0.45%) | 4.62 | 1.02 | 0.00 | 163,533 |
| isIBAN - invalid input (.silent()) | 200,935 (±1.67%) | 4.98 | 0.96 | 0.00 | 151,940 |
| isIP - valid input (pass) | 10,220,153 (±0.24%) | 0.10 | 0.03 | 0.00 | 7,680,768 |
| isIP - invalid input (throws) | 242,390 (±1.36%) | 4.13 | 0.23 | 0.00 | 182,520 |
| isIP - invalid input (.silent()) | 234,965 (±0.53%) | 4.26 | 0.21 | 0.00 | 177,552 |
| isIPRange - valid input (pass) | 3,611,590 (±1.30%) | 0.28 | 0.09 | 0.00 | 2,712,814 |
| isIPRange - invalid input (throws) | 248,136 (±1.82%) | 4.03 | 0.17 | 0.00 | 187,502 |
| isIPRange - invalid input (.silent()) | 231,857 (±1.73%) | 4.31 | 0.15 | 0.00 | 174,986 |
| isISSN - valid input (pass) | 4,892,549 (±1.19%) | 0.20 | 0.06 | 0.00 | 3,677,374 |
| isISSN - invalid input (throws) | 229,555 (±7.47%) | 4.36 | 0.22 | 0.00 | 173,754 |
| isISSN - invalid input (.silent()) | 224,091 (±1.06%) | 4.46 | 0.18 | 0.00 | 169,330 |
| isInstanceOf - valid input (pass) | 27,574,990 (±1.15%) | 0.04 | 0.01 | 0.00 | 20,707,875 |
| isInstanceOf - invalid input (throws) | 253,051 (±0.40%) | 3.95 | 0.27 | 0.00 | 190,933 |
| isInstanceOf - invalid input (.silent()) | 238,547 (±0.80%) | 4.19 | 0.22 | 0.00 | 180,110 |
| isInteger - valid input (pass) | 25,196,535 (±0.45%) | 0.04 | 0.00 | 0.00 | 18,925,308 |
| isInteger - invalid input (throws) | 256,618 (±1.04%) | 3.90 | 0.15 | 0.00 | 193,648 |
| isInteger - invalid input (.silent()) | 239,092 (±0.86%) | 4.18 | 0.10 | 0.00 | 179,949 |
| isJWT - valid input (pass) | 3,123,078 (±0.46%) | 0.32 | 0.10 | 0.00 | 2,348,495 |
| isJWT - invalid input (throws) | 251,212 (±2.81%) | 3.98 | 0.09 | 0.00 | 189,772 |
| isJWT - invalid input (.silent()) | 235,923 (±2.02%) | 4.24 | 0.13 | 0.00 | 177,506 |
| isLowercase - valid input (pass) | 20,251,471 (±0.45%) | 0.05 | 0.02 | 0.00 | 15,207,309 |
| isLowercase - invalid input (throws) | 254,037 (±0.72%) | 3.94 | 0.12 | 0.00 | 191,394 |
| isLowercase - invalid input (.silent()) | 241,474 (±1.24%) | 4.14 | 0.15 | 0.00 | 182,280 |
| isLt - number, valid input (pass) | 28,783,949 (±0.64%) | 0.03 | 0.01 | 0.00 | 21,618,971 |
| isLt - number, invalid input (throws) | 256,075 (±0.64%) | 3.91 | 0.18 | -0.01 | 193,140 |
| isLt - number, invalid input (.silent()) | 236,050 (±0.58%) | 4.24 | 0.15 | 0.00 | 177,704 |
| isLte - number, valid input (pass) | 28,820,358 (±0.45%) | 0.03 | 0.00 | 0.00 | 21,644,700 |
| isLte - number, invalid input (throws) | 255,000 (±1.85%) | 3.92 | 0.19 | 0.00 | 192,672 |
| isLte - number, invalid input (.silent()) | 243,999 (±0.54%) | 4.10 | 0.16 | 0.00 | 184,274 |
| isMACAddress - valid input (pass) | 10,176,116 (±0.50%) | 0.10 | 0.03 | 0.00 | 7,641,858 |
| isMACAddress - invalid input (throws) | 247,540 (±0.79%) | 4.04 | 0.18 | 0.00 | 186,507 |
| isMACAddress - invalid input (.silent()) | 234,198 (±0.57%) | 4.27 | 0.17 | 0.00 | 176,814 |
| isMobilePhone - valid input (pass) | 444,857 (±1.02%) | 2.25 | 0.24 | 0.00 | 334,640 |
| isMobilePhone - invalid input (throws) | 99,459 (±4.82%) | 10.05 | 1.60 | -0.01 | 74,880 |
| isMobilePhone - invalid input (.silent()) | 98,968 (±0.98%) | 10.10 | 1.71 | 0.00 | 74,727 |
| isNotEmpty - valid input (pass) | 28,054,477 (±1.44%) | 0.04 | 0.01 | 0.00 | 21,049,972 |
| isNotEmpty - invalid input (throws) | 250,072 (±2.49%) | 4.00 | 0.14 | 0.00 | 188,649 |
| isNotEmpty - invalid input (.silent()) | 226,410 (±1.94%) | 4.42 | 0.14 | 0.00 | 170,742 |
| isNotEqual - valid input (pass) | 29,093,393 (±0.76%) | 0.03 | 0.01 | 0.00 | 21,847,056 |
| isNotEqual - invalid input (throws) | 258,053 (±0.65%) | 3.88 | 0.20 | 0.00 | 194,880 |
| isNotEqual - invalid input (.silent()) | 243,188 (±0.33%) | 4.11 | 0.18 | 0.00 | 183,600 |
| isNotNull - valid input (pass) | 24,177,636 (±22.42%) | 0.04 | 0.01 | 0.00 | 18,972,000 |
| isNotNull - invalid input (throws) | 231,378 (±0.77%) | 4.32 | 0.48 | 0.00 | 174,624 |
| isNotNull - invalid input (.silent()) | 228,589 (±1.03%) | 4.37 | 0.49 | 0.00 | 172,334 |
| isNotNullish - valid input (pass) | 28,583,914 (±1.82%) | 0.03 | 0.00 | 0.00 | 21,462,464 |
| isNotNullish - invalid input (throws) | 239,794 (±0.54%) | 4.17 | 0.51 | 0.00 | 180,677 |
| isNotNullish - invalid input (.silent()) | 230,162 (±0.61%) | 4.34 | 0.49 | 0.00 | 173,664 |
| isNull - valid input (pass) | 29,035,090 (±1.33%) | 0.03 | 0.01 | 0.00 | 21,808,640 |
| isNull - invalid input (throws) | 246,832 (±1.85%) | 4.05 | 0.09 | 0.00 | 186,224 |
| isNull - invalid input (.silent()) | 229,983 (±4.57%) | 4.35 | 0.16 | 0.00 | 173,316 |
| isNullish - valid input (pass) | 29,001,949 (±1.07%) | 0.03 | 0.00 | 0.00 | 21,774,560 |
| isNullish - invalid input (throws) | 239,023 (±2.64%) | 4.18 | 0.49 | 0.00 | 179,695 |
| isNullish - invalid input (.silent()) | 219,710 (±1.94%) | 4.55 | 0.34 | -0.01 | 165,505 |
| isNumber - valid input (pass) | 26,913,647 (±1.01%) | 0.04 | 0.01 | 0.00 | 20,209,824 |
| isNumber - invalid input (throws) | 246,641 (±2.07%) | 4.05 | 0.14 | 0.00 | 186,030 |
| isNumber - invalid input (.silent()) | 241,830 (±0.43%) | 4.14 | 0.15 | 0.00 | 182,313 |
| isObject - flat schema (2 fields) - valid (pass) | 251,449 (±8.82%) | 3.98 | 1.84 | 0.00 | 189,318 |
| isObject - flat schema (2 fields) - invalid (throws) | 97,578 (±14.64%) | 10.25 | 2.87 | 0.03 | 73,644 |
| isObject - flat schema (2 fields) - invalid (.silent()) | 102,784 (±3.88%) | 9.73 | 2.87 | 0.00 | 78,016 |
| isObject - wide schema (50 fields) - valid (pass) | 72,901 (±0.12%) | 13.72 | 3.99 | 0.00 | 54,990 |
| isObject - detectCircular:true, non-circular - valid (pass) | 262,456 (±0.65%) | 3.81 | 2.26 | 0.00 | 197,625 |
| isObject - additionalFields:"error", extra field present (throws) | 104,788 (±4.36%) | 9.54 | 2.92 | 0.03 | 78,806 |
| isObject - caseInSensitive:true - valid (pass) | 264,232 (±4.27%) | 3.78 | 1.89 | 0.00 | 199,448 |
| isObject - nested isObject (1 level) - valid (pass) | 142,816 (±1.24%) | 7.00 | 3.19 | 0.00 | 107,823 |
| isObjectId - valid input (pass) | 11,433,034 (±1.84%) | 0.09 | 0.00 | 0.00 | 8,586,250 |
| isObjectId - invalid input (throws) | 254,560 (±0.35%) | 3.93 | 0.09 | 0.00 | 192,126 |
| isObjectId - invalid input (.silent()) | 209,022 (±10.58%) | 4.78 | 1.64 | -0.14 | 158,296 |
| isPassportNumber - valid input (pass) | 7,424,734 (±5.73%) | 0.13 | 0.01 | 0.00 | 5,578,812 |
| isPassportNumber - invalid input (throws) | 227,883 (±6.51%) | 4.39 | 0.16 | -0.33 | 171,912 |
| isPassportNumber - invalid input (.silent()) | 225,699 (±0.52%) | 4.43 | 0.15 | 0.00 | 170,169 |
| isPort - valid input (pass) | 9,506,489 (±0.68%) | 0.11 | 0.00 | 0.00 | 7,135,704 |
| isPort - invalid input (throws) | 244,843 (±0.52%) | 4.08 | 0.16 | 0.00 | 184,910 |
| isPort - invalid input (.silent()) | 229,025 (±1.22%) | 4.37 | 1.69 | -0.04 | 173,340 |
| isRecord - valid input (pass) | 229,433 (±11.58%) | 4.36 | 1.42 | 0.01 | 172,956 |
| isRecord - invalid input (throws) | 101,663 (±4.83%) | 9.84 | 2.41 | 0.00 | 77,625 |
| isRecord - invalid input (.silent()) | 103,940 (±1.84%) | 9.62 | 2.38 | 0.00 | 78,386 |
| isSWIFT - valid input (pass) | 7,970,895 (±2.45%) | 0.13 | 0.03 | 0.00 | 5,993,472 |
| isSWIFT - invalid input (throws) | 240,055 (±0.44%) | 4.17 | 0.08 | 0.01 | 180,054 |
| isSWIFT - invalid input (.silent()) | 207,814 (±21.91%) | 4.83 | 1.71 | -1.77 | 157,700 |
| isString - valid input (pass) | 20,132,722 (±25.85%) | 0.05 | 0.01 | 0.00 | 15,117,069 |
| isString - invalid input (throws) | 243,070 (±0.63%) | 4.11 | 0.10 | 0.00 | 183,820 |
| isString - invalid input (.silent()) | 229,326 (±2.00%) | 4.36 | 0.07 | 0.00 | 173,052 |
| isTime - valid input (pass) | 5,797,171 (±0.87%) | 0.17 | 0.03 | 0.00 | 4,356,828 |
| isTime - invalid input (throws) | 177,206 (±34.85%) | 5.65 | 0.05 | 0.00 | 134,232 |
| isTime - invalid input (.silent()) | 216,693 (±3.61%) | 4.61 | 0.24 | 0.00 | 162,552 |
| isTuple - valid input (pass) | 193,170 (±39.29%) | 5.18 | 1.33 | 0.02 | 146,831 |
| isTuple - invalid input (throws) | 104,282 (±2.07%) | 9.59 | 2.67 | 0.00 | 78,606 |
| isTuple - invalid input (.silent()) | 102,014 (±2.81%) | 9.80 | 2.71 | 0.00 | 77,112 |
| isURL - valid input (pass) | 800,351 (±0.52%) | 1.25 | 0.11 | 0.00 | 603,053 |
| isURL - invalid input (throws) | 233,865 (±3.47%) | 4.28 | 0.12 | 0.00 | 176,748 |
| isURL - invalid input (.silent()) | 231,023 (±0.72%) | 4.33 | 0.19 | 0.00 | 174,660 |
| isUUID - valid input (pass) | 8,118,872 (±10.24%) | 0.12 | 0.02 | -0.03 | 6,097,352 |
| isUUID - invalid input (throws) | 237,950 (±4.17%) | 4.20 | 1.56 | -0.28 | 179,450 |
| isUUID - invalid input (.silent()) | 199,489 (±25.35%) | 5.03 | 0.06 | -0.04 | 150,768 |
| isUndefined - valid input (pass) | 25,460,535 (±2.14%) | 0.04 | 0.01 | 0.00 | 19,108,148 |
| isUndefined - invalid input (throws) | 235,107 (±6.70%) | 4.25 | 1.56 | 0.00 | 177,632 |
| isUndefined - invalid input (.silent()) | 168,230 (±21.40%) | 5.95 | 1.66 | 0.00 | 127,424 |
| isUppercase - valid input (pass) | 14,669,415 (±11.20%) | 0.07 | 0.00 | 0.00 | 11,011,440 |
| isUppercase - invalid input (throws) | 230,026 (±5.48%) | 4.35 | 1.59 | 0.00 | 173,536 |
| isUppercase - invalid input (.silent()) | 228,393 (±3.90%) | 4.38 | 0.02 | 0.00 | 172,032 |
| isVATNumber - valid input (pass) | 10,689,223 (±3.49%) | 0.09 | 0.02 | 0.00 | 8,026,920 |
| isVATNumber - invalid input (throws) | 230,952 (±14.05%) | 4.34 | 1.62 | 0.00 | 175,824 |
| isVATNumber - invalid input (.silent()) | 231,637 (±2.84%) | 4.32 | 0.16 | 0.00 | 174,675 |
| lengthMax - valid input (pass) | 513,124 (±5.74%) | 1.95 | 1.12 | 0.00 | 386,650 |
| lengthMax - invalid input (throws) | 102,177 (±5.52%) | 9.79 | 2.40 | 0.00 | 77,330 |
| lengthMax - invalid input (.silent()) | 102,383 (±8.28%) | 9.79 | 4.51 | 0.01 | 78,324 |
| lengthMin - valid input (pass) | 490,616 (±19.31%) | 2.04 | 1.18 | 0.00 | 372,178 |
| lengthMin - invalid input (throws) | 111,583 (±1.74%) | 8.96 | 2.11 | 0.00 | 84,210 |
| lengthMin - invalid input (.silent()) | 111,765 (±6.20%) | 8.95 | 1.97 | 0.00 | 84,444 |
| matches - valid input (pass) | 19,055,778 (±2.08%) | 0.05 | 0.01 | 0.00 | 14,303,742 |
| matches - invalid input (throws) | 235,151 (±3.23%) | 4.25 | 0.66 | 0.00 | 177,355 |
| matches - invalid input (.silent()) | 229,879 (±1.58%) | 4.35 | 0.69 | 0.00 | 173,460 |
| nullable - null input (pass, short-circuits before nested rule) | 28,461,268 (±0.20%) | 0.04 | 0.01 | 0.00 | 21,372,516 |
| nullable - defined valid input (pass, delegates to nested rule) | 18,614,304 (±1.01%) | 0.05 | 0.00 | 0.00 | 13,993,902 |
| nullable - defined invalid input (throws from nested rule) | 192,421 (±2.61%) | 5.20 | 1.69 | 0.00 | 145,089 |
| oneOf - simple union, matches 1st rule (pass) | 3,271,955 (±0.57%) | 0.31 | 0.01 | 0.00 | 2,463,945 |
| oneOf - simple union, matches 2nd (last) rule (pass) | 2,956,186 (±0.70%) | 0.34 | 0.04 | 0.00 | 2,219,295 |
| oneOf - simple union, no rule matches (throws) | 232,727 (±0.32%) | 4.30 | 0.99 | 0.00 | 175,600 |
| oneOf - simple union, no rule matches (.silent()) | 218,917 (±0.56%) | 4.57 | 0.99 | 0.00 | 165,549 |
| oneOf - discriminated, matches 1st branch (pass) | 204,777 (±1.31%) | 4.88 | 1.82 | 0.00 | 154,570 |
| oneOf - discriminated, matches 2nd (last) branch (pass) | 203,322 (±1.01%) | 4.92 | 1.87 | 0.05 | 153,230 |
| oneOf - discriminated, no branch matches (throws) | 226,360 (±1.86%) | 4.42 | 1.20 | 0.00 | 170,850 |
| optional - undefined input (pass, short-circuits before nested rule) | 28,432,518 (±2.61%) | 0.04 | 0.01 | 0.00 | 21,344,510 |
| optional - defined valid input (pass, delegates to nested rule) | 18,368,244 (±1.04%) | 0.05 | 0.01 | 0.00 | 13,793,780 |
| optional - defined invalid input (throws from nested rule) | 194,935 (±1.26%) | 5.13 | 1.69 | 0.00 | 146,804 |
| pipe - 1 step - valid (pass) | 16,594,822 (±0.60%) | 0.06 | 0.00 | 0.00 | 12,466,600 |
| pipe - 2 steps - valid (pass) | 12,617,600 (±1.08%) | 0.08 | 0.02 | 0.00 | 9,489,256 |
| pipe - 3 steps - valid (pass) | 10,025,604 (±0.20%) | 0.10 | 0.00 | 0.00 | 7,529,850 |
| pipe - 2 steps - invalid, fails on step 2 (throws) | 207,003 (±0.27%) | 4.83 | 1.77 | 0.00 | 156,003 |
| pipe - 2 steps - invalid, fails on step 2 (.silent()) | 194,971 (±0.56%) | 5.13 | 1.85 | 0.00 | 147,334 |
| pipe - returnIndex option - valid (pass) | 9,178,144 (±0.77%) | 0.11 | 0.00 | 0.00 | 6,902,280 |
| range - number, valid input (pass) | 27,675,571 (±2.49%) | 0.04 | 0.01 | 0.00 | 20,778,905 |
| range - number, invalid input (throws) | 257,139 (±0.83%) | 3.89 | 0.21 | 0.00 | 193,914 |
| range - number, invalid input (.silent()) | 242,794 (±0.41%) | 4.12 | 0.20 | 0.00 | 183,480 |
| required - defined valid input (pass, delegates to nested rule) | 18,420,480 (±1.51%) | 0.05 | 0.01 | 0.00 | 13,842,060 |
| required - undefined input (throws immediately) | 254,342 (±0.38%) | 3.93 | 0.30 | 0.00 | 191,394 |
| required - undefined input with a default (pass) | 12,642,384 (±1.18%) | 0.08 | 0.01 | 0.00 | 9,485,655 |
| stringReplace - string input (pass) | 9,933,025 (±0.77%) | 0.10 | 0.03 | 0.00 | 7,464,155 |
| stringReplace - null input (pass through unchanged) | 26,859,568 (±3.07%) | 0.04 | 0.01 | 0.00 | 20,181,465 |
| stringSplit - string input (pass) | 15,230,611 (±2.86%) | 0.07 | 0.00 | 0.00 | 11,439,760 |
| stringSplit - null input (pass through unchanged) | 27,373,245 (±5.67%) | 0.04 | 0.00 | 0.00 | 20,561,044 |
| trim - string input (pass) | 20,447,057 (±1.35%) | 0.05 | 0.01 | 0.00 | 15,378,477 |
| trim - null input (pass through unchanged) | 27,263,555 (±3.43%) | 0.04 | 0.00 | 0.00 | 20,477,791 |
| trimEnd - string input (pass) | 21,152,397 (±0.52%) | 0.05 | 0.01 | 0.00 | 15,895,480 |
| trimStart - string input (pass) | 20,866,072 (±1.00%) | 0.05 | 0.01 | 0.00 | 15,680,756 |
