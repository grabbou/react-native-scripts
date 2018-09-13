react-native-scripts
====================

> A set of useful scripts to run when working on a large-scale React Native app in a brownfield environment.

## Available scripts

### app-registry-components-to-constants

Provides type-safety when referring to modules that `RCTRootView` should load. Referring to a module name that hasn't been registered on the Javascript side will result in a compile-time error.

