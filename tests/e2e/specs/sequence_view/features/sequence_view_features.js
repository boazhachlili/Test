module.exports = function() {
    console.log("Starting Features tests");

    var utils = GLOBAL.gc.utils,
        data = require('./data/features_rendering.js'),
        file = data.file,
        viewer = GLOBAL.gc.plasmidViewer;

    data = data.vectors[browser.browserName];

    function testPath(featureData) {
        /*
        * test Y offset on features group and individual feature nodes
        * test color of rectangle
        * test vector of rectangle
        * test label value
        * test label centering
        * test label ellipsis
        * */

        it("should render a rectangular feature", function() {
            var api = viewer.sequenceView.features,
                index = featureData.index,
                color = api.getColor(index),
                vector = api.getVector(index),
                textValue = api.getLabelText(index),
                textXPosition = api.getLabel(index).getAttribute('x'),
                windowWidth = data.windowWidth;

            viewer.resizeWindow(windowWidth).then(function() {
                expect(color).toEqual(featureData.color);
                expect(vector).toEqual(featureData.vector);
                expect(textXPosition).toEqual(featureData.text.xPosition);
                expect(textValue).toEqual(featureData.text.value);
            });
        });
    }

    describe("Test Features rendering", function() {
        it('should load the Features file', function() {
            viewer.loadFile(file);
        });

        describe('Test Feature rendering', function() {
            var features = data.features;

            for(var index in features) {
                testPath(features[index]);
            }
        });
    });
};