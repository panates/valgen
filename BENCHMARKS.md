# Benchmarks

Generated 2026-09-08T13:28:01.854Z - Node v24.15.0.

| Name | Ops/sec | Mean time (µs) | Heap/op (KB) | RSS/op (KB) | Samples |
| :--- | ---: | ---: | ---: | ---: | ---: |
| allOf - 1 rule - valid (pass) | 23,310,989 (±10.48%) | 0.04 | 0.00 | 0.00 | 17,510,664 |
| allOf - 2 rules - valid (pass) | 18,832,764 (±5.65%) | 0.05 | 0.00 | 0.00 | 14,156,362 |
| allOf - 3 rules - valid (pass) | 13,821,835 (±19.68%) | 0.07 | 0.00 | 0.00 | 10,397,846 |
| allOf - 3 rules - invalid, fails 1st rule (throws) | 183,506 (±8.38%) | 5.45 | 0.08 | 0.05 | 138,632 |
| allOf - 3 rules - invalid, fails last rule (throws) | 195,580 (±12.02%) | 5.11 | 0.02 | 0.01 | 147,455 |
| allOf - 3 rules - invalid, fails last rule (.silent()) | 202,321 (±10.53%) | 4.95 | 0.10 | 0.00 | 153,088 |
| exists - key present with a value (pass) | 160,555 (±22.41%) | 6.24 | 1.91 | 0.10 | 123,123 |
| exists - key present but undefined (pass) | 274,879 (±16.69%) | 3.64 | 1.26 | 0.01 | 206,492 |
| exists - key missing entirely (throws) | 117,656 (±1.89%) | 8.50 | 3.40 | 0.01 | 88,650 |
| fixed - any input (always passes) | 29,088,995 (±1.79%) | 0.03 | 0.00 | 0.00 | 21,854,206 |
| getLength - string (pass) | 28,087,223 (±2.22%) | 0.04 | 0.00 | 0.00 | 21,086,505 |
| getLength - array (pass) | 27,458,531 (±3.22%) | 0.04 | 0.00 | 0.00 | 20,614,141 |
| getLength - Set (pass) | 24,191,943 (±1.96%) | 0.04 | 0.01 | 0.00 | 18,162,226 |
| getLength - unsupported type (throws) | 110,695 (±19.66%) | 9.07 | 1.57 | -0.34 | 88,858 |
| isAlpha - valid input (pass) | 5,906,828 (±15.27%) | 0.17 | 0.02 | 0.00 | 4,554,585 |
| isAlpha - invalid input (throws) | 132,963 (±31.35%) | 7.54 | 1.56 | 0.31 | 101,568 |
| isAlpha - invalid input (.silent()) | 85,203 (±41.25%) | 12.82 | 1.66 | 0.15 | 67,962 |
| isAlphanumeric - valid input (pass) | 8,060,666 (±19.82%) | 0.12 | 0.02 | 0.00 | 6,053,928 |
| isAlphanumeric - invalid input (throws) | 251,991 (±9.78%) | 3.97 | 0.16 | 0.03 | 191,498 |
| isAlphanumeric - invalid input (.silent()) | 272,510 (±1.12%) | 3.67 | 0.29 | 0.00 | 206,264 |
| isAny - any input (always passes) | 27,877,493 (±3.89%) | 0.04 | 0.00 | 0.00 | 20,938,152 |
| isArray(20 items) - all valid (pass) | 190,008 (±8.31%) | 5.26 | 2.16 | 0.02 | 143,497 |
| isArray(20 items) - one invalid item (throws) | 98,357 (±1.76%) | 10.17 | 3.88 | 0.00 | 74,025 |
| isArray(20 items) - one invalid item (.silent()) | 88,552 (±18.04%) | 11.52 | 6.52 | -5.41 | 69,344 |
| isAscii - valid input (pass) | 10,100,175 (±44.75%) | 0.10 | 0.01 | 0.00 | 7,592,991 |
| isAscii - invalid input (throws) | 270,631 (±3.32%) | 3.70 | 0.19 | 0.00 | 204,472 |
| isAscii - invalid input (.silent()) | 272,324 (±1.21%) | 3.67 | 0.32 | 0.00 | 205,590 |
| isBase64 - valid input (pass) | 8,042,007 (±1.38%) | 0.12 | 0.01 | 0.00 | 6,035,610 |
| isBase64 - invalid input (throws) | 284,515 (±2.20%) | 3.51 | 0.44 | 0.00 | 214,884 |
| isBase64 - invalid input (.silent()) | 262,836 (±4.27%) | 3.80 | 0.41 | 0.00 | 198,696 |
| isBigint - valid input (pass) | 27,781,344 (±2.13%) | 0.04 | 0.00 | 0.00 | 20,853,171 |
| isBigint - invalid input (throws) | 294,698 (±1.10%) | 3.39 | 0.36 | 0.00 | 222,488 |
| isBigint - invalid input (.silent()) | 278,400 (±1.22%) | 3.59 | 0.31 | 0.00 | 209,560 |
| isBoolean - valid input (pass) | 28,261,960 (±0.48%) | 0.04 | 0.01 | 0.00 | 21,216,166 |
| isBoolean - invalid input (throws) | 301,664 (±0.68%) | 3.31 | 0.38 | 0.00 | 227,552 |
| isBoolean - invalid input (.silent()) | 282,986 (±0.75%) | 3.53 | 0.34 | 0.00 | 213,447 |
| isBtcAddress - valid input (pass) | 8,191,532 (±0.37%) | 0.12 | 0.00 | 0.00 | 6,151,435 |
| isBtcAddress - invalid input (throws) | 293,968 (±1.30%) | 3.40 | 0.34 | 0.00 | 221,781 |
| isBtcAddress - invalid input (.silent()) | 276,764 (±0.75%) | 3.61 | 0.35 | 0.00 | 208,604 |
| isCreditCard - valid input (pass) | 3,153,484 (±1.17%) | 0.32 | 0.10 | 0.00 | 2,368,310 |
| isCreditCard - invalid input (throws) | 226,104 (±0.81%) | 4.42 | 0.21 | 0.00 | 170,940 |
| isCreditCard - invalid input (.silent()) | 215,575 (±0.30%) | 4.64 | 0.19 | 0.00 | 162,240 |
| isDate - valid input (pass) | 7,123,089 (±0.07%) | 0.14 | 0.03 | 0.00 | 5,352,480 |
| isDate - invalid input (throws) | 241,191 (±2.02%) | 4.15 | 0.14 | 0.00 | 181,429 |
| isDate - invalid input (.silent()) | 230,985 (±0.25%) | 4.33 | 0.14 | 0.00 | 174,264 |
| isDateString - valid input (pass) | 716,080 (±0.50%) | 1.40 | 0.25 | 0.00 | 538,396 |
| isDateString - invalid input (throws) | 209,088 (±0.91%) | 4.78 | 1.10 | 0.00 | 157,785 |
| isDateString - invalid input (.silent()) | 197,568 (±1.17%) | 5.06 | 0.97 | -0.02 | 149,454 |
| isDecimal - valid input (pass) | 2,787,449 (±0.59%) | 0.36 | 0.01 | 0.00 | 2,093,125 |
| isDecimal - invalid input (throws) | 219,705 (±0.54%) | 4.55 | 0.35 | 0.00 | 165,505 |
| isDecimal - invalid input (.silent()) | 208,106 (±0.47%) | 4.81 | 0.35 | 0.00 | 156,984 |
| isDefined - valid input (pass) | 29,382,721 (±0.24%) | 0.03 | 0.01 | 0.00 | 22,063,680 |
| isDefined - invalid input (throws) | 239,484 (±0.62%) | 4.18 | 0.23 | 0.00 | 181,020 |
| isDefined - invalid input (.silent()) | 209,321 (±15.28%) | 4.78 | 1.80 | -0.02 | 158,395 |
| isEAN - valid input (pass) | 4,672,832 (±1.24%) | 0.21 | 0.06 | 0.00 | 3,505,320 |
| isEAN - invalid input (throws) | 228,458 (±0.77%) | 4.38 | 0.42 | 0.00 | 172,380 |
| isEAN - invalid input (.silent()) | 216,531 (±0.57%) | 4.62 | 0.42 | 0.00 | 163,180 |
| isETHAddress - valid input (pass) | 7,857,639 (±3.00%) | 0.13 | 0.04 | 0.00 | 5,910,840 |
| isETHAddress - invalid input (throws) | 237,592 (±0.78%) | 4.21 | 0.07 | 0.00 | 179,498 |
| isETHAddress - invalid input (.silent()) | 224,536 (±1.29%) | 4.45 | 0.05 | 0.00 | 168,896 |
| isEmail - valid input (pass) | 535,254 (±0.21%) | 1.87 | 0.41 | 0.00 | 402,435 |
| isEmail - invalid input (throws) | 206,646 (±1.35%) | 4.84 | 0.55 | 0.00 | 155,449 |
| isEmail - invalid input (.silent()) | 197,828 (±1.07%) | 5.05 | 0.24 | -0.01 | 149,193 |
| isEmpty - valid input (pass) | 28,870,315 (±0.58%) | 0.03 | 0.01 | 0.00 | 21,671,400 |
| isEmpty - invalid input (throws) | 237,677 (±1.26%) | 4.21 | 0.11 | 0.00 | 179,280 |
| isEmpty - invalid input (.silent()) | 229,358 (±0.36%) | 4.36 | 0.06 | 0.00 | 173,400 |
| isEnum - valid input (pass) | 29,156,999 (±1.96%) | 0.03 | 0.01 | 0.00 | 21,890,598 |
| isEnum - invalid input (throws) | 234,033 (±1.00%) | 4.27 | 0.36 | 0.00 | 176,788 |
| isEnum - invalid input (.silent()) | 223,663 (±0.81%) | 4.47 | 0.45 | 0.00 | 168,084 |
| isEqual - valid input (pass) | 28,935,661 (±1.28%) | 0.03 | 0.01 | 0.00 | 21,740,028 |
| isEqual - invalid input (throws) | 243,304 (±0.37%) | 4.11 | 0.12 | 0.00 | 183,168 |
| isEqual - invalid input (.silent()) | 220,202 (±5.56%) | 4.54 | 0.06 | 0.00 | 166,440 |
| isFQDN - valid input (pass) | 3,349,667 (±0.96%) | 0.30 | 0.06 | 0.00 | 2,520,947 |
| isFQDN - invalid input (throws) | 235,498 (±0.68%) | 4.25 | 0.13 | 0.00 | 177,660 |
| isFQDN - invalid input (.silent()) | 218,334 (±1.17%) | 4.58 | 0.07 | 0.00 | 164,611 |
| isGt - number, valid input (pass) | 29,118,481 (±0.68%) | 0.03 | 0.00 | 0.00 | 21,865,681 |
| isGt - number, invalid input (throws) | 242,977 (±0.44%) | 4.12 | 0.18 | 0.00 | 183,610 |
| isGt - number, invalid input (.silent()) | 224,467 (±1.12%) | 4.45 | 0.13 | 0.00 | 169,719 |
| isGt - string, caseInsensitive - valid (pass) | 14,632,681 (±0.22%) | 0.07 | 0.02 | 0.00 | 10,991,826 |
| isGte - number, valid input (pass) | 28,485,366 (±0.79%) | 0.04 | 0.01 | 0.00 | 21,392,574 |
| isGte - number, invalid input (throws) | 242,851 (±0.25%) | 4.12 | 0.13 | 0.00 | 183,120 |
| isGte - number, invalid input (.silent()) | 233,550 (±0.28%) | 4.28 | 0.10 | 0.00 | 176,710 |
| isHash - valid input (pass) | 4,349,102 (±1.29%) | 0.23 | 0.06 | 0.00 | 3,272,248 |
| isHash - invalid input (throws) | 213,355 (±5.98%) | 4.69 | 1.80 | -0.01 | 160,696 |
| isHash - invalid input (.silent()) | 195,198 (±1.95%) | 5.12 | 0.08 | 0.00 | 146,652 |
| isHex - valid input (pass) | 14,253,904 (±5.73%) | 0.07 | 0.00 | 0.00 | 10,707,545 |
| isHex - invalid input (throws) | 236,661 (±1.51%) | 4.23 | 0.10 | 0.00 | 178,188 |
| isHex - invalid input (.silent()) | 225,977 (±0.60%) | 4.43 | 0.08 | 0.00 | 170,156 |
| isHexColor - valid input (pass) | 11,111,347 (±0.51%) | 0.09 | 0.02 | 0.00 | 8,346,646 |
| isHexColor - invalid input (throws) | 241,197 (±0.65%) | 4.15 | 0.11 | 0.00 | 181,746 |
| isHexColor - invalid input (.silent()) | 223,023 (±2.50%) | 4.48 | 0.10 | 0.00 | 167,958 |
| isIBAN - valid input (pass) | 1,360,882 (±2.18%) | 0.73 | 0.25 | 0.00 | 1,023,750 |
| isIBAN - invalid input (throws) | 165,842 (±16.43%) | 6.03 | 0.88 | 0.00 | 125,265 |
| isIBAN - invalid input (.silent()) | 188,830 (±1.00%) | 5.30 | 0.86 | 0.00 | 142,552 |
| isIP - valid input (pass) | 9,967,180 (±0.77%) | 0.10 | 0.03 | 0.00 | 7,484,672 |
| isIP - invalid input (throws) | 235,374 (±1.38%) | 4.25 | 0.19 | 0.00 | 177,228 |
| isIP - invalid input (.silent()) | 226,760 (±0.77%) | 4.41 | 0.15 | 0.00 | 170,710 |
| isIPRange - valid input (pass) | 3,605,262 (±1.04%) | 0.28 | 0.00 | 0.00 | 2,707,845 |
| isIPRange - invalid input (throws) | 246,041 (±0.22%) | 4.06 | 0.14 | 0.00 | 185,617 |
| isIPRange - invalid input (.silent()) | 231,585 (±0.73%) | 4.32 | 0.13 | 0.00 | 174,715 |
| isISSN - valid input (pass) | 4,782,891 (±10.10%) | 0.21 | 0.00 | 0.00 | 3,595,068 |
| isISSN - invalid input (throws) | 224,888 (±1.84%) | 4.45 | 0.10 | 0.00 | 169,680 |
| isISSN - invalid input (.silent()) | 218,746 (±1.34%) | 4.57 | 0.15 | 0.00 | 165,360 |
| isInstanceOf - valid input (pass) | 27,767,770 (±0.72%) | 0.04 | 0.00 | 0.00 | 20,843,608 |
| isInstanceOf - invalid input (throws) | 246,166 (±0.21%) | 4.06 | 0.24 | 0.00 | 186,010 |
| isInstanceOf - invalid input (.silent()) | 219,184 (±2.21%) | 4.56 | 0.20 | 0.00 | 164,736 |
| isInteger - valid input (pass) | 25,091,715 (±0.31%) | 0.04 | 0.01 | 0.00 | 18,853,014 |
| isInteger - invalid input (throws) | 238,458 (±1.84%) | 4.19 | 0.11 | 0.00 | 179,694 |
| isInteger - invalid input (.silent()) | 220,482 (±6.31%) | 4.54 | 0.10 | 0.00 | 166,656 |
| isJWT - valid input (pass) | 3,099,240 (±0.31%) | 0.32 | 0.07 | 0.00 | 2,330,052 |
| isJWT - invalid input (throws) | 99,954 (±58.62%) | 10.07 | 1.60 | 0.36 | 76,446 |
| isJWT - invalid input (.silent()) | 222,701 (±1.89%) | 4.49 | 0.09 | 0.00 | 167,875 |
| isLowercase - valid input (pass) | 20,046,571 (±0.69%) | 0.05 | 0.01 | 0.00 | 15,057,504 |
| isLowercase - invalid input (throws) | 247,691 (±0.56%) | 4.04 | 0.15 | 0.00 | 186,623 |
| isLowercase - invalid input (.silent()) | 225,052 (±3.72%) | 4.44 | 0.09 | -0.10 | 169,916 |
| isLt - number, valid input (pass) | 28,056,604 (±0.86%) | 0.04 | 0.00 | 0.00 | 21,072,870 |
| isLt - number, invalid input (throws) | 243,691 (±1.15%) | 4.10 | 0.19 | 0.00 | 184,500 |
| isLt - number, invalid input (.silent()) | 228,707 (±1.54%) | 4.37 | 0.19 | 0.00 | 172,104 |
| isLte - number, valid input (pass) | 28,814,444 (±0.91%) | 0.03 | 0.01 | 0.00 | 21,639,240 |
| isLte - number, invalid input (throws) | 246,062 (±0.90%) | 4.06 | 0.13 | 0.00 | 185,300 |
| isLte - number, invalid input (.silent()) | 234,677 (±0.37%) | 4.26 | 0.09 | 0.00 | 177,590 |
| isMACAddress - valid input (pass) | 9,875,592 (±0.77%) | 0.10 | 0.03 | 0.00 | 7,417,228 |
| isMACAddress - invalid input (throws) | 234,083 (±1.49%) | 4.27 | 0.07 | 0.00 | 176,665 |
| isMACAddress - invalid input (.silent()) | 211,497 (±6.50%) | 4.73 | 1.70 | 0.00 | 159,856 |
| isMobilePhone - valid input (pass) | 224,691 (±36.03%) | 4.46 | 0.24 | -0.20 | 170,578 |
| isMobilePhone - invalid input (throws) | 70,006 (±9.59%) | 14.29 | 1.60 | 0.00 | 52,556 |
| isMobilePhone - invalid input (.silent()) | 88,287 (±2.72%) | 11.33 | 1.71 | 0.00 | 66,768 |
| isNotEmpty - valid input (pass) | 26,864,209 (±4.88%) | 0.04 | 0.00 | 0.00 | 20,168,106 |
| isNotEmpty - invalid input (throws) | 247,793 (±0.18%) | 4.04 | 1.56 | 0.00 | 186,946 |
| isNotEmpty - invalid input (.silent()) | 191,291 (±13.19%) | 5.23 | 0.06 | 0.00 | 143,994 |
| isNotEqual - valid input (pass) | 28,894,625 (±0.93%) | 0.03 | 0.01 | 0.00 | 21,698,361 |
| isNotEqual - invalid input (throws) | 236,237 (±1.02%) | 4.23 | 0.07 | 0.00 | 178,350 |
| isNotEqual - invalid input (.silent()) | 231,070 (±0.75%) | 4.33 | 0.12 | 0.00 | 174,675 |
| isNotNull - valid input (pass) | 28,180,309 (±2.52%) | 0.04 | 0.00 | 0.00 | 21,164,320 |
| isNotNull - invalid input (throws) | 227,624 (±1.57%) | 4.39 | 0.43 | 0.00 | 171,720 |
| isNotNull - invalid input (.silent()) | 204,555 (±3.99%) | 4.89 | 0.32 | 0.00 | 154,368 |
| isNotNullish - valid input (pass) | 24,705,122 (±20.50%) | 0.04 | 0.01 | 0.00 | 18,606,624 |
| isNotNullish - invalid input (throws) | 226,934 (±2.63%) | 4.41 | 0.46 | 0.00 | 171,430 |
| isNotNullish - invalid input (.silent()) | 219,696 (±0.45%) | 4.55 | 0.40 | 0.00 | 165,633 |
| isNull - valid input (pass) | 29,241,051 (±0.34%) | 0.03 | 0.01 | 0.00 | 21,946,214 |
| isNull - invalid input (throws) | 241,945 (±1.66%) | 4.13 | 0.11 | 0.00 | 182,450 |
| isNull - invalid input (.silent()) | 231,704 (±0.51%) | 4.32 | 0.04 | 0.00 | 174,724 |
| isNullish - valid input (pass) | 28,047,079 (±2.46%) | 0.04 | 0.01 | 0.00 | 21,058,800 |
| isNullish - invalid input (throws) | 230,937 (±0.40%) | 4.33 | 0.44 | 0.00 | 174,212 |
| isNullish - invalid input (.silent()) | 215,323 (±2.42%) | 4.64 | 2.08 | -0.01 | 162,810 |
| isNumber - valid input (pass) | 26,669,401 (±1.61%) | 0.04 | 0.01 | 0.00 | 20,014,176 |
| isNumber - invalid input (throws) | 247,880 (±0.24%) | 4.03 | 1.56 | 0.00 | 186,900 |
| isNumber - invalid input (.silent()) | 217,716 (±4.73%) | 4.59 | 0.05 | 0.00 | 163,920 |
| isObject - flat schema (2 fields) - valid (pass) | 250,589 (±11.30%) | 3.99 | 1.81 | 0.01 | 188,700 |
| isObject - flat schema (2 fields) - invalid (throws) | 101,391 (±2.16%) | 9.86 | 2.80 | 0.00 | 77,164 |
| isObject - flat schema (2 fields) - invalid (.silent()) | 100,260 (±5.59%) | 9.98 | 2.78 | 0.00 | 75,808 |
| isObject - wide schema (50 fields) - valid (pass) | 70,736 (±3.29%) | 14.14 | 3.07 | 0.00 | 53,576 |
| isObject - detectCircular:true, non-circular - valid (pass) | 246,974 (±2.52%) | 4.05 | 2.22 | 0.00 | 185,808 |
| isObject - additionalFields:"error", extra field present (throws) | 101,602 (±2.85%) | 9.84 | 2.72 | -0.03 | 76,612 |
| isObject - caseInSensitive:true - valid (pass) | 256,164 (±3.39%) | 3.90 | 1.86 | 0.01 | 193,200 |
| isObject - nested isObject (1 level) - valid (pass) | 142,814 (±1.63%) | 7.00 | 3.15 | 0.00 | 107,973 |
| isObjectId - valid input (pass) | 11,302,731 (±1.40%) | 0.09 | 0.03 | 0.00 | 8,488,020 |
| isObjectId - invalid input (throws) | 222,313 (±1.26%) | 4.50 | 1.56 | -0.05 | 168,090 |
| isObjectId - invalid input (.silent()) | 212,867 (±2.04%) | 4.70 | 1.64 | -0.18 | 160,680 |
| isPassportNumber - valid input (pass) | 7,221,084 (±3.91%) | 0.14 | 0.04 | 0.00 | 5,427,815 |
| isPassportNumber - invalid input (throws) | 229,810 (±0.75%) | 4.35 | 0.11 | 0.00 | 173,600 |
| isPassportNumber - invalid input (.silent()) | 200,871 (±14.55%) | 4.98 | 1.75 | 0.00 | 152,400 |
| isPort - valid input (pass) | 8,165,192 (±14.55%) | 0.12 | 0.02 | 0.00 | 6,133,430 |
| isPort - invalid input (throws) | 202,924 (±8.33%) | 4.93 | 1.61 | -0.17 | 153,648 |
| isPort - invalid input (.silent()) | 213,436 (±1.91%) | 4.69 | 0.04 | 0.00 | 160,752 |
| isRecord - valid input (pass) | 239,943 (±14.39%) | 4.16 | 1.41 | 0.01 | 182,959 |
| isRecord - invalid input (throws) | 104,348 (±6.05%) | 9.58 | 2.37 | 0.02 | 78,750 |
| isRecord - invalid input (.silent()) | 101,602 (±3.14%) | 9.84 | 2.42 | 0.00 | 77,172 |
| isSWIFT - valid input (pass) | 8,509,934 (±1.79%) | 0.12 | 0.04 | 0.00 | 6,395,424 |
| isSWIFT - invalid input (throws) | 239,560 (±1.68%) | 4.17 | 0.11 | 0.00 | 181,044 |
| isSWIFT - invalid input (.silent()) | 229,194 (±0.61%) | 4.36 | 0.08 | 0.00 | 172,956 |
| isString - valid input (pass) | 24,491,924 (±0.71%) | 0.04 | 0.00 | 0.00 | 18,393,729 |
| isString - invalid input (throws) | 246,595 (±0.62%) | 4.06 | 0.11 | 0.00 | 185,752 |
| isString - invalid input (.silent()) | 222,931 (±1.96%) | 4.49 | 0.07 | 0.00 | 168,504 |
| isTime - valid input (pass) | 6,143,710 (±0.37%) | 0.16 | 0.05 | 0.00 | 4,616,395 |
| isTime - invalid input (throws) | 240,855 (±0.69%) | 4.15 | 0.21 | 0.00 | 181,770 |
| isTime - invalid input (.silent()) | 222,184 (±1.27%) | 4.50 | 0.20 | 0.00 | 167,508 |
| isTuple - valid input (pass) | 259,822 (±1.19%) | 3.85 | 1.52 | 0.00 | 195,786 |
| isTuple - invalid input (throws) | 104,782 (±1.57%) | 9.54 | 2.64 | 0.00 | 79,211 |
| isTuple - invalid input (.silent()) | 102,729 (±1.63%) | 9.73 | 2.67 | 0.00 | 77,456 |
| isURL - valid input (pass) | 800,173 (±0.74%) | 1.25 | 0.12 | 0.00 | 602,022 |
| isURL - invalid input (throws) | 237,340 (±1.28%) | 4.21 | 0.14 | 0.00 | 179,142 |
| isURL - invalid input (.silent()) | 231,093 (±1.31%) | 4.33 | 0.20 | 0.00 | 174,212 |
| isUUID - valid input (pass) | 8,846,013 (±0.31%) | 0.11 | 0.01 | 0.00 | 6,647,340 |
| isUUID - invalid input (throws) | 244,700 (±1.30%) | 4.09 | 0.10 | 0.00 | 184,539 |
| isUUID - invalid input (.silent()) | 233,184 (±0.43%) | 4.29 | 0.10 | 0.00 | 175,924 |
| isUndefined - valid input (pass) | 26,865,627 (±2.26%) | 0.04 | 0.01 | 0.00 | 20,169,618 |
| isUndefined - invalid input (throws) | 209,955 (±25.89%) | 4.76 | 0.04 | -0.01 | 158,472 |
| isUndefined - invalid input (.silent()) | 228,080 (±1.14%) | 4.38 | 0.06 | 0.00 | 171,600 |
| isUppercase - valid input (pass) | 17,051,305 (±0.86%) | 0.06 | 0.01 | 0.00 | 12,799,696 |
| isUppercase - invalid input (throws) | 241,278 (±1.10%) | 4.14 | 0.12 | 0.00 | 181,812 |
| isUppercase - invalid input (.silent()) | 229,049 (±1.05%) | 4.37 | 0.10 | 0.00 | 173,040 |
| isVATNumber - valid input (pass) | 11,733,715 (±0.45%) | 0.09 | 0.00 | 0.00 | 8,818,272 |
| isVATNumber - invalid input (throws) | 237,261 (±1.43%) | 4.21 | 0.13 | -0.01 | 178,890 |
| isVATNumber - invalid input (.silent()) | 222,372 (±1.70%) | 4.50 | 0.12 | 0.00 | 167,844 |
| lengthMax - valid input (pass) | 543,349 (±2.53%) | 1.84 | 1.19 | 0.00 | 411,343 |
| lengthMax - invalid input (throws) | 104,347 (±1.21%) | 9.58 | 2.18 | 0.02 | 78,406 |
| lengthMax - invalid input (.silent()) | 104,725 (±0.97%) | 9.55 | 2.32 | 0.00 | 79,170 |
| lengthMin - valid input (pass) | 546,558 (±1.81%) | 1.83 | 1.20 | 0.00 | 413,060 |
| lengthMin - invalid input (throws) | 108,462 (±2.04%) | 9.22 | 2.00 | 0.00 | 81,900 |
| lengthMin - invalid input (.silent()) | 109,860 (±2.22%) | 9.10 | 2.04 | -0.01 | 82,992 |
| matches - valid input (pass) | 19,503,911 (±0.19%) | 0.05 | 0.02 | 0.00 | 14,648,832 |
| matches - invalid input (throws) | 237,190 (±0.32%) | 4.22 | 0.64 | 0.00 | 179,322 |
| matches - invalid input (.silent()) | 220,519 (±0.87%) | 4.53 | 0.63 | 0.00 | 166,690 |
| nullable - null input (pass, short-circuits before nested rule) | 27,586,963 (±0.96%) | 0.04 | 0.00 | 0.00 | 20,721,076 |
| nullable - defined valid input (pass, delegates to nested rule) | 18,415,407 (±1.22%) | 0.05 | 0.01 | 0.00 | 13,836,264 |
| nullable - defined invalid input (throws from nested rule) | 177,741 (±2.02%) | 5.63 | 1.69 | 0.00 | 133,866 |
| oneOf - simple union, matches 1st rule (pass) | 3,211,947 (±0.76%) | 0.31 | 0.10 | 0.00 | 2,413,085 |
| oneOf - simple union, matches 2nd (last) rule (pass) | 2,918,383 (±0.97%) | 0.34 | 0.04 | 0.00 | 2,197,641 |
| oneOf - simple union, no rule matches (throws) | 165,562 (±25.35%) | 6.04 | 2.51 | -0.39 | 125,367 |
| oneOf - simple union, no rule matches (.silent()) | 176,559 (±13.02%) | 5.66 | 0.81 | -0.71 | 132,797 |
| oneOf - discriminated, matches 1st branch (pass) | 119,084 (±59.92%) | 8.43 | 2.60 | 0.02 | 89,817 |
| oneOf - discriminated, matches 2nd (last) branch (pass) | 108,853 (±54.24%) | 9.18 | 2.82 | 0.07 | 82,360 |
| oneOf - discriminated, no branch matches (throws) | 207,351 (±3.34%) | 4.82 | 1.07 | 0.00 | 156,660 |
| optional - undefined input (pass, short-circuits before nested rule) | 27,082,586 (±1.98%) | 0.04 | 0.01 | 0.00 | 20,343,141 |
| optional - defined valid input (pass, delegates to nested rule) | 17,183,748 (±3.03%) | 0.06 | 0.02 | 0.00 | 12,909,347 |
| optional - defined invalid input (throws from nested rule) | 168,846 (±4.43%) | 5.92 | 1.69 | 0.02 | 127,510 |
| pipe - 1 step - valid (pass) | 14,213,947 (±14.67%) | 0.07 | 0.06 | 0.00 | 10,685,952 |
| pipe - 2 steps - valid (pass) | 3,253,405 (±23.08%) | 0.31 | 0.07 | 0.00 | 2,527,200 |
| pipe - 3 steps - valid (pass) | 2,305,184 (±44.03%) | 0.43 | 0.04 | -0.04 | 1,756,907 |
| pipe - 2 steps - invalid, fails on step 2 (throws) | 52,410 (±14.03%) | 19.03 | 1.80 | 0.02 | 40,480 |
| pipe - 2 steps - invalid, fails on step 2 (.silent()) | 58,772 (±19.57%) | 17.07 | 1.93 | -0.32 | 47,580 |
| pipe - returnIndex option - valid (pass) | 2,841,284 (±17.55%) | 0.36 | 0.06 | 0.00 | 2,218,249 |
| range - number, valid input (pass) | 16,731,226 (±16.22%) | 0.06 | 0.01 | 0.00 | 12,612,083 |
| range - number, invalid input (throws) | 100,117 (±46.56%) | 10.08 | 1.63 | -0.13 | 75,636 |
| range - number, invalid input (.silent()) | 105,137 (±22.77%) | 9.51 | 1.83 | 1.53 | 80,427 |
| required - defined valid input (pass, delegates to nested rule) | 12,976,253 (±11.41%) | 0.08 | 0.00 | 0.00 | 9,745,818 |
| required - undefined input (throws immediately) | 216,549 (±3.88%) | 4.62 | 1.72 | 0.00 | 163,476 |
| required - undefined input with a default (pass) | 10,461,391 (±23.86%) | 0.10 | 0.00 | 0.01 | 7,883,160 |
| stringReplace - string input (pass) | 5,902,129 (±17.94%) | 0.17 | 0.02 | 0.00 | 4,460,022 |
| stringReplace - null input (pass through unchanged) | 15,148,325 (±20.39%) | 0.07 | 0.01 | 0.00 | 11,461,824 |
| stringSplit - string input (pass) | 11,341,550 (±14.40%) | 0.09 | 0.01 | 0.00 | 8,513,248 |
| stringSplit - null input (pass through unchanged) | 7,003,409 (±34.34%) | 0.14 | 0.01 | 0.00 | 5,352,237 |
| trim - string input (pass) | 6,054,069 (±43.18%) | 0.17 | 0.02 | 0.00 | 4,575,600 |
| trim - null input (pass through unchanged) | 18,015,791 (±25.76%) | 0.06 | 0.01 | 0.00 | 13,554,000 |
| trimEnd - string input (pass) | 16,876,602 (±14.12%) | 0.06 | 0.01 | 0.00 | 12,686,324 |
| trimStart - string input (pass) | 5,726,966 (±25.58%) | 0.17 | 0.01 | 0.00 | 4,385,295 |
