'use strict';
module.exports = function() {
    console.log("Starting sequence rendering tests");

    var utils = GLOBAL.gc.utils,
        data = require("./data/sequence_rendering.js"),
        file = data.file,
        vectors = data.vectors,
        viewer = GLOBAL.gc.plasmidViewer;

    describe('check that sequence view content widths are correct', function() {
        viewer.loadFile('fasta.fasta');
        it('checks that sequence svg elements do not overlap the sequence view container width', function() {
            var svgContainerWidth = viewer.sequenceView.sequence.getSequenceContainer().getAttribute('clientWidth'),
                svgWidth = viewer.sequenceView.getSvgContainerAt(0).getAttribute('width');

            protractor.promise.all([svgContainerWidth, svgWidth]).then(function(results) {
                var sequenceContainerWidth = parseFloat(results[0], 10),
                    svgWidth = parseFloat(results[1], 10);

                // the svg container width should not exceed the sequence container width:
                expect(svgWidth).toBeLessThan(sequenceContainerWidth);
            });
        });

        it('checks that the sequence layer width does not exceed the svg container width', function() {
            var svgWidth = viewer.sequenceView.getSvgContainerAt(0).getAttribute('width'),
                sequenceLayerSize = utils.getBBox(viewer.sequenceView.sequence.getSequenceLayerAt(0));

            protractor.promise.all([svgWidth, sequenceLayerSize]).then(function(results) {
                var svgWidth = parseFloat(results[0]),
                    layerWidth = parseFloat(results[1].width, 10);

                // the sequence layer width should not exceed the svg container width:
                expect(layerWidth).toBeLessThan(svgWidth);
            });
        });

        it('checks that sequence layer text width matches the sequence layer width', function() {
            var sequenceLayerSize = utils.getBBox(viewer.sequenceView.sequence.getSequenceLayerAt(0)),
                sequenceTextSize = utils.getBBox(viewer.sequenceView.sequence.getSequenceLayerTextNodeAt(0));

            protractor.promise.all([sequenceLayerSize, sequenceTextSize]).then(function(results) {

                var textWidth = parseFloat(results[0].width, 10),
                    layerWidth = parseFloat(results[1].width, 10);

                // the sequence text width should match the sequence layer width
                // allow up to 0.1 pixel difference in widths:
                expect(Math.abs(layerWidth - textWidth) <= 3).toBeTruthy();
            });
        });
    });
};