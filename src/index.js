#!/usr/bin/env node

/**
 * Copyright © 2018 Callstack
 * All rights reserved
 *
 * Analyses given Javascript file for `AppRegistry` calls and registers
 * all used module names as constants on iOS in order to provide
 * type safety when working at a large scale application.
 */

const fs = require('fs');
const constantCase = require('constant-case');
const dedent = require('dedent');

const parser = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');

if (process.argv.length !== 5) {
	console.log(dedent`
    Too few arguments.

    This command expects three arguments in the following order:
     * source file to look for React Native modules, as a path to .js file
     * destination folder to place iOS files
     * base name for the files to be created

     Example:
     ./test/fixtures/file.js ~/Desktop RNConstants
	`);

	process.exit(1);
}

const [sourcePath, destination, name] = process.argv.slice(2);

const code = fs.readFileSync(sourcePath, {
	encoding: 'utf8',
});

const ast = parser.parse(code, {
	plugins: ['jsx', 'flow'],
});

const availableModules = [];

traverse(ast, {
	MemberExpression({ node, parent }) {
		if (
			`${node.object.name}.${node.property.name}` ===
			'AppRegistry.registerComponent'
		) {
			availableModules.push({
				name: `${constantCase(parent.arguments[0].value)}_MODULE`,
				value: parent.arguments[0].value,
			});
		}
	},
});

fs.writeFileSync(
	`${destination}/${name}.h`,
	`
// This file has been auto-generated. Do not modify.

${availableModules
		.map(module => `extern NSString * const ${module.name}`)
		.join('\n\n')}
`
);

fs.writeFileSync(
	`${destination}/${name}.m`,
	`
// This file has been auto-generated. Do not modify.

${availableModules
		.map(module => `NSString* const ${module.name} = @"${module.value}";`)
		.join('\n\n')}
`
);
