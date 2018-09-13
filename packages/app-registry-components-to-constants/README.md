app-registry-components-to-constants
====================

> Provides type-safety when loading modules registered inside React Native app

## Installation

Run the following command from within your React Native project:

```bash
$ yarn add react-native app-registry-components-to-constants
```

then, 

```bash
$ react-native app-registry-components-to-constants --help
```

to verify it worked. 

If you don't see this command as a part of your React Native CLI, make sure it's either a dependency or dev dependency of your
project.

## Running

In order to generate constants, you have to run this command from your project root

```bash
$ react-native app-registry-components-to-constants ./index.js ./ios/HelloWorld
```

Once execution finishes, check `ios/HelloWorld` folder for newly created files. They will look similar to the following two samples, with different set of modules located in your case:

RNConstants.h
```objc
// This file has been auto-generated. Do not modify.

extern NSString * const FOO_MODULE
extern NSString * const BAR_MODULE
```

RNConstants.m
```objc
// This file has been auto-generated. Do not modify.

NSString* const FOO_MODULE = @"foo";

NSString* const BAR_MODULE = @"bar";
```

The above two files were generated from the following `index.js` file:
```js
import { AppRegistry } from 'react-native';

AppRegistry.registerComponent("foo", () => ...);
AppRegistry.registerComponent("bar", () => ...);
```

## Integrating with Xcode

By default this command generates two files, `RNConstants.h` and `RNConstants.m`. The name can be changed by providing `--name` option when executing.

After running this command for the first time, make sure to add two newly created files to your project workspace. That makes it possible to include them in the compilation steps and access constants that are defined within.

## Automating this process

By default, this command has to be run every time registered modules are changed. This can get a bit complicated, especially in the long-run. Alternatively, you can define a new `Run Script Phase` in your target `Build Settings` and run this script from there automatically before
compiling.

## Roadmap

- [ ] Automatically link newly created files instead of letting users to do so manually
- [ ] Support Android
- [ ] Provide out-of-the-box solution for running from Xcode
- [ ] Make destination optional, it's accessible from `rnpm` config
