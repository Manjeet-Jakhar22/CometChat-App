const { getDefaultConfig } = require("@expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Monorepo-specific overrides
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "@cometchat/chat-uikit-react-native": path.resolve(
    __dirname,
    "../../packages/ChatUiKit"
  ),
};

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(__dirname, "../../node_modules"),
];

config.resolver.blacklistRE = exclusionList([
  new RegExp(
    `${path
      .resolve(__dirname, "../../packages/ChatUiKit/node_modules")
      .replace(/[/\\]/g, "\\$&")}.*`
  ),
]);

// Critical asset resolution fixes
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs"];
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

config.watchFolders = [
  path.resolve(__dirname, "../../packages/ChatUiKit"),
  path.resolve(__dirname, "../../node_modules"),
];

module.exports = config;
