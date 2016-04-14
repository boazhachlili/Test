module.exports = function() {
    console.log("Starting Header tests");

    var viewer = GLOBAL.gc.plasmidViewer,
        api = viewer.header,
        file = 'fasta.fasta';

    function testFontSize(validFontSize) {
        it('should set various font sizes in sequence view', function() {
            api.fontSizeSlider.slideToValue(validFontSize).then(function() {
                viewer.sequenceView.sequence.getFontSize().then(function(fontSize) {
                    fontSize = parseInt(fontSize, 10);
                    console.log('fontSize: '+fontSize, 'validFontSize: '+validFontSize);
                    expect(fontSize).toEqual(validFontSize);
                });
            });
        });
    }

    it('should load the fasta.gb file', function() {
        viewer.loadFile(file, true);
    });

    it("should open our website in a new tab", function() {
        var validUrl = 'www.genomecompiler.com/plasmid-viewer/';

        api.getLink().click();

        //don't wait for AngularJS to load in the new tab (otherwise we'll get an exception):
        browser.ignoreSynchronization = true;

        viewer.switchTab(1).then(function() {
            browser.getCurrentUrl().then(function(url) {
                expect(url.indexOf(validUrl) > 0).toBeTruthy();
                browser.ignoreSynchronization = false;
                viewer.closeCurrentTab();

                // browser.sleep() here is required to solve a strange issue where closing second tab would also close primary tab
                browser.sleep(1000).then(function() {
                    viewer.switchTab(0);
                });
            });
        });
    });

    /*it('should set various font sizes in sequence view', function() {
        var validFontSize = 13;
        api.fontSizeSlider.slideToValue(validFontSize).then(function() {
            viewer.sequenceView.sequence.getFontSize().then(function(fontSize) {
                fontSize = parseInt(fontSize, 10);
                console.log('fontSize: '+fontSize, 'validFontSize: '+validFontSize);
                expect(fontSize).toEqual(validFontSize);
            });
        });
    });


    it('should set various font sizes in sequence view', function() {
        var validFontSize = 14;
        api.fontSizeSlider.slideToValue(validFontSize).then(function() {
            viewer.sequenceView.sequence.getFontSize().then(function(fontSize) {
                fontSize = parseInt(fontSize, 10);
                console.log('fontSize: '+fontSize, 'validFontSize: '+validFontSize);
                expect(fontSize).toEqual(validFontSize);
            });
        });
    });
    */
    var fontSizes = [12, 13, 14, 15, 16, 17, 18, 19, 20];
    for(var i in fontSizes) {
        viewer.loadFile(file);
        testFontSize(fontSizes[i]);
    }
};