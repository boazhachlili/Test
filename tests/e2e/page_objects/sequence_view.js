'use strict';
var utils = require('../utils.js'),
    webdriver = require('selenium-webdriver');

//TODO: refactor this class to be a singleton (self invoking function)
//      this will simplify private, public variables and make the API more readable as a returned object at the bottom of the file
var SequenceView = function() {
    this.sequence = {
        getSequenceContainer: function() {
            return element(by.css('.sequence-svg-container'));
        },
        getSequenceLayerAt: function(rowIndex) {
            rowIndex = rowIndex || 0;
            return element.all(by.css('g.sequence-group')).get(rowIndex);
        },
        getSequenceLayerTextAt: function(rowIndex) {
            return this.getSequenceLayerAt(rowIndex).element(by.css('.sequence-text')).getAttribute('text');
        },
        getSequenceLayerTextNodeAt: function(rowIndex) {
            return this.getSequenceLayerAt(rowIndex).element(by.css('.sequence-text'));
        },
        getFontSize: function(rowIndex) {
            rowIndex = rowIndex || 0;
            return this.getSequenceLayerTextNodeAt(rowIndex).getAttribute('font-size');
        }
    };

    this.bpIndex = {
        getAt: function(rowIndex) {
            return element.all(by.css('.pb-group')).get(rowIndex);
        },
        getLineMarkers: function(rowIndex) {
            return this.getAt(rowIndex).all(by.css('line'));
        },
        getDigitMarkers: function(rowIndex) {
            return this.getAt(rowIndex).all(by.css('text'));
        },
        getFontFamily: function(rowIndex) {
            var deferred = protractor.promise.defer();

            this.getDigitMarkers(rowIndex).then(function(markers) {
                markers[0].getAttribute('font-family').then(function(value) {
                    deferred.fulfill(value);
                });
            });
            return deferred;
        },
        getFontSize: function(rowIndex) {
            var deferred = protractor.promise.defer();

            this.getDigitMarkers(rowIndex).then(function(markers) {
                markers[0].getAttribute('font-size').then(function(value) {
                    deferred.fulfill(parseInt(value), 10);
                });
            });
            return deferred;
        }
    };

    this.aminoAcids = {
        getAll: function() {
            return element.all(by.css('.amino-acids-group .amino-acid'));
        },
        get: function(id) {
            return element(by.id(id));
        },
        getAllPaths: function(id) {
            return this.get(id).all(by.css('.amino-acid-path'));
        },
        getPath: function(id, brickIndex) {
            return this.getAllPaths(id).get(brickIndex);
        },
        getPathColor: function(path) {
            return path.getAttribute('fill');
        },
        getText: function(id) {
            return element(by.css('#'+id+' .amino-acid-text')).getAttribute('textContent');
        },
        getTextNodes: function(id) {
            return this.get(id).all(by.css('tspan'));
        },
        getTextNodeXPosition: function(textNode) {
            return textNode.getAttribute('x');
        }
    };

    this.features = {
        getAll: function() {
            return element.all(by.css('.features-group .feature'));
        },
        getAt: function(index) {
            return element.all(by.css('.features-group .feature')).get(index);
        },
        getRectangle: function(index) {
            return this.getAt(index).element(by.css('polygon'));
        },
        getColor: function(index) {
            return this.getRectangle(index).getAttribute('fill');
        },
        getVector: function(index) {
            return this.getRectangle(index).getAttribute('points');
        },
        getLabel: function(index) {
            return this.getAt(index).element(by.css('text'));
        },
        getLabelText: function(index) {
            return this.getLabel(index).getText();
        }
    };

    this.restrictionSites = {
        getAll: function() {
            return element.all(by.css('.restriction-sites .restriction-site'));
        },
        getAt: function(index) {
            return element.all(by.css('g.restriction-site')).get(index);
        },
        getPath: function(site) {
            return site.element(by.css('.restriction-site-graphic'));
        },
        getPosition: function(site) {
            return utils.getTranslateCoords(site);
        },
        getVector: function(siteData) {
            var element = this.getAt(siteData.index);
            return this.getPath(element).getAttribute('d');
        },
        getTextNode: function(siteData) {
            return this.getAt(siteData.index).element(by.css('.restriction-site-text'));
        },
        getTextBackgroundNode: function(siteData) {
            return this.getAt(siteData.index).element(by.css('.restriction-site-text-background'));
        }
    };

    this.orfs = {
        getAll: function() {
            return element.all(by.css('.sequence-svg .orf'));
        },
        getDistinct: function() {
            /*use this function to count distinct ORFs (regardless of overlap)*/
            var deferred = protractor.promise.defer(),
                // need to store a local ref to this func because 'this' within map() is different:
                attrGetter = this.getOrfData;

            this.getAll().then(function(orfs) {
                var promises = orfs.map(function(orf) {
                    return attrGetter(orf);
                });

                webdriver.promise.all(promises).then(function(orfAttributes) {
                    var distinctOrfSequences = [],
                        distinctOrfs = [];

                    for(var i = 0; i < orfAttributes.length; i++) {
                        if(distinctOrfSequences.indexOf(orfAttributes[i].dnaSequence) == -1) {
                            distinctOrfSequences.push(orfAttributes[i].dnaSequence);
                            distinctOrfs.push(orfAttributes[i]);
                        }
                    }

                    deferred.fulfill(distinctOrfs);
                });
            });

            return deferred.promise;
        },
        getAt: function(index) {
            return this.getAll().get(index);
        },
        getPath: function(orf) {
            return orf.element(by.css('path'));
        },
        getText: function(orf) {
            var deferred = protractor.promise.defer();

            orf.getText().then(function(text) {
                //if orf is a array of elements, we'll get an array of texts
                if(text.length) {
                    text = text.join("");
                }
                deferred.fulfill(text);
            });

            return deferred;
        },
        getData: function(orf) {
            var deferred = protractor.promise.defer();
            orf.getAttribute('data-orf').then(function(attribute) {
               deferred.fulfill(JSON.parse(attribute));
            });

            return deferred.promise;
        }
    };

    /*
    the following functions are not declared directly on 'this' by design.
    we define them as local variables so we can use them internally
    (we can't call them on 'this' when in a nested object because 'this' isn't SequenceView, it is the nested object).
    we append these local functions to 'this' to expose them
     */

    var getSvgContainerAt = function(index) {
        return element.all(by.css('svg.sequence-svg')).get(index);
    }
    this.getSvgContainerAt = getSvgContainerAt;
};

module.exports = SequenceView;