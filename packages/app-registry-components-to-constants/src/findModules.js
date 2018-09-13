const fs = require('fs');

const parser = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');

module.exports = entryPoint => {
  const code = fs.readFileSync(entryPoint, {
    encoding: 'utf8',
  });

  const ast = parser.parse(code, {
    plugins: ['jsx', 'flow'],
    sourceType: 'module',
  });

  const availableModules = [];

  traverse(ast, {
    MemberExpression({ node, parent }) {
      if (
        `${node.object.name}.${node.property.name}` ===
        'AppRegistry.registerComponent'
      ) {
        availableModules.push(parent.arguments[0].value);
      }
    },
  });

  return availableModules;
};
