# Benchmarks

Generated 2026-09-08T15:06:48.512Z - Node v24.15.0.

| Name | Ops/sec | Mean time (µs) | Heap/op (KB) | RSS/op (KB) | Samples |
| :--- | ---: | ---: | ---: | ---: | ---: |
| allOf - 1 rule - valid (pass) | 26,584,121 (±0.80%) | 0.04 | 0.00 | 0.00 | 19,949,616 |
| allOf - 2 rules - valid (pass) | 20,579,454 (±0.91%) | 0.05 | 0.00 | 0.00 | 15,446,202 |
| allOf - 3 rules - valid (pass) | 17,440,701 (±0.64%) | 0.06 | 0.00 | 0.00 | 13,089,114 |
| allOf - 3 rules - invalid, fails 1st rule (throws) | 228,153 (±0.62%) | 4.38 | 0.07 | 0.00 | 171,666 |
| allOf - 3 rules - invalid, fails last rule (throws) | 242,494 (±2.85%) | 4.12 | 0.06 | 0.00 | 182,770 |
| allOf - 3 rules - invalid, fails last rule (.silent()) | 225,892 (±1.24%) | 4.43 | 0.01 | 0.00 | 170,612 |
| exists - key present with a value (pass) | 338,291 (±7.37%) | 2.96 | 1.58 | 0.00 | 254,919 |
| exists - key present but undefined (pass) | 341,886 (±1.26%) | 2.92 | 1.51 | 0.00 | 258,264 |
| exists - key missing entirely (throws) | 122,868 (±0.77%) | 8.14 | 3.51 | -0.01 | 92,880 |
| fixed - any input (always passes) | 30,908,663 (±0.96%) | 0.03 | 0.00 | -0.01 | 23,219,847 |
| getLength - string (pass) | 29,464,918 (±0.40%) | 0.03 | 0.00 | 0.00 | 22,122,716 |
| getLength - array (pass) | 29,735,378 (±0.32%) | 0.03 | 0.00 | 0.00 | 22,338,033 |
| getLength - Set (pass) | 25,782,481 (±1.12%) | 0.04 | 0.00 | 0.00 | 19,352,256 |
| getLength - unsupported type (throws) | 298,532 (±1.76%) | 3.35 | 0.38 | 0.00 | 225,597 |
| isAlpha - valid input (pass) | 15,488,782 (±0.93%) | 0.06 | 0.01 | 0.00 | 11,627,772 |
| isAlpha - invalid input (throws) | 299,099 (±2.20%) | 3.34 | 0.31 | -0.04 | 226,200 |
| isAlpha - invalid input (.silent()) | 278,790 (±1.32%) | 3.59 | 0.34 | 0.00 | 210,930 |
| isAlphanumeric - valid input (pass) | 15,962,499 (±0.62%) | 0.06 | 0.01 | 0.00 | 11,978,109 |
| isAlphanumeric - invalid input (throws) | 302,471 (±1.23%) | 3.31 | 0.38 | 0.00 | 228,099 |
| isAlphanumeric - invalid input (.silent()) | 283,796 (±0.57%) | 3.52 | 0.37 | 0.00 | 214,347 |
| isAny - any input (always passes) | 29,592,185 (±1.38%) | 0.03 | 0.00 | 0.00 | 22,224,210 |
| isArray(20 items) - all valid (pass) | 213,445 (±1.59%) | 4.69 | 2.31 | 0.00 | 160,650 |
| isArray(20 items) - one invalid item (throws) | 107,317 (±1.79%) | 9.32 | 2.25 | 0.00 | 80,826 |
| isArray(20 items) - one invalid item (.silent()) | 98,731 (±1.53%) | 10.13 | 3.94 | -0.82 | 74,694 |
| isAscii - valid input (pass) | 15,982,745 (±0.38%) | 0.06 | 0.00 | 0.00 | 12,007,800 |
| isAscii - invalid input (throws) | 307,857 (±0.20%) | 3.25 | 0.38 | 0.00 | 231,770 |
| isAscii - invalid input (.silent()) | 279,872 (±1.39%) | 3.57 | 0.32 | -0.12 | 210,635 |
| isBase64 - valid input (pass) | 8,230,873 (±0.54%) | 0.12 | 0.01 | 0.00 | 6,181,104 |
| isBase64 - invalid input (throws) | 294,737 (±1.53%) | 3.39 | 0.45 | 0.00 | 222,394 |
| isBase64 - invalid input (.silent()) | 273,390 (±1.72%) | 3.66 | 0.42 | 0.00 | 206,290 |
| isBigint - valid input (pass) | 29,081,172 (±0.59%) | 0.03 | 0.01 | 0.00 | 21,829,064 |
| isBigint - invalid input (throws) | 293,004 (±2.24%) | 3.41 | 0.37 | 0.00 | 220,704 |
| isBigint - invalid input (.silent()) | 281,834 (±1.10%) | 3.55 | 0.35 | -0.05 | 212,784 |
| isBoolean - valid input (pass) | 29,074,488 (±0.39%) | 0.03 | 0.01 | 0.00 | 21,818,703 |
| isBoolean - invalid input (throws) | 298,855 (±1.04%) | 3.35 | 0.39 | 0.00 | 225,639 |
| isBoolean - invalid input (.silent()) | 283,521 (±1.25%) | 3.53 | 0.36 | 0.00 | 214,316 |
| isBtcAddress - valid input (pass) | 8,170,505 (±1.86%) | 0.12 | 0.00 | 0.00 | 6,141,358 |
| isBtcAddress - invalid input (throws) | 303,738 (±0.56%) | 3.29 | 0.37 | 0.00 | 229,146 |
| isBtcAddress - invalid input (.silent()) | 284,685 (±0.43%) | 3.51 | 0.36 | 0.00 | 214,671 |
| isCreditCard - valid input (pass) | 3,222,276 (±0.19%) | 0.31 | 0.00 | 0.00 | 2,419,612 |
| isCreditCard - invalid input (throws) | 230,298 (±1.26%) | 4.34 | 0.21 | 0.00 | 174,124 |
| isCreditCard - invalid input (.silent()) | 208,217 (±1.15%) | 4.80 | 0.15 | 0.00 | 156,735 |
| isDate - valid input (pass) | 7,119,106 (±2.78%) | 0.14 | 0.02 | 0.00 | 5,348,942 |
| isDate - invalid input (throws) | 228,324 (±5.34%) | 4.38 | 0.04 | 0.00 | 172,638 |
| isDate - invalid input (.silent()) | 226,388 (±1.72%) | 4.42 | 0.17 | 0.00 | 170,560 |
| isDateString - valid input (pass) | 735,202 (±1.56%) | 1.36 | 0.23 | 0.00 | 552,083 |
| isDateString - invalid input (throws) | 205,167 (±1.24%) | 4.87 | 1.05 | 0.00 | 154,935 |
| isDateString - invalid input (.silent()) | 195,174 (±2.27%) | 5.12 | 1.02 | 0.00 | 147,136 |
| isDecimal - valid input (pass) | 2,898,093 (±0.39%) | 0.35 | 0.02 | 0.00 | 2,178,924 |
| isDecimal - invalid input (throws) | 224,364 (±0.63%) | 4.46 | 0.02 | 0.00 | 169,383 |
| isDecimal - invalid input (.silent()) | 210,062 (±2.45%) | 4.76 | 0.39 | 0.00 | 158,004 |
| isDefined - valid input (pass) | 29,956,971 (±0.80%) | 0.03 | 0.00 | 0.00 | 22,502,137 |
| isDefined - invalid input (throws) | 242,204 (±2.17%) | 4.13 | 0.28 | 0.00 | 183,148 |
| isDefined - invalid input (.silent()) | 234,967 (±0.39%) | 4.26 | 0.26 | 0.00 | 176,688 |
| isEAN - valid input (pass) | 4,815,643 (±1.20%) | 0.21 | 0.01 | 0.00 | 3,612,771 |
| isEAN - invalid input (throws) | 237,202 (±0.92%) | 4.22 | 0.43 | 0.00 | 178,893 |
| isEAN - invalid input (.silent()) | 223,896 (±0.54%) | 4.47 | 0.45 | 0.00 | 168,912 |
| isETHAddress - valid input (pass) | 8,325,572 (±2.10%) | 0.12 | 0.01 | 0.00 | 6,250,077 |
| isETHAddress - invalid input (throws) | 249,931 (±0.29%) | 4.00 | 0.14 | 0.00 | 189,000 |
| isETHAddress - invalid input (.silent()) | 234,651 (±0.38%) | 4.26 | 0.12 | 0.00 | 177,045 |
| isEmail - valid input (pass) | 543,652 (±1.19%) | 1.84 | 0.56 | 0.00 | 408,811 |
| isEmail - invalid input (throws) | 217,705 (±0.12%) | 4.59 | 0.60 | 0.00 | 164,353 |
| isEmail - invalid input (.silent()) | 200,447 (±1.47%) | 4.99 | 0.54 | 0.00 | 151,668 |
| isEmpty - valid input (pass) | 30,012,984 (±0.34%) | 0.03 | 0.00 | 0.00 | 22,528,827 |
| isEmpty - invalid input (throws) | 243,998 (±1.16%) | 4.10 | 0.14 | 0.00 | 184,398 |
| isEmpty - invalid input (.silent()) | 234,299 (±1.07%) | 4.27 | 0.12 | 0.00 | 177,232 |
| isEnum - valid input (pass) | 30,540,840 (±0.35%) | 0.03 | 0.01 | 0.00 | 22,929,522 |
| isEnum - invalid input (throws) | 241,138 (±2.10%) | 4.15 | 0.40 | -0.01 | 182,073 |
| isEnum - invalid input (.silent()) | 231,596 (±0.68%) | 4.32 | 0.49 | 0.00 | 174,720 |
| isEqual - valid input (pass) | 30,133,796 (±0.97%) | 0.03 | 0.01 | 0.00 | 22,615,974 |
| isEqual - invalid input (throws) | 248,505 (±1.31%) | 4.02 | 0.14 | 0.00 | 187,322 |
| isEqual - invalid input (.silent()) | 235,367 (±0.16%) | 4.25 | 0.15 | 0.00 | 178,035 |
| isFQDN - valid input (pass) | 3,414,110 (±1.66%) | 0.29 | 0.06 | 0.00 | 2,566,600 |
| isFQDN - invalid input (throws) | 244,012 (±0.65%) | 4.10 | 0.18 | 0.00 | 184,380 |
| isFQDN - invalid input (.silent()) | 223,148 (±1.50%) | 4.48 | 0.15 | 0.00 | 168,468 |
| isGt - number, valid input (pass) | 30,161,949 (±0.81%) | 0.03 | 0.01 | 0.00 | 22,650,390 |
| isGt - number, invalid input (throws) | 247,277 (±0.67%) | 4.04 | 0.23 | 0.00 | 186,714 |
| isGt - number, invalid input (.silent()) | 233,498 (±0.46%) | 4.28 | 0.12 | 0.00 | 176,256 |
| isGt - string, caseInsensitive - valid (pass) | 14,704,526 (±0.98%) | 0.07 | 0.02 | 0.00 | 11,045,952 |
| isGte - number, valid input (pass) | 29,269,455 (±0.34%) | 0.03 | 0.00 | 0.00 | 21,967,175 |
| isGte - number, invalid input (throws) | 245,590 (±1.39%) | 4.07 | 0.17 | 0.00 | 185,536 |
| isGte - number, invalid input (.silent()) | 236,197 (±0.81%) | 4.23 | 0.13 | 0.00 | 178,296 |
| isHash - valid input (pass) | 4,548,224 (±0.69%) | 0.22 | 0.06 | 0.00 | 3,426,172 |
| isHash - invalid input (throws) | 234,801 (±1.82%) | 4.26 | 0.20 | 0.00 | 177,200 |
| isHash - invalid input (.silent()) | 216,565 (±1.78%) | 4.62 | 0.24 | 0.00 | 163,072 |
| isHex - valid input (pass) | 15,534,772 (±0.50%) | 0.06 | 0.01 | 0.00 | 11,667,084 |
| isHex - invalid input (throws) | 247,117 (±1.18%) | 4.05 | 0.12 | 0.00 | 186,036 |
| isHex - invalid input (.silent()) | 235,028 (±0.47%) | 4.25 | 0.08 | 0.00 | 178,020 |
| isHexColor - valid input (pass) | 11,173,587 (±1.54%) | 0.09 | 0.02 | 0.00 | 8,389,165 |
| isHexColor - invalid input (throws) | 243,730 (±1.59%) | 4.10 | 0.15 | 0.00 | 183,977 |
| isHexColor - invalid input (.silent()) | 227,749 (±0.27%) | 4.39 | 0.13 | 0.00 | 172,056 |
| isIBAN - valid input (pass) | 1,491,439 (±1.15%) | 0.67 | 0.18 | 0.00 | 1,121,580 |
| isIBAN - invalid input (throws) | 210,547 (±0.19%) | 4.75 | 1.00 | 0.00 | 158,994 |
| isIBAN - invalid input (.silent()) | 192,602 (±1.90%) | 5.19 | 0.93 | 0.00 | 145,436 |
| isIP - valid input (pass) | 9,923,176 (±2.44%) | 0.10 | 0.03 | 0.00 | 7,453,769 |
| isIP - invalid input (throws) | 222,990 (±5.27%) | 4.49 | 0.17 | 0.00 | 168,618 |
| isIP - invalid input (.silent()) | 219,508 (±5.30%) | 4.56 | 0.15 | 0.00 | 165,600 |
| isIPRange - valid input (pass) | 3,699,944 (±0.82%) | 0.27 | 0.08 | 0.00 | 2,779,224 |
| isIPRange - invalid input (throws) | 231,979 (±2.16%) | 4.31 | 0.08 | 0.00 | 175,142 |
| isIPRange - invalid input (.silent()) | 232,203 (±0.62%) | 4.31 | 0.15 | 0.00 | 175,086 |
| isISSN - valid input (pass) | 5,124,833 (±0.38%) | 0.20 | 0.01 | 0.00 | 3,850,821 |
| isISSN - invalid input (throws) | 236,303 (±0.41%) | 4.23 | 0.21 | 0.00 | 178,075 |
| isISSN - invalid input (.silent()) | 221,824 (±0.94%) | 4.51 | 0.18 | 0.00 | 167,670 |
| isInstanceOf - valid input (pass) | 27,891,248 (±1.76%) | 0.04 | 0.01 | 0.00 | 20,961,408 |
| isInstanceOf - invalid input (throws) | 239,358 (±1.88%) | 4.18 | 0.23 | 0.00 | 180,621 |
| isInstanceOf - invalid input (.silent()) | 232,000 (±1.08%) | 4.31 | 0.20 | 0.00 | 175,136 |
| isInteger - valid input (pass) | 25,335,378 (±1.56%) | 0.04 | 0.01 | 0.00 | 19,039,520 |
| isInteger - invalid input (throws) | 243,075 (±1.81%) | 4.11 | 0.13 | 0.00 | 182,962 |
| isInteger - invalid input (.silent()) | 226,476 (±3.67%) | 4.42 | 1.64 | -0.01 | 170,996 |
| isJWT - valid input (pass) | 3,073,704 (±1.15%) | 0.33 | 0.06 | 0.00 | 2,307,747 |
| isJWT - invalid input (throws) | 233,563 (±3.53%) | 4.28 | 0.12 | 0.00 | 175,848 |
| isJWT - invalid input (.silent()) | 226,231 (±1.39%) | 4.42 | 1.67 | 0.00 | 170,568 |
| isLowercase - valid input (pass) | 19,734,087 (±0.67%) | 0.05 | 0.01 | 0.00 | 14,811,225 |
| isLowercase - invalid input (throws) | 239,581 (±3.17%) | 4.17 | 0.13 | 0.00 | 180,561 |
| isLowercase - invalid input (.silent()) | 219,061 (±2.89%) | 4.56 | 0.11 | 0.00 | 165,426 |
| isLt - number, valid input (pass) | 26,997,170 (±6.98%) | 0.04 | 0.01 | 0.00 | 20,289,330 |
| isLt - number, invalid input (throws) | 243,298 (±1.34%) | 4.11 | 0.17 | 0.00 | 183,610 |
| isLt - number, invalid input (.silent()) | 217,931 (±5.40%) | 4.59 | 0.15 | 0.00 | 164,395 |
| isLte - number, valid input (pass) | 27,864,175 (±8.42%) | 0.04 | 0.01 | 0.00 | 20,947,740 |
| isLte - number, invalid input (throws) | 239,160 (±2.01%) | 4.18 | 0.14 | 0.00 | 180,264 |
| isLte - number, invalid input (.silent()) | 171,443 (±25.04%) | 5.84 | 1.70 | -0.01 | 130,242 |
| isMACAddress - valid input (pass) | 9,506,881 (±3.26%) | 0.11 | 0.01 | 0.00 | 7,136,588 |
| isMACAddress - invalid input (throws) | 232,033 (±3.23%) | 4.31 | 1.63 | 0.00 | 174,960 |
| isMACAddress - invalid input (.silent()) | 225,678 (±1.49%) | 4.43 | 0.13 | 0.00 | 170,505 |
| isMobilePhone - valid input (pass) | 430,961 (±1.20%) | 2.32 | 0.24 | 0.00 | 323,910 |
| isMobilePhone - invalid input (throws) | 95,943 (±0.79%) | 10.42 | 1.60 | 0.00 | 72,252 |
| isMobilePhone - invalid input (.silent()) | 89,173 (±4.11%) | 11.21 | 1.71 | 0.00 | 67,301 |
| isNotEmpty - valid input (pass) | 28,430,743 (±0.92%) | 0.04 | 0.01 | 0.00 | 21,344,235 |
| isNotEmpty - invalid input (throws) | 247,079 (±0.38%) | 4.05 | 0.12 | 0.00 | 186,186 |
| isNotEmpty - invalid input (.silent()) | 230,391 (±2.98%) | 4.34 | 0.07 | 0.00 | 173,600 |
| isNotEqual - valid input (pass) | 29,440,908 (±0.60%) | 0.03 | 0.00 | 0.00 | 22,122,384 |
| isNotEqual - invalid input (throws) | 242,028 (±2.41%) | 4.13 | 0.12 | 0.00 | 182,214 |
| isNotEqual - invalid input (.silent()) | 227,999 (±1.35%) | 4.39 | 0.13 | 0.00 | 172,088 |
| isNotNull - valid input (pass) | 28,813,742 (±3.08%) | 0.03 | 0.01 | 0.00 | 21,629,430 |
| isNotNull - invalid input (throws) | 228,522 (±1.18%) | 4.38 | 0.30 | -0.17 | 171,884 |
| isNotNull - invalid input (.silent()) | 218,879 (±1.95%) | 4.57 | 0.36 | 0.00 | 165,325 |
| isNotNullish - valid input (pass) | 28,892,744 (±0.92%) | 0.03 | 0.01 | 0.00 | 21,690,840 |
| isNotNullish - invalid input (throws) | 230,145 (±1.12%) | 4.35 | 0.45 | 0.00 | 173,405 |
| isNotNullish - invalid input (.silent()) | 216,016 (±0.91%) | 4.63 | 0.47 | 0.00 | 163,200 |
| isNull - valid input (pass) | 29,269,618 (±0.80%) | 0.03 | 0.01 | 0.00 | 21,979,800 |
| isNull - invalid input (throws) | 241,581 (±1.05%) | 4.14 | 0.12 | 0.00 | 182,229 |
| isNull - invalid input (.silent()) | 232,406 (±0.74%) | 4.30 | 0.13 | 0.00 | 174,715 |
| isNullish - valid input (pass) | 28,904,834 (±1.97%) | 0.03 | 0.01 | 0.00 | 21,702,170 |
| isNullish - invalid input (throws) | 231,650 (±1.05%) | 4.32 | 0.43 | 0.00 | 175,086 |
| isNullish - invalid input (.silent()) | 217,363 (±1.74%) | 4.60 | 0.47 | 0.00 | 164,320 |
| isNumber - valid input (pass) | 27,206,024 (±1.24%) | 0.04 | 0.01 | 0.00 | 20,429,240 |
| isNumber - invalid input (throws) | 239,693 (±2.31%) | 4.17 | 0.10 | 0.00 | 180,918 |
| isNumber - invalid input (.silent()) | 233,205 (±0.19%) | 4.29 | 0.10 | 0.00 | 176,580 |
| isObject - flat schema (2 fields) - valid (pass) | 274,951 (±3.90%) | 3.64 | 1.84 | 0.00 | 207,450 |
| isObject - flat schema (2 fields) - invalid (throws) | 111,674 (±1.07%) | 8.95 | 2.89 | -0.01 | 84,420 |
| isObject - flat schema (2 fields) - invalid (.silent()) | 104,613 (±1.95%) | 9.56 | 2.91 | 0.00 | 79,056 |
| isObject - wide schema (50 fields) - valid (pass) | 75,339 (±1.49%) | 13.27 | 4.13 | 0.01 | 56,826 |
| isObject - detectCircular:true, non-circular - valid (pass) | 275,383 (±1.19%) | 3.63 | 1.61 | 0.00 | 207,317 |
| isObject - additionalFields:"error", extra field present (throws) | 109,536 (±1.43%) | 9.13 | 2.93 | 0.01 | 82,555 |
| isObject - caseInSensitive:true - valid (pass) | 274,673 (±1.40%) | 3.64 | 1.94 | 0.00 | 207,252 |
| isObject - nested isObject (1 level) - valid (pass) | 146,643 (±3.84%) | 6.82 | 3.29 | 0.00 | 110,656 |
| isObjectId - valid input (pass) | 11,901,988 (±0.33%) | 0.08 | 0.01 | 0.00 | 8,955,100 |
| isObjectId - invalid input (throws) | 244,632 (±0.26%) | 4.09 | 0.12 | 0.00 | 184,675 |
| isObjectId - invalid input (.silent()) | 228,694 (±1.55%) | 4.37 | 0.12 | 0.00 | 172,508 |
| isPassportNumber - valid input (pass) | 8,350,208 (±0.99%) | 0.12 | 0.02 | 0.00 | 6,277,008 |
| isPassportNumber - invalid input (throws) | 237,257 (±1.66%) | 4.21 | 0.18 | 0.00 | 178,893 |
| isPassportNumber - invalid input (.silent()) | 229,322 (±0.52%) | 4.36 | 0.19 | 0.00 | 172,935 |
| isPort - valid input (pass) | 9,706,002 (±0.97%) | 0.10 | 0.01 | 0.00 | 7,291,308 |
| isPort - invalid input (throws) | 243,672 (±0.90%) | 4.10 | 0.11 | 0.00 | 184,414 |
| isPort - invalid input (.silent()) | 225,801 (±1.54%) | 4.43 | 0.10 | 0.00 | 170,553 |
| isRecord - valid input (pass) | 290,995 (±2.65%) | 3.44 | 1.50 | 0.01 | 220,056 |
| isRecord - invalid input (throws) | 113,409 (±1.26%) | 8.82 | 2.47 | 0.02 | 85,806 |
| isRecord - invalid input (.silent()) | 97,441 (±16.57%) | 10.26 | 2.50 | 0.00 | 73,780 |
| isSWIFT - valid input (pass) | 8,734,561 (±1.41%) | 0.11 | 0.03 | 0.00 | 6,559,925 |
| isSWIFT - invalid input (throws) | 238,177 (±1.42%) | 4.20 | 0.08 | 0.00 | 180,264 |
| isSWIFT - invalid input (.silent()) | 224,602 (±0.72%) | 4.45 | 0.03 | 0.00 | 169,222 |
| isString - valid input (pass) | 24,880,424 (±0.48%) | 0.04 | 0.00 | 0.00 | 18,696,600 |
| isString - invalid input (throws) | 245,079 (±0.63%) | 4.08 | 0.13 | 0.00 | 185,437 |
| isString - invalid input (.silent()) | 223,126 (±4.51%) | 4.48 | 1.64 | -0.18 | 168,270 |
| isTime - valid input (pass) | 5,717,097 (±3.93%) | 0.17 | 0.02 | -0.01 | 4,295,828 |
| isTime - invalid input (throws) | 220,491 (±6.72%) | 4.54 | 0.13 | -0.06 | 165,580 |
| isTime - invalid input (.silent()) | 221,120 (±1.53%) | 4.52 | 1.84 | -0.08 | 167,056 |
| isTuple - valid input (pass) | 247,878 (±4.10%) | 4.03 | 1.46 | 0.00 | 187,590 |
| isTuple - invalid input (throws) | 106,039 (±1.71%) | 9.43 | 2.70 | 0.00 | 79,902 |
| isTuple - invalid input (.silent()) | 97,892 (±1.75%) | 10.22 | 2.48 | -0.02 | 74,272 |
| isURL - valid input (pass) | 737,680 (±12.21%) | 1.36 | 0.38 | 0.00 | 556,905 |
| isURL - invalid input (throws) | 235,015 (±1.36%) | 4.26 | 0.08 | 0.00 | 177,316 |
| isURL - invalid input (.silent()) | 225,630 (±0.17%) | 4.43 | 0.16 | 0.00 | 170,100 |
| isUUID - valid input (pass) | 8,731,466 (±2.41%) | 0.11 | 0.01 | 0.00 | 6,560,898 |
| isUUID - invalid input (throws) | 234,678 (±2.31%) | 4.26 | 1.56 | 0.00 | 178,504 |
| isUUID - invalid input (.silent()) | 230,679 (±1.15%) | 4.34 | 0.10 | 0.00 | 173,740 |
| isUndefined - valid input (pass) | 27,047,187 (±0.63%) | 0.04 | 0.01 | 0.00 | 20,299,240 |
| isUndefined - invalid input (throws) | 244,213 (±1.33%) | 4.09 | 0.11 | 0.00 | 184,025 |
| isUndefined - invalid input (.silent()) | 230,846 (±0.59%) | 4.33 | 0.07 | -0.08 | 173,885 |
| isUppercase - valid input (pass) | 14,881,219 (±14.84%) | 0.07 | 0.00 | 0.00 | 11,178,984 |
| isUppercase - invalid input (throws) | 189,410 (±17.49%) | 5.28 | 0.09 | 0.01 | 142,710 |
| isUppercase - invalid input (.silent()) | 218,130 (±2.65%) | 4.58 | 0.05 | 0.01 | 164,400 |
| isVATNumber - valid input (pass) | 11,651,514 (±1.01%) | 0.09 | 0.00 | 0.00 | 8,748,402 |
| isVATNumber - invalid input (throws) | 235,645 (±0.40%) | 4.24 | 0.12 | 0.00 | 177,506 |
| isVATNumber - invalid input (.silent()) | 229,401 (±0.91%) | 4.36 | 0.12 | 0.00 | 172,966 |
| lengthMax - valid input (pass) | 512,481 (±6.37%) | 1.95 | 1.16 | 0.00 | 386,862 |
| lengthMax - invalid input (throws) | 106,348 (±1.57%) | 9.40 | 2.29 | 0.00 | 80,340 |
| lengthMax - invalid input (.silent()) | 104,776 (±1.45%) | 9.54 | 2.37 | 0.00 | 78,905 |
| lengthMin - valid input (pass) | 517,074 (±10.92%) | 1.93 | 1.03 | 0.00 | 389,980 |
| lengthMin - invalid input (throws) | 110,649 (±1.63%) | 9.04 | 2.06 | 0.00 | 84,042 |
| lengthMin - invalid input (.silent()) | 108,607 (±0.60%) | 9.21 | 2.04 | 0.00 | 82,064 |
| matches - valid input (pass) | 19,475,336 (±0.81%) | 0.05 | 0.01 | 0.00 | 14,623,533 |
| matches - invalid input (throws) | 238,451 (±1.08%) | 4.19 | 0.66 | 0.00 | 179,335 |
| matches - invalid input (.silent()) | 219,991 (±1.94%) | 4.55 | 0.59 | 0.00 | 165,624 |
| nullable - null input (pass, short-circuits before nested rule) | 28,187,736 (±0.31%) | 0.04 | 0.00 | 0.00 | 21,185,400 |
| nullable - defined valid input (pass, delegates to nested rule) | 18,720,053 (±0.67%) | 0.05 | 0.01 | 0.00 | 14,062,281 |
| nullable - defined invalid input (throws from nested rule) | 195,680 (±0.80%) | 5.11 | 1.69 | 0.00 | 147,653 |
| oneOf - simple union, matches 1st rule (pass) | 3,402,462 (±0.83%) | 0.29 | 0.08 | 0.00 | 2,562,672 |
| oneOf - simple union, matches 2nd (last) rule (pass) | 3,134,628 (±0.79%) | 0.32 | 0.10 | 0.00 | 2,359,294 |
| oneOf - simple union, no rule matches (throws) | 224,124 (±0.92%) | 4.46 | 0.93 | 0.00 | 169,302 |
| oneOf - simple union, no rule matches (.silent()) | 212,446 (±0.35%) | 4.71 | 0.91 | 0.00 | 160,552 |
| oneOf - discriminated, matches 1st branch (pass) | 200,623 (±0.47%) | 4.98 | 1.83 | 0.00 | 151,424 |
| oneOf - discriminated, matches 2nd (last) branch (pass) | 198,218 (±1.60%) | 5.04 | 1.80 | 0.04 | 149,380 |
| oneOf - discriminated, no branch matches (throws) | 190,875 (±8.17%) | 5.24 | 1.07 | 0.00 | 143,577 |
| optional - undefined input (pass, short-circuits before nested rule) | 28,723,479 (±0.81%) | 0.03 | 0.01 | 0.00 | 21,557,550 |
| optional - defined valid input (pass, delegates to nested rule) | 18,834,999 (±0.55%) | 0.05 | 0.01 | 0.00 | 14,142,600 |
| optional - defined invalid input (throws from nested rule) | 194,989 (±0.53%) | 5.13 | 1.69 | 0.00 | 147,060 |
| pipe - 1 step - valid (pass) | 15,978,762 (±1.92%) | 0.06 | 0.00 | 0.00 | 12,004,295 |
| pipe - 2 steps - valid (pass) | 12,661,293 (±0.65%) | 0.08 | 0.02 | 0.00 | 9,524,628 |
| pipe - 3 steps - valid (pass) | 9,790,264 (±1.56%) | 0.10 | 0.00 | 0.00 | 7,361,152 |
| pipe - 2 steps - invalid, fails on step 2 (throws) | 195,184 (±0.75%) | 5.12 | 1.77 | 0.00 | 147,050 |
| pipe - 2 steps - invalid, fails on step 2 (.silent()) | 184,899 (±1.37%) | 5.41 | 1.85 | -0.15 | 139,601 |
| pipe - returnIndex option - valid (pass) | 9,069,059 (±0.45%) | 0.11 | 0.04 | 0.00 | 6,816,876 |
| range - number, valid input (pass) | 27,349,787 (±0.95%) | 0.04 | 0.00 | 0.00 | 20,554,290 |
| range - number, invalid input (throws) | 249,050 (±0.48%) | 4.02 | 0.15 | 0.00 | 187,850 |
| range - number, invalid input (.silent()) | 229,007 (±1.39%) | 4.37 | 0.09 | 0.00 | 173,007 |
| required - defined valid input (pass, delegates to nested rule) | 18,517,480 (±0.39%) | 0.05 | 0.00 | 0.00 | 13,901,216 |
| required - undefined input (throws immediately) | 220,086 (±9.23%) | 4.54 | 0.22 | 0.00 | 165,880 |
| required - undefined input with a default (pass) | 11,675,180 (±2.40%) | 0.09 | 0.00 | 0.00 | 8,768,588 |
| stringReplace - string input (pass) | 9,865,323 (±0.93%) | 0.10 | 0.03 | 0.00 | 7,426,180 |
| stringReplace - null input (pass through unchanged) | 27,797,557 (±2.69%) | 0.04 | 0.00 | 0.00 | 20,882,092 |
| stringSplit - string input (pass) | 15,311,100 (±3.18%) | 0.07 | 0.01 | 0.00 | 11,524,275 |
| stringSplit - null input (pass through unchanged) | 28,408,175 (±0.31%) | 0.04 | 0.01 | 0.00 | 21,342,747 |
| trim - string input (pass) | 20,310,555 (±2.57%) | 0.05 | 0.01 | 0.00 | 15,265,114 |
| trim - null input (pass through unchanged) | 27,773,254 (±1.87%) | 0.04 | 0.00 | 0.00 | 20,861,750 |
| trimEnd - string input (pass) | 21,137,880 (±1.16%) | 0.05 | 0.01 | 0.00 | 15,889,468 |
| trimStart - string input (pass) | 21,090,558 (±0.81%) | 0.05 | 0.01 | 0.00 | 15,864,030 |
