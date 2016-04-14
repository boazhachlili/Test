'use strict'
// var webdriver = require('selenium-webdriver');

var Utils = {
    getTranslateCoords: function(element) {
        var deferred = protractor.promise.defer(),
            coords = null;

        element.getAttribute('transform').then(function(attr) {
            if(attr) {
                var value = attr.replace(/\s/g, ''),
                    parts = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(value);

                if(parts.length > 2) {
                    coords = {
                        x: parseInt(parts[1], 10),
                        y: parseInt(parts[2], 10)
                    };
                }
            }

            if(!coords) {
                throw "unable to get TranslateCoords for element: " + element;
            }
            else {
                deferred.fulfill(coords);
            }
        });

        return deferred;
    },

    getPathVector: function(path) {
        return path.getAttribute('d');
    },

    getObjectLength: function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                size++;
            }
        }

        return size;
    },

    loadUrl: function(url) {
        browser.get(url);
    },

    maximize: function() {
        browser.driver.manage().window().maximize();
    },

    waitForElement: function(locator) {
        browser.isElementPresent(locator).then(function(isPresent){
            expect(isPresent).toBe(true);
        });
    },

    executeFunction: function(fn) {
        return browser.executeScript(fn);
    },

    executeElementMethod: function(elementFinder, methodName) {
        if(methodName.indexOf('()') < 0) {
            methodName += '()';
        }
        return browser.executeScript("return arguments[0]." + methodName, elementFinder.getWebElement());
    },

    getBBox: function(elementFinder) {
        return this.executeElementMethod(elementFinder, 'getBBox');
    },

    clickDrag: function(startElement, stopElement) {
        expect(startElement.isPresent()).toEqual(true);
        expect(stopElement.isPresent()).toEqual(true);

        browser.actions()
            .mouseDown(startElement)
            .perform().then(function() {
                browser.sleep(1000).then(function() {
                    browser.actions()
                        .mouseMove(stopElement)
                        .mouseUp()
                        .perform();
                })
            });
        /*browser.actions()
            .dragAndDrop(startElement, stopElement)
            .perform();*/

        browser.sleep(5000);
    },

    copyToClipboard: function(isMouse) {
        if(!isMouse) {
            browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('c').keyUp(protractor.Key.CONTROL).perform();
        }
    },

    getClipboardText: function() {
        // browser.executeScript(function () {
        //     var element = document.createElement('input');
        //     element.setAttribute('id', 'customInput');
        //     //keep the input element visible, but positioned fixed to prevent interfering with other DOM elements
        //     element.setAttribute('style', 'position: fixed;');
        //     document.getElementsByTagName('body')[0].appendChild(element);
        //     element.focus();
        // });
        // var newInput = $("#customInput");
        // newInput.sendKeys(webdriver.Key.chord(webdriver.Key.CONTROL, "v"));
        // return newInput.getAttribute('value');
    },

    pasteFromClipboard: function(isMouse) {
        if(!isMouse) {
            browser.actions().keyDown(browser.Key.CONTROL).sendKeys('v').keyUp(browser.Key.CONTROL).perform();
        }
    }
};

module.exports = Utils;