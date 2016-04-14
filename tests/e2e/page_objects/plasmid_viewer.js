'use strict';
var SequenceView = require('./sequence_view.js'),
    CircularView = require('./circular_view.js'),
    Header = require('./header.js'),
    Footer = require('./footer.js'),
    defaultHeight = 768;

var PlasmidViewer = function(env) {
    try {
        var utils = GLOBAL.gc.utils,
            hosts = browser.params.hosts,
            filesHost = browser.params.filesHost;

        if(typeof(env) !== 'string' || browser.params.hosts[env] == undefined) {
            throw 'invalid env parameter (' + env + ')';
        }

        this.host = hosts[env];
        this.sequenceView = new SequenceView();
        this.circularView = new CircularView();
        this.header = new Header(this);
        this.footer = new Footer(this);
        console.log('created PlasmidViewer instance for ' + env + ' environment');
    }
    catch (ex) {
        throw 'PlasmidViewer constructor error: ' + ex;
    }

    this.switchTab = function(tabIndex) {
        var deferred = protractor.promise.defer();

        browser.getAllWindowHandles().then(function (handles) {
            var handle = handles[tabIndex]; // this is your new window
            browser.switchTo().window(handle).then(function () {
                deferred.fulfill();
            });
        });

        return deferred;
    };

    this.closeCurrentTab = function() {
        return browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('w').perform();
    };

    this.loadFile = function(file, noWait) {
        var url = this.host + '?file_url=' + filesHost + '/' + file;
        utils.loadUrl(url);

        //clearing localStorage here to solve an issue with mouse clicks and annotationsLayerPopover not toggling layers
        //(see comments in footer.js)
        browser.executeScript('window.localStorage.clear();').then(function() {
            if(!noWait) {
                utils.waitForElement(by.css('svg.sequence-svg'));
                utils.waitForElement(by.id('p1'));
            }
        });
    };

    this.resizeWindow = function(width, height) {
        height = height || defaultHeight;
        return browser.manage().window().setSize(width, height);
    };
};

module.exports = PlasmidViewer;