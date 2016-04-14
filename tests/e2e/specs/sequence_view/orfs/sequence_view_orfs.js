module.exports = function() {
    console.log("Starting ORF rendering tests");
    /*
    * Testing ORF rendering is done in two phases:
    * 1. test the svg <path> element's d attribute value (the line coordinates)
    * 2. test the svg <text> element (Amino Acid translation characters)
    * */
    var utils = GLOBAL.gc.utils,
        data = require('./data/orf_rendering.js'),
        vectors = data.vectors,
        files = data.files,
        aaTranslations = data.aaTranslations,
        viewer = GLOBAL.gc.plasmidViewer,
        directions = ['forward', 'reverse'];

    //TODO use a single orf file instead of splitting into two per direction

    /*it('should render correct amount of ORFs', function() {
        viewer.sequenceView.getDistinctOrfs().then(function(orfs) {
            expect(orfs.length).toEqual(1);
        });
    });*/

    function testPath(index, overlapType, direction) {
        //TODO: add AA translation text test here as well
        var validVector = vectors[browser.browserName][overlapType][direction],
            orf = viewer.sequenceView.orfs.getAt(index),
            path = viewer.sequenceView.orfs.getPath(orf),
            width = vectors[browser.browserName][overlapType].windowWidth;

        viewer.resizeWindow(width).then(function() {
            utils.getPathVector(path).then(function(value) {
                expect(value).toEqual(validVector);
            });
        });
    }

    function testAminoAcidTranslation(direction) {
        viewer.loadFile(files.genbank[direction]);
        var orfs = viewer.sequenceView.orfs.getAll(),
            validText = aaTranslations[direction];

        viewer.sequenceView.orfs.getText(orfs).then(function(text) {
            expect(text).toEqual(validText);
        });
    }

    describe("Test forward ORF amino acid translation test", function() {
        it('should display the correct forward ORF amino acid translation characters', function() {
            testAminoAcidTranslation('forward');
        });

        it('should display the correct reverse ORF amino acid translation characters', function() {
            testAminoAcidTranslation('reverse');
        });
    });

    for(var i in directions) {
        var direction = directions[i];
        describe('Test ' + direction + ' ORF rendering of both edges', function() {
            it('should load the ORF ' + direction + 'file', function() {
                viewer.loadFile(files.genbank[direction]);
            });

            //we test the ORF node on the second row
            it('should render a ' + direction + ' ORF without overlap', function () {
                testPath(1, 'noOverlap', direction);
            });

            it('should render a ' + direction + ' ORF with a 2 brick overlap', function () {
                testPath(1, 'twoBPOverlap', direction);
            });

            it('should render a ' + direction + ' ORF with a 1 brick overlap', function () {
                testPath(1, 'oneBPOverlap', direction);
            });
        });
    }
};