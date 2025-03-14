# v5.13.1
[2025-03-14]

### Fixes

* fix: Fixed validation of Date, Buffer and ArrayBuffer objects of isEmpty and isNotEmpty rules ([`24992b8`](https://github.com/panates/valgen/commit/24992b845f229c8cd1e5d0049704e6c99bf5a6be))
* fix: Fixed validation of Date, Buffer and ArrayBuffer objects of isEmpty and isNotEmpty rules ([`37681bf`](https://github.com/panates/valgen/commit/37681bf88f5c0adf4f102856791b0b3a547aea74))

### Changes

* chore: Removed Node 16 tests ([`606e01a`](https://github.com/panates/valgen/commit/606e01abb6cefd11e0dfdc6a20cb4e26371bb6e9))

# v5.13.0
[2025-02-03]

### Changes

* refactor: Updated dependencies ([`dca11c1`](https://github.com/panates/valgen/commit/dca11c1d094daca39974bbc9c70b8f30480c4d0a))
* refactor: Changed error messages to "positive sentences" ([`3b746df`](https://github.com/panates/valgen/commit/3b746df70ab0e25e32e3f5b957f1c24f3f0fcc70))
* chore: Updated github workflow ([`661738f`](https://github.com/panates/valgen/commit/661738f1fd90eed72ec2718e67159a8ab614e65e))
* dev: Fixed ts config ([`e3251ce`](https://github.com/panates/valgen/commit/e3251ce7776de3bd4afeb0c2d0ed5d19f6aabd4f))
* dev: Added missing script ([`dd019d9`](https://github.com/panates/valgen/commit/dd019d923f8305462e27cad1745564071c9c34bb))

# v5.12.0
[2024-11-04]

### Changes

* refactor: Move from 'validator' library to "@browsery/validator" for ESM compatibility ([`5a0d1bd`](https://github.com/panates/valgen/commit/5a0d1bd499581c80033b063942247fe550930dec))

# v5.11.0
[2024-11-04]

### Changes

* nit: Updated dependencies ([`f348c6c`](https://github.com/panates/valgen/commit/f348c6c52cb8efa9716e36d96e233fdbda605cec))

# v5.10.0
[2024-09-14]

### Changes

* chore: Moved from circleci to github actions ([`179e630`](https://github.com/panates/valgen/commit/179e630a1b1327acf995decb88ed86b015a48c6a))
* fixed: Circular imports ([`f2a83b9`](https://github.com/panates/valgen/commit/f2a83b9f466f1bc5acaabef3ac78f6c567ed7b54))

# v5.9.0
[2024-08-20]

### Changes

* Fixed compatibility for "Node16" and "NodeNext" moduleResolution options ([`9985ad6`](https://github.com/panates/valgen/commit/9985ad68ded7ddd62a630fbb54fd4f25a405cb62))

# v5.8.2
[2024-08-12]

### Changes

* Applied publint to check package.json ([`cbb7553`](https://github.com/panates/valgen/commit/cbb7553eb841f43f333ebbe6ba39977009148e6e))

# v5.8.1
[2024-08-12]

### Changes

* Applied publint to check package.json ([`cf051f4`](https://github.com/panates/valgen/commit/cf051f4fe5944698fda111fdf6efa059eba11309))

# v5.8.0
[2024-08-12]

### Changes

* Rollback to ES2020 ([`bb198c6`](https://github.com/panates/valgen/commit/bb198c61aa1b30d83e561d24ebfa4fdb2be1559e))

# v5.7.0
[2024-08-09]

### Changes

* Made ready for Node16 moduleResolution ([`fc45964`](https://github.com/panates/valgen/commit/fc459640c49c4125e5e5047a60a83ae8ab05db23))

# v5.6.0
[2024-07-14]

### Changes

* Added isNotNull and isNotNullish rules ([`19902a5`](https://github.com/panates/valgen/commit/19902a5e2a12f1958952671ffce6e2eab77457a5))
* Added isNotNull and isNotNullish rules ([`ff881d6`](https://github.com/panates/valgen/commit/ff881d6be81068c70e020109485b91854c355598))

# v5.5.0
[2024-07-14]

### Changes

* Moved eslint config to @panates/eslint-config ([`c2f3e2d`](https://github.com/panates/valgen/commit/c2f3e2dfec484fe891de3b519b7f26779c451b43))
* Changed error message ([`3edf948`](https://github.com/panates/valgen/commit/3edf948a674d11a4ff5efcb97ca255b0723a11ca))
* Removed coercing of isNull and isNullish rules ([`4337d0a`](https://github.com/panates/valgen/commit/4337d0a4bd148718f33f744257b13afdd5c3ac50))
* Now pipe can return original input value when returnIndex = -1 ([`baf698c`](https://github.com/panates/valgen/commit/baf698c289254743d70ef815188f2300d7230f00))

# v5.4.1
[2024-05-18]

### Changes

* Exposed toBigint ([`50ad810`](https://github.com/panates/valgen/commit/50ad8101d58619c92d134059564a4cbaa575f5de))

# v5.4.0
[2024-05-18]

### Changes

* Added returnIndex to pipe() ([`87458ad`](https://github.com/panates/valgen/commit/87458adb3eb6a4465c8198f942df1fbb333738ff))
* Updated circleci config ([`101361c`](https://github.com/panates/valgen/commit/101361c20f1b78a75392b9e796bc9075b492cb3e))

# v5.3.2
[2024-05-18]

### Changes

* Updated dependencies ([`9e618ab`](https://github.com/panates/valgen/commit/9e618ab5062b106a7321ef50beac0cd0ccf7e56c))
* Fixed coveralls token ([`ede2734`](https://github.com/panates/valgen/commit/ede27343a163ef6649866fedb141598518d6e1c3))

# v5.3.1
[2024-05-18]

### Changes

* Reorganized many rules ([`e470fe7`](https://github.com/panates/valgen/commit/e470fe7b99dc23378253c6e549d1df7c219fbbc9))
* Updated code documentation ([`81e7ccf`](https://github.com/panates/valgen/commit/81e7ccf145075a0649cb7281062f422cd989dfa3))
* Fixed rule name ([`73d90d1`](https://github.com/panates/valgen/commit/73d90d14314d6d98d089c60134f05d651a2e4b0f))

# v5.3.0
[2024-05-06]

### Changes

* Added validation generation option to enable coercing by default. ([`5b012ee`](https://github.com/panates/valgen/commit/5b012ee21b89e601ebb7d9f624d93042862da8ca))

# v5.2.2
[2024-03-29]

### Changes

* Updated dependencies ([`9d9af6f`](https://github.com/panates/valgen/commit/9d9af6fadeece926a8ec1bc93d14ffc7ace625d0))
* Updated dependencies ([`636ce75`](https://github.com/panates/valgen/commit/636ce759e83e765661e7c5c8730c6b824076d344))

# v5.2.1
[2024-03-27]

### Changes

* Updated dependencies ([`117bab5`](https://github.com/panates/valgen/commit/117bab58f731c1572959668dd4d6fca36d779433))

# v5.2.0
[2024-01-04]

### Changes

* Now validator options persist in context ([`418901f`](https://github.com/panates/valgen/commit/418901f74ee266d84e50ee82ba5a7221bd2be627))

# v5.1.0
[2023-12-23]

### Changes

* Moved from "dayjs" to "date-fns" ([`fd240af`](https://github.com/panates/valgen/commit/fd240afe3cdbb7485695d204aa25b9bf62ad315a))

# v5.0.1
[2023-12-23]

### Changes

* Added new rules ([`ddcab7c`](https://github.com/panates/valgen/commit/ddcab7c54c287a9ec839c04302faa6b3bf5e554d))
* Moved all validator factories into "factories" namespace, ([`2ac5abd`](https://github.com/panates/valgen/commit/2ac5abd7f2097de4ec769bcc55034636142ee598))

# v5.0.0
[2023-12-21]

### Changes

* Moved all validator factories into "factories" namespace, ([`e93dddd`](https://github.com/panates/valgen/commit/e93dddd7aa3aa3bcdfbf9fa1615f9504fbff7e6f))

# v4.3.2
[2023-12-08]

### Changes

* Updated dependenices ([`a539d1b`](https://github.com/panates/valgen/commit/a539d1b6d2d3629174e3d14efee58aacb4e6730a))
* Pass "_this" parameter to preValidation and postValidation methods ([`bdb6a97`](https://github.com/panates/valgen/commit/bdb6a97ed50b538fad97ed1fb2161f8665647214))

# v4.3.1
[2023-12-04]

### Changes

* Made preValidation and postValidation static ([`71fa530`](https://github.com/panates/valgen/commit/71fa53050428fc937dcdda24cb9a43baf0f2d384))

# v4.3.0
[2023-12-02]

### Changes

* Updated dependencies ([`4ff01f0`](https://github.com/panates/valgen/commit/4ff01f0f52c7efeab0c3e154946ba32d1cf04e86))
* Added [preValidation] and [postValidation] to isObject rule ([`2f8351d`](https://github.com/panates/valgen/commit/2f8351d10fd1a9cc78577c52b37681319f3d28b2))

# v4.2.5
[2023-11-27]

### Changes

* Fixed isArray error location property. ([`b42ca30`](https://github.com/panates/valgen/commit/b42ca300c9c5a68685a70a9cff895e9ad97eb650))

# v4.2.4
[2023-11-20]

### Changes

* Added json parsing feature to isObject validator ([`0cd128a`](https://github.com/panates/valgen/commit/0cd128ab8bae6e834230004c4b7bf857ce67b76f))

# v4.2.3
[2023-11-20]

### Changes

* Optimized error messages ([`21e29dc`](https://github.com/panates/valgen/commit/21e29dc2eff846fbeccb7737ffe41496bca583c5))

# v4.2.2
[2023-11-15]

### Changes

* Changed "trim" option ([`b5eff4f`](https://github.com/panates/valgen/commit/b5eff4ffd61eb78ea244dfe2c66ca86275b9578c))

# v4.2.1
[2023-11-15]

### Changes

* Fixed generating invalid date string ([`6407ac6`](https://github.com/panates/valgen/commit/6407ac6bd17bf84a8d031efe9b3998d58c5b7f8b))

# v4.2.0
[2023-11-15]

### Changes

* Removed "format" option and added "precision" option to isDate validator ([`2e332a6`](https://github.com/panates/valgen/commit/2e332a6fb9907e0b50f98a6dbcbbdfb3764af867))
* Added test for "label" option ([`162f41a`](https://github.com/panates/valgen/commit/162f41ac36762a146718c3efc4784bb33f48c955))

# v4.1.0
[2023-10-31]

### Changes

* Updated validation messages. ([`066fc4e`](https://github.com/panates/valgen/commit/066fc4e0f9fc7a0c0543572cf543c66084611135))

# v4.0.1
[2023-10-24]

### Changes

* Added "coerce" option to isNull and isUndefined rules ([`8c02040`](https://github.com/panates/valgen/commit/8c02040264174e26c840fce351da8b69e664d626))

# v4.0.0
[2023-08-17]

### Changes

* Initial release of v4.0.0-alpha.1 ([`499af8e`](https://github.com/panates/valgen/commit/499af8eed81feeacb4bba5c254fbf1ede3933564))
* Implemented all initial validators and tests ([`0ff5c5c`](https://github.com/panates/valgen/commit/0ff5c5c28aa59b44de90d016e8c056c26b3b479d))
* Updated dependencies ([`804e00c`](https://github.com/panates/valgen/commit/804e00c3fcf344f4dcdb96efe0fc94ea3521cb92))
* Better error handling ([`91dae2f`](https://github.com/panates/valgen/commit/91dae2f260f1d02ff5ed418f3247b452c1fed214))
* Updated deps ([`df1cb70`](https://github.com/panates/valgen/commit/df1cb700a3799f09305af774c05ca534e5f88870))
* Added isBigint validator ([`87ba007`](https://github.com/panates/valgen/commit/87ba00753dc018a4bd06492ec99fa37967046c58))
* Fixed isObject coerce issue ([`47c7d4e`](https://github.com/panates/valgen/commit/47c7d4ed2d0e483788e939b357995a156ac3b7bc))
* Improved isDateString ([`59d0d14`](https://github.com/panates/valgen/commit/59d0d14909132a502a9880cc11b9303897a3c79a))
* Updated dayjs ([`e212dd2`](https://github.com/panates/valgen/commit/e212dd2834a07015fcceede3bf211f2a9db11eb6))
* Updated deps ([`d20588e`](https://github.com/panates/valgen/commit/d20588eaa51be7547655d3494bb42e35cb6effa8))
* Updated deps ([`82a2c0d`](https://github.com/panates/valgen/commit/82a2c0dc36c9cc54667231e88dfec6521097a157))
* Fixed isObject coerce issue ([`b79833b`](https://github.com/panates/valgen/commit/b79833ba032494a18a91b1569da2d244f3c4c4b9))
