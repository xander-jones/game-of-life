const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const { BugsnagSourceMapUploaderPlugin } = require("webpack-bugsnag-plugins");
const packageInfo = require("./package.json");

module.exports = merge(common, {
    plugins: [
        new BugsnagSourceMapUploaderPlugin({
            apiKey: "97ef27a04c69ae72307ba2a3b7168b5b",
            appVersion: packageInfo.version,
            overwrite: true,
            publicPath: "*",
            ignoreBundleExtensions: [".html"]
        }),
    ]
});