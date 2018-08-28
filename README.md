# Consent Management Provider (CMP)

[![Build status](https://travis-ci.org/scm-spain/CMP.svg?branch=master)](https://travis-ci.org/scm-spain/CMP) [![codecov](https://codecov.io/gh/scm-spain/CMP/branch/master/graph/badge.svg)](https://codecov.io/gh/scm-spain/CMP)

## License
CMP is [MIT licensed](./LICENSE).

## Install dependencies

```bash
npm install
```

## Tasks

###  Build

To generate the final distribution file of CMP application, run the following command:

```bash
npm run build-cmp
```

This command will generate a _pro_ (minified) version (cmp.pro.js) inside a cleaned _dist_ folder.

To generate the final distribution file of Global Storage application, run the following command:

```bash
npm run build-global
```

This command will generate a _pro_ (minified) version (global.pro.js) inside a cleaned _dist_ folder.

###  Dev

To generate a development distribution file of CMP application, run the following command:

```bash
npm run dev-cmp
```

This command will generate a _dev_ (bundle) version (cmp.dev.js) inside a cleaned _dist_ folder.

To generate a development distribution file of Global Storage application, run the following command:

```bash
npm run dev-global
```

This command will generate a _dev_ (bundle) version (global.dev.js) inside a cleaned _dist_ folder.

###  Tests

To check that everything is still ok:

```bash
npm test
```

###  Lint

This project follows standard code style rules proposed by Schisbted Spain, , to check them just run this command: 

```bash
npm run lint
```

## CMP version

CMP version is set according to the version defined inside the _package.json_ file. IAB standard uses only one number to define this version, so only the major version (first digit) will be used.
