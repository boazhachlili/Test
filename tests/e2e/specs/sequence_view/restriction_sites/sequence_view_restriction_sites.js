module.exports = function() {
    console.log("Starting RE rendering tests");

    var utils = GLOBAL.gc.utils,
        data = require('./data/restriction_sites_rendering.js'),
        file = data.file,
        viewer = GLOBAL.gc.plasmidViewer;

    data = data.vectors[browser.browserName];

    function testPath(siteData, overlapType, complimentFlag) {
        it("should render a " + siteData.cutType + " cut, no overlap", function() {
            var siteVector = viewer.sequenceView.restrictionSites.getVector(siteData),
                windowWidth = data[overlapType].windowWidth,
                validVector = siteData.path[complimentFlag];

            viewer.resizeWindow(windowWidth).then(function() {
                expect(siteVector).toEqual(validVector);
            });
        });
    }

    function testLabel(siteData, complimentFlag) {
        /*test the following:
        * label text value
        * label text position
        * label background position
        * */
        it("should render a RE site label", function() {
            var re = viewer.sequenceView.restrictionSites,
                textNode = re.getTextNode(siteData),
                textBackgroundNode = re.getTextBackgroundNode(siteData),
                validTextNodeCoords = siteData.text.translateCoords[complimentFlag],
                validTextBackgroundNodeCoords = siteData.textBackground.translateCoords[complimentFlag];

            expect(textNode.getText()).toEqual(siteData.text.value);
            expect(utils.getTranslateCoords(textNode)).toEqual(validTextNodeCoords);
            expect(utils.getTranslateCoords(textBackgroundNode)).toEqual(validTextBackgroundNodeCoords);
        });
    }

    describe("Test RE sites rendering", function() {
        it('should load the Restriction Sites file', function() {
            viewer.loadFile(file);
        });

        //it('should hide the compliment sequence layer', function() {
        //    viewer.footer.annotationLayersPopover.toggleLayer('compliment', false);
        //});

        describe('Test RE sites rendering with no compliment sequence and no overlap', function() {
            var sites = data.noOverlap.sites,
                complimentFlag = 'noCompliment';

            for(var index in sites) {
                testPath(sites[index], 'noOverlap', complimentFlag);
                testLabel(sites[index], complimentFlag);
            }
        });

        it('should display the compliment sequence layer', function() {
            viewer.footer.annotationLayersPopover.toggleLayer('compliment', true);
        });

        describe('Test RE sites rendering with compliment sequence and no overlap', function() {
            var sites = data.noOverlap.sites,
                complimentFlag = 'withCompliment';

            for(var index in sites) {
                testPath(sites[index], 'noOverlap', complimentFlag);
                testLabel(sites[index], complimentFlag);
            }
        });
    });
};