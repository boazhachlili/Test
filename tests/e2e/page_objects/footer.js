'use strict';
var utils = require('../utils.js');

var Footer = function() {
    var me = this;
    this.annotationLayersPopover = {
        buttons: {
            restrictionSites: element(by.css('footer .row.restriction-sites .annotation-popover-checkbox')),
            compliment: element(by.css('footer .row.compliment .annotation-popover-checkbox')),
            aminoAcid: element(by.css('footer .row.amino-acid .annotation-popover-checkbox')),
            orf: element(by.css('footer .orf .row.annotation-popover-checkbox')),
            features: element(by.css('footer .row.features .annotation-popover-checkbox')),
            bpIndex: element(by.css('footer .row.bp-index .annotation-popover-checkbox'))
        },
        layerElement: element(by.css('footer .annotation-popover-container')),
        layerTriggerElement: element(by.css('footer .btn-annotation')),
        open: function() {
            var deferred = protractor.promise.defer();
            browser.isElementPresent(me.annotationLayersPopover.layerElement).then(function(isPresent) {
               if(!isPresent) {
                   utils.waitForElement(me.annotationLayersPopover.layerTriggerElement);
                   me.annotationLayersPopover.layerTriggerElement.click();
                   utils.waitForElement(me.annotationLayersPopover.layerElement);
                   deferred.fulfill();
               }
            });

            return deferred;
        },
        toggleLayer: function(layerName, showLayer) {
            var deferred = protractor.promise.defer(),
                button = this.buttons[layerName];

            this.open().then(function() {
                if(!button) {
                    throw "Footer toggleLayer() error: invalid layerName '"+layerName+"'";
                }
                button.getAttribute('class').then(function(classList) {
                    if( (showLayer && classList.indexOf('glyphicon-unchecked') > -1) ||
                        (!showLayer && classList.indexOf('glyphicon-checked') > -1)) {

                        me.annotationLayersPopover.open();
                        //KNOWN protractor BUG in Chrome: secondary clicks do not work!
                        //see this - https://github.com/angular/protractor/issues/2360
                        //as a temporary fix, we clear localStorage with each call to viewer.loadFile()
                        //to start with compliment layer hidden
                        button.click().then(function() {
                            browser.sleep(1000).then(function() {
                                deferred.fulfill();
                            });
                        });
                    }
                });
            });

            return deferred;
        }
    };
};

module.exports = Footer;