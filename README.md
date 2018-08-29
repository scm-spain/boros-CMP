
![](/resources/logo/boros_logo.png)

# Boros CMP

[![Build status](https://travis-ci.org/scm-spain/CMP.svg?branch=master)](https://travis-ci.org/scm-spain/CMP)
[![codecov](https://codecov.io/gh/scm-spain/CMP/branch/master/graph/badge.svg)](https://codecov.io/gh/scm-spain/CMP)
[![GitHub license](https://img.shields.io/github/license/scm-spain/CMP.svg)](https://github.com/scm-spain/CMP/blob/master/LICENSE)

## Table of Contents

* [About](#about)
* [Features](#features)
* [Technical features](#technical-features)
* [Configuration](#configuration)
* [Usage](#usage)
* [CMP version](#cmp-vesion)
* [License](#license)


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

## Usage

Boros CMP is available as the @schibstedspain/boros-cmp package on [npm](https://www.npmjs.com/package/@schibstedspain/boros-cmp).

To install the last stable version:

```bash
npm install --save @schibstedspain/boros-cmp
```

To initialize Boros CMP using default configuration values:

```javascript
import boroscmp from '@schibstedspain/boros-cmp'

boroscmp.context({window})
```

To initialize Boros CMP using customized configuration values:

```javascript
import boroscmp from '@schibstedspain/boros-cmp'

const customConfig = {
  gdpr: {
    gdprApplies: true,
    storeConsentGlobally: false
  },
  consent: {
    consentScreen: 1,
    consentLanguage: 'es'
  }
}

boroscmp.context({window, config: customConfig})
```

## Configuration

There are some default configuration values that can be overwritten before CMP is loaded. Following you will find all the configuration properties and their default values.

### Configuration Properties and default Values

|Property|Description|Default Value|
|---|---|---|
|gdpr.gdprApplies|Defines if GDPR applies or not.|true|
|gdpr.storeConsentGlobally|Defines if Consent Storage is Global (true) or Local (false).|false|
|gdpr.globalConsentLocation|The source URL of global storage html.||
|consent.consentScreen|Screen number where consent was given.|1|
|consent.consentLanguage|Defines the language for the UI.|es|
|vendorList.host|Host URL to retrieve Vendor lists.|https://vendorlist.consensu.org|
|log.level|Defines the Log level.|3|

#### gdpr.gdprApplies
Defines if GDPR applies or not.

#### gdpr.storeConsentGlobally
Defines if Consent Storage is Global (true) or Local (false).

#### gdpr.globalConsentLocation
The source URL of global storage html.

#### consent.consentScreen
Defines the Screen number in the CMP where consent was given. The screen number is CMP and CmpVersion specific, and is for logging proof of consent

#### consent.consentLanguage
This language will be used by the User interface using CMP. Language values are _ISO 639-1_ codes, like:

|Code|Language|Observations|
|---|---|---|
|es|Spanish|Default|
|en|English|Not available yet|


#### vendorList.host
To find Vendor lists, CMP tries to retrieve a JSON named _vendorlist.json_ and uses the IAB version structure, as follows:
* Latest Vendor list: https://vendorlist.consensu.org/vendorlist.json
* Specific Vendor list version: https://vendorlist.consensu.org/v-${vendorListVersion}/vendorlist.json
    * where _${vendorListVersion}_ is the specific version to retrieve. For example: https://vendorlist.consensu.org/v-2/vendorlist.json

#### log.level
Available log level values:

|Code|Level|
|---|---|
|1|debug|
|2|info|
|3|warn|
|4|error|
|5|off|


### How to set custom values to configuration properties

When CMP initializes it search for a config at *window.__cmp.config* if it is not present CMP uses the default values.

To set custom values to configuration properties just set *window.__cmp.config* before loading CMP as follows:
```javascript
window.__cmp.config = {
    "gdpr": {
        "gdprApplies": true,
        "storeConsentGlobally": false,
        "globalConsentLocation": "./global.html"
    },
    "consent": {
        "consentScreen": 1,
        "consentLanguage": "es"
    },
    "vendorList": {
        "host": "https://vendorlist.consensu.org"
    },
    "log": {
        "level": 1
    }
 }
```

## CMP version
CMP version is set according to the version defined inside the _package.json_ file. IAB standard uses only one number to define this version, so only the major version (first digit) will be used.

## License
CMP is [MIT licensed](./LICENSE).