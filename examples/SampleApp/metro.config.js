const { getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { getMetroAndroidAssetsResolutionFix} = require('react-native-monorepo-tools');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');
const androidAssetsResolutionFix=getMetroAndroidAssetsResolutionFix();

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const customConfig = {
  resolver: {
    extraNodeModules: {
      '@cometchat/chat-uikit-react-native': path.resolve(__dirname, '../../packages/ChatUiKit'),
    },
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'), 
    ],
    blacklistRE: exclusionList([
      // Ignore the node_modules inside the symlinked package
      new RegExp(`${path.resolve(__dirname, '../../packages/ChatUiKit/node_modules').replace(/[/\\]/g, '\\$&')}.*`),
    ]),
  },
  watchFolders: [
        // Watch the chat-ui-kit directory
        path.resolve(__dirname, '../../packages/ChatUiKit'),
        //required to detect node_modules
        path.resolve(__dirname, '../../node_modules'),
  ],
  transformer: {
    publicPath: androidAssetsResolutionFix.publicPath,
  },
  server: {
    enhanceMiddleware: (middleware) => {
      return androidAssetsResolutionFix.applyMiddleware(middleware);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), customConfig);
