module.exports = function() {
    console.log("Starting Amino Acids rendering tests");

    var viewer = GLOBAL.gc.plasmidViewer,
        utils = GLOBAL.gc.utils,
        data = require('./data/amino_acids_rendering.js'),
        file = data.file;

    data = data[browser.browserName];

    function testAminoAcid(aaData) {
        it("test amino acid rendering: " + aaData.description, function() {
            viewer.resizeWindow(aaData.windowWidth).then(function () {
                var api = viewer.sequenceView.aminoAcids,
                    id = aaData.id,
                    validVectors = aaData.paths,
                    validText = aaData.text,
                    validColors = aaData.colors,
                    validTextXPositions = aaData.textXPositions,

                    paths = api.getAllPaths(id),
                    text = api.getText(id),
                    textNodes = api.getTextNodes(id);

                protractor.promise.all([paths, text, textNodes]).then(function (results) {
                    var paths = results[0],
                        text = results[1],
                        textNodes = results[2];

                    //TODO: add y offset test for overlapping nodes

                    expect(text).toEqual(validText);

                    //test bricks:
                    for (var i = 0; i < paths.length; i++) {
                        var vector = utils.getPathVector(paths[i]),
                            color = api.getPathColor(paths[i]),
                            textXPosition = api.getTextNodeXPosition(textNodes[i]);

                        expect(vector).toEqual(validVectors[i]);
                        expect(color).toEqual(validColors[i]);
                        expect(textXPosition).toEqual(validTextXPositions[i]);
                    }
                });
            });
        });
    };

    describe('Test Amino Acid rendering', function() {
        it('should load the Amino Acid file', function() {
            viewer.loadFile(file);
        });

        for(var i in data.aminoAcids) {
            testAminoAcid(data.aminoAcids[i]);
        }
    });
};