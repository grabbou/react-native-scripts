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
