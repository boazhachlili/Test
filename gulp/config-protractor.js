/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

module.exports = function configProtractor() {

    var extend = require('node.extend');
    var gulp = require('gulp');
    var protractorUtils = require('wt-protractor-utils');

    var browserstack = extend(true /* Deep copy. */, {}, protractorUtils.platform.browserstack);

    var protractorBaseConfig = {
        specs: __dirname + '/../tests/e2e/main.spec.js'
    };

    browserstack.capabilities['browserstack.user'] = process.env.BROWSERSTACK_USER;
    browserstack.capabilities['browserstack.key'] = process.env.BROWSERSTACK_KEY;

    return {
        params: {
            filesHost: 'http://104.196.28.106/download/e2e',
            environment: "dev", //TODO: this should be a CLI parameter
            hosts: {
                dev: 'http://localhost:3000/plasmid_viewer',
                test: 'http://104.196.28.106/plasmid_viewer',
                stg: 'http://designer.genomecompiler.com:3000/plasmid_viewer',
                prd: 'https://designer.genomecompiler.com/plasmid_iframe'
            }
        },

        directConnect: true,

        onPrepare: function() {
            return browser.getCapabilities().then(function (cap) {
                browser.browserName = cap.caps_.browserName;
            });
        },

        configList: [
            /* OS X / Chrome. */
            protractorUtils.mergeConfig({
                configList: [
                    protractorBaseConfig,
                    browserstack,
                    protractorUtils.os.osx,
                    protractorUtils.browser.chrome
                ]
            }),
            /* OS X / Safari. */
            protractorUtils.mergeConfig({
                configList: [
                    protractorBaseConfig,
                    browserstack,
                    protractorUtils.os.osx,
                    protractorUtils.browser.safari
                ]
            }),
            /* Windows / Chrome. */
            protractorUtils.mergeConfig({
                configList: [
                    protractorBaseConfig,
                    browserstack,
                    protractorUtils.os.windows,
                    protractorUtils.browser.chrome
                ]
            }),
            /* Windows / Internet Explorer. */
            protractorUtils.mergeConfig({
                configList: [
                    protractorBaseConfig,
                    browserstack,
                    protractorUtils.os.windows,
                    protractorUtils.browser.internetExplorer
                ]
            }),
            /* Android. */
            protractorUtils.mergeConfig({
                configList: [
                    protractorBaseConfig,
                    browserstack,
                    protractorUtils.os.android
                ]
            }),
            /* iPad. */
            protractorUtils.mergeConfig({
                configList: [
                    protractorBaseConfig,
                    browserstack,
                    protractorUtils.device.iPad
                ]
            }),
            /* iPhone. */
            protractorUtils.mergeConfig({
                configList: [
                    protractorBaseConfig,
                    browserstack,
                    protractorUtils.device.iPhone
                ]
            })
        ]
    };

};
