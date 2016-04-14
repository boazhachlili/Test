'use strict';
var Header = function() {
    this.getFontSlider = function() {
        return element(by.model('fontSize.fontSize'));
    };

    this.getRotationSlider = function() {
        return element(by.model('rotate.rotate'));
    };

    this.getLink = function() {
        return element(by.css('#viewer-link'));
    };

    this.fontSizeSlider = new Slider(element(by.css('header .font-size.slider')));
};

function Slider(element) {
    var utils = GLOBAL.gc.utils;
    /* encapsulates slider behavior(input[type="range"])*/

    if(!element) {
        throw "Slider constructor error: invalid element parameter";
    }

    this.get = function() {
        return this.element;
    };

    this.slideToValue = function(value) {
        //using the bounding box, calculate the area where value exists on the slider, move mouse there and click

        var sliderElement = element,
            deferred = protractor.promise.defer(),
            boundingBox = utils.executeElementMethod(element, 'getBoundingClientRect'),
            step = element.getAttribute('step'),
            min = element.getAttribute('min'),
            max = element.getAttribute('max');

        protractor.promise.all([boundingBox, step, min, max]).then(function(results) {
            var box = results[0],
                step = results[1],
                min = results[2],
                max = results[3];

            var targetStep = (value - min) / step,
                stepWidth = box.width / (max - min / step),
                mouseX = parseInt(box.left + (stepWidth * targetStep));

            console.log(stepWidth, mouseX);
            browser.actions()//.dragAndDrop(sliderElement, {x: mouseX, y: 0})
                //.mouseMove({x: box.width / 2, y: 20})
                .mouseMove({x: parseInt(mouseX), y:box.top + 5})
                .mouseDown()
                .mouseUp()
                .perform().then(function() {
                    deferred.fulfill();
                });
        });

        return deferred;
    };
}


module.exports = Header;