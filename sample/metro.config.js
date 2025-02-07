const path = require('path');
const pkg = require('../package.json');
const { getConfig } = require('react-native-builder-bob/metro-config');
const { makeMetroConfig } = require('@rnx-kit/metro-config');

const root = path.resolve(__dirname, '..');
const projectRoot = __dirname;

// const a = getDefaultConfig(__dirname);
const a = makeMetroConfig({
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = getConfig(
  {
    ...a,
    resolver: {
      ...a.resolver,
      // Maybe this is not nescessary, but react-native versions are differents
      // so maybe its causing issues
      nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],
    },
  },
  {
    root,
    pkg,
    project: __dirname,
  }
);
