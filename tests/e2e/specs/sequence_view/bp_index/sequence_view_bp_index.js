module.exports = function() {
    console.log("Starting BP Index tests");

    var utils = GLOBAL.gc.utils,
        data = require('./data/bp_index_rendering.js'),
        file = data.file,
        viewer = GLOBAL.gc.plasmidViewer;

    data = data.vectors[browser.browserName];

    function testFont(data) {
        it("should set correct font and position of bp index group", function() {
            var api = viewer.sequenceView.bpIndex,
                group = api.getAt(data.rowIndex),
                //translateCoords = utils.getTranslateCoords(group),
                fontFamily = api.getFontFamily(data.rowIndex),
                fontSize = api.getFontSize(data.rowIndex);

            expect(fontFamily).toEqual(data.fontFamily);
            expect(fontSize).toEqual(data.fontSize);
            //expect(translateCoords).toEqual(data.groupTranslateCoords.noCompliment);
            //viewer.sequenceView.toggleLayer('compliment').then(function() {
            //    expect(translateCoords).toEqual(data.groupTranslateCoords.withCompliment);
            //});
        });
    }

    function testVerticalPositioning(data, complimentFlag) {
        var api = viewer.sequenceView.bpIndex,
            group = api.getAt(data.rowIndex);

        var translateCoords = utils.getTranslateCoords(group);
        expect(translateCoords).toEqual(data.groupTranslateCoords[complimentFlag]);
    }

    function testMarkers(data, rowIndex) {
        it('should render BP index line and digit markers', function() {
            /*test the following on various window widths!
            * test y1, y2 values for each line
            * test x positions of lines
            * test x positions of digits
            */
            var api = viewer.sequenceView.bpIndex,
                lines = api.getLineMarkers(rowIndex),
                digits = api.getDigitMarkers(rowIndex),
                windowWidth = data.windowWidth;

            viewer.resizeWindow(windowWidth).then(function() {
                lines.getWebElements().then(function(markers) {
                    var marker,
                        translateCoords;

                    for(var i = 0; i < markers.length; i++) {
                        marker = markers[i];
                        expect(marker.getAttribute('y1')).toEqual(data.linesYPositions.y1);
                        expect(marker.getAttribute('y2')).toEqual(data.linesYPositions.y2);

                        translateCoords = utils.getTranslateCoords(marker);
                        expect(translateCoords.x).toEqual(data.lineMarkersXValues[i]);
                    }
                });

                digits.getWebElements().then(function(markers) {
                    var marker,
                        translateCoords;

                    for(var i = 0; i < markers.length; i++) {
                        marker = markers[i];
                        translateCoords = utils.getTranslateCoords(marker);
                        expect(translateCoords.x).toEqual(data.digitMarkersXValues[i]);
                    }
                });
            })
        });
    }

    describe("Test BP Index rendering", function() {
        it('should load the BP Index file', function() {
            viewer.loadFile(file);
        });

        it('should test BP Index rendering with no compliment', function() {
            testVerticalPositioning(data, 'noCompliment');
        });

        it('should show the compliment sequence layer', function() {
            viewer.footer.annotationLayersPopover.toggleLayer('compliment', true);
        });

        it('should test BP Index rendering with compliment', function() {
            testVerticalPositioning(data, 'withCompliment');
        });

        it('should test BP Index markers rendering', function() {
            for(var i = 0; i < data.markers.length; i++) {
                testMarkers(data.markers[i], data.rowIndex);
            }
        });
    });
};