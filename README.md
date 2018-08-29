
![](/resources/logo/boros_logo.png)

# Boros CMP

[![Build status](https://travis-ci.org/scm-spain/CMP.svg?branch=master)](https://travis-ci.org/scm-spain/CMP)
[![codecov](https://codecov.io/gh/scm-spain/CMP/branch/master/graph/badge.svg)](https://codecov.io/gh/scm-spain/CMP)
[![GitHub license](https://img.shields.io/github/license/scm-spain/CMP.svg)](https://github.com/scm-spain/CMP/blob/master/LICENSE)

## Table of Contents

* [About](#about)
* [Features](#features)
* [Technical features](#technical-features)
* [License](#license)
* [Configuration](#configuration)
* [CMP version](#cmp-vesion)


## About
**Boros CMP** is a stand alone Consent Management Provider solution compliant with the "Transparency & Consent Framework" standard established by the [IAB Europe](http://advertisingconsent.eu/cmps).

![](/resources/logo/boros-cmp-id-129.png)

**Boros CMP** is registered with ID 129

## Features
* Open Source project
* Supports the [IAB specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework)
* Supports consent management for a single site or multiple sites from a single brand

## Technical features
* Developed in Javascript (ECMAScript 6)
* Supports local storage using single site cookie
* Supports global storage using multi site cookie via iframes

## License
CMP is [MIT licensed](./LICENSE).

## Configuration

## CMP version
CMP version is set according to the version defined inside the _package.json_ file. IAB standard uses only one number to define this version, so only the major version (first digit) will be used.