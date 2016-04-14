'use strict';
var PlasmidViewer = require('./page_objects/plasmid_viewer.js');

// keep our globals namespaced:
GLOBAL.gc = {};

GLOBAL.gc.environment = browser.params.environment;

GLOBAL.gc.utils = require('./utils.js');

GLOBAL.gc.plasmidViewer = new PlasmidViewer(GLOBAL.gc.environment);

// describe("Test Header", require('./specs/header/header.js'));

describe("Test Sequence View", require('./specs/sequence_view/sequence_view_tests.js'));

// describe("Test Circular View"), require('./specs/circular_view/FOOBAR.js');


/*describe("Load a FASTA file ", function() {
    it('should load a Fasta file', function() {
        viewer.loadFile('fasta.fasta');
    });

    it('should display the project name in the Plasmid view', function() {
        expect(viewer.circularView.getPlasmidProjectName()).toEqual('fasta');
    });

    it('should display the project description in the Plasmid view', function() {
        expect(viewer.circularView.getPlasmidProjectDescription()).toEqual('3845 bp');
    });

    //it('should copy the sequence of the first 5 characters', function() {
    //    var startElement = viewer.getCharSelectionRectangleAt(0),
    //        stopElement = viewer.getCharSelectionRectangleAt(4);
    //
    //    viewer.clickDrag(startElement, stopElement);
    //    viewer.copyToClipboard();
    //});

    it('should select the first restriction site', function() {
        var site = viewer.sequenceView.getRestrictionSiteAt(0);
        browser.actions().click(site).perform();

        utils.copyToClipboard();
        utils.getClipboardText().then(function(text) {
            expect(text).toEqual('AGATCT');
        });
    });
});

describe('check that sequence view content widths are correct', function() {
    viewer.loadFile('fasta.fasta');
    it('checks that sequence svg elements do not overlap the sequence view container width', function() {
        var svgContainerWidth = viewer.sequenceView.getSequenceContainer().getAttribute('clientWidth'),
            svgWidth = viewer.sequenceView.getSvgContainerAt(0).getAttribute('width');

        webdriver.promise.all([svgContainerWidth, svgWidth]).then(function(results) {
            var sequenceContainerWidth = parseFloat(results[0], 10),
                svgWidth = parseFloat(results[1], 10);

            // the svg container width should not exceed the sequence container width:
            expect(svgWidth).toBeLessThan(sequenceContainerWidth);
        });
    });

    it('checks that the sequence layer width does not exceed the svg container width', function() {
        var svgWidth = viewer.sequenceView.getSvgContainerAt(0).getAttribute('width'),
            sequenceLayerSize = utils.getBBox(viewer.sequenceView.getSequenceLayerAt(0));

        webdriver.promise.all([svgWidth, sequenceLayerSize]).then(function(results) {
            var svgWidth = parseFloat(results[0]),
                layerWidth = parseFloat(results[1].width, 10);

            // the sequence layer width should not exceed the svg container width:
            expect(layerWidth).toBeLessThan(svgWidth);
        });
    });

    it('checks that sequence layer text matches the sequence layer', function() {
        var sequenceLayerSize = utils.getBBox(viewer.sequenceView.getSequenceLayerAt(0)),
            sequenceTextSize = utils.getBBox(viewer.sequenceView.getSequenceLayerTextNodeAt(0));

        webdriver.promise.all([sequenceLayerSize, sequenceTextSize]).then(function(results) {

            var textWidth = parseFloat(results[0].width, 10),
                layerWidth = parseFloat(results[1].width, 10);

            // the sequence text width should match the sequence layer width
            // allow up to 0.1 pixel difference in widths:
            expect(layerWidth - textWidth < 0.1).toBeTruthy();
        });
    });
});
*/