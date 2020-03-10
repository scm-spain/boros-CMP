![](/resources/logo/boros_logo.png)

# Boros CMP

[![Build status](https://travis-ci.org/scm-spain/Boros-CMP.svg?branch=master)](https://travis-ci.org/scm-spain/Boros-CMP)
[![codecov](https://codecov.io/gh/scm-spain/Boros-CMP/branch/master/graph/badge.svg)](https://codecov.io/gh/scm-spain/Boros-CMP)
[![GitHub license](https://img.shields.io/github/license/scm-spain/Boros-CMP.svg)](https://github.com/scm-spain/Boros-CMP/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@adv-ui/boros-cmp.svg)](https://www.npmjs.com/package/@adv-ui/boros-cmp)

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
* Stand alone project (without User Interface). We also developed a [User Interface](https://github.com/SUI-Components/sui-components/tree/master/components/cmp/banner) and a [bundle project](https://github.com/scm-spain/BorosJS) including UI + CMP
* Have a look at our [CMP Showcase](https://github.com/scm-spain/cmp-showcase) and try Boros

## Technical features
* Importable as a library from NPM.
* Developed in Javascript (ECMAScript 6) using Promises and Events
* We :heart: Domain Driven Design
* Supports local storage using single site cookie
* Supports global storage using multi site cookie via iFrames

## Usage

**Boros CMP** is available as [npm](https://www.npmjs.com/package/@adv-ui/boros-cmp) package named **@adv-ui/boros-cmp**.

To install the last stable version:

```bash
npm install --save @adv-ui/boros-cmp
```

To initialize Boros CMP using [default configuration](#configuration-properties-and-default-values) values:

```javascript
import boroscmp from '@adv-ui/boros-cmp'

boroscmp.init()
    .then(()=>{
        // do your stuff ...
    })
```

To initialize Boros CMP using customized configuration values:

```javascript
import boroscmp from '@adv-ui/boros-cmp'

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

boroscmp.init({config: customConfig})
    .then(()=>{
        // do your stuff ...
    })
```

Notice that **init** method is returning a _Promise_ but you can subscribe to *cmpReady* event instead:
```javascript
import boroscmp from '@adv-ui/boros-cmp'

window.document.addEventListener("cmpReady", (event) => {
  // do your stuff ...
  // like calling window.__cmp( ...
})

boroscmp.init()

```

**You could also import directly the library instead the bundled version.** By using this, it will assume you're providing the @babel/runtime dependency, helpers and polyfills needed to get it working but it will give you a better size by reusing your packages.

```javascript
import boroscmp from '@adv-ui/boros-cmp/lib'

boroscmp.init()
  .then(()=>{
    // do your stuff ...
  })
```

#### Initialize Boros cmp global version

Boros should be initialized with at least this custom configuration
```javascript
import boroscmp from '@adv-ui/boros-cmp'

const customConfig = {
  gdpr: {
    storeConsentGlobally: true,
    globalConsentLocation: 'http://local.schibsted.io:8000/index.html'
  }
}

boroscmp.init({config: customConfig})
    .then(()=>{
        // do your stuff ...
    })
```

In the globalConsentLocation provided, a server should be running and it should have the boros script builded for global version on it (global.dev.js or global.pro.js).

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
This language will be used by the User interface using CMP. Language values are _ISO 639-1_ (2 letter codes).
By default, *es* will be used.

Check the available translations here: <https://register.consensu.org/Translation>

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

## CMP version
CMP version is set according to the version defined inside the _package.json_ file. IAB standard uses only one number to define this version, so only the major version (first digit) will be used.

## License
CMP is [MIT licensed](./LICENSE).
