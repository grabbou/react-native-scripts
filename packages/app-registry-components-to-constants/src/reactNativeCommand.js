/**
 * Copyright © 2018 Callstack
 * All rights reserved
 */

const fs = require('fs');
const constantCase = require('constant-case');
const dedent = require('dedent');

const findModules = require('./findModules');

module.exports = [
  {
    name: 'app-registry-components-to-constants <entry_point> <destination>',
    description:
      'Provides type-safety when loading modules registered inside React Native app',
    examples: [
      {
        desc: 'Create iOS constants from registered components',
        cmd:
          'react-native app-registry-components-to-constants ./app/index.js ./ios/HelloWorld/',
      },
    ],
    func: ([entryPoint, destination], config, options) => {
      if (options.platform !== 'ios') {
        throw new Error(
          `The ${
            options.platform
          } is currently not supported. Consider sending a PR.`
        );
      }

      const modules = findModules(entryPoint).map(value => ({
        value,
        name: `${constantCase(value)}_MODULE`,
      }));

      fs.writeFileSync(
        `${destination}/${options.name}.h`,
        dedent`
          // This file has been auto-generated.
          // Run "react-native app-registry-components-to-constants" to update.

          ${modules
            .map(module => `extern NSString * const ${module.name};`)
            .join('\n\n')}
      `
      );

      fs.writeFileSync(
        `${destination}/${options.name}.m`,
        dedent`
          // This file has been auto-generated.
          // Run "react-native app-registry-components-to-constants" to update.

          ${modules
            .map(
              module => `NSString* const ${module.name} = @"${module.value}";`
            )
            .join('\n\n')}
          `
      );
    },
    options: [
      {
        command: '--platform [string]',
        description: 'Specifies a platform to output',
        default: 'ios',
        parse: val => val.toLowerCase(),
      },
      {
        command: '--name [string]',
        description: 'Specifies a name for the constants file',
        default: 'RNConstants',
      },
    ],
  },
];
