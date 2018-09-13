react-native-scripts
====================

> A set of useful scripts to run when working on a large-scale React Native app in a brownfield environment.

## Available scripts

Please see the list below for a full breakdown of available scripts.

### register-react-native-modules

> Provides type-safety when loading modules registered inside React Native app

By running the following command:

```bash
$ yarn run register-react-native-modules ./index.js ./ RNConstants
```

the script will generate two files, `RNConstants.h` and `RNConstants.m` that contain constants describing
available modules from the Javascript side.

This script should be run automatically every time you run your app. Please see the next section for details on how to set it up.

#### Integration with XCode
