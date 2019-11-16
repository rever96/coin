const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const webpack = resources.webpack;

const PACKAGE_NAME = require('./package.json').name;

module.exports = resources.createServeConfig({
  entry: './src/demo/index.tsx',

  output: {
    filename: 'demo-app.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      '@uifabric/foundation-scenarios/src': path.join(__dirname, 'src'),
      '@uifabric/foundation-scenarios/lib': path.join(__dirname, 'src'),
      '@uifabric/foundation-scenarios': path.join(__dirname, 'src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
