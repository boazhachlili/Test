'use strict';
var PlasmidViewer = require('./page_objects/plasmid_viewer.js');

// keep our globals namespaced:
GLOBAL.gc = {};

GLOBAL.gc.config = {
    environment: "test",
    filesHost: 'http://104.196.28.106/download/e2e',
    hosts: {
        dev: 'http://localhost:3000/plasmid_viewer',
        test: 'http://104.196.28.106/plasmid_viewer',
        stg: 'http://designer.genomecompiler.com:3000/plasmid_viewer',
        prd: 'https://designer.genomecompiler.com/plasmid_iframe'
    }
};


GLOBAL.gc.environment = GLOBAL.gc.config.environment;

GLOBAL.gc.utils = require('./utils.js');

GLOBAL.gc.plasmidViewer = new PlasmidViewer(GLOBAL.gc.config.environment);

// describe("Test Header", require('./specs/header/header.js'));

describe("Test Sequence View", require('./specs/sequence_view/sequence_view_tests.js'));

// describe("Test Circular View"), require('./specs/circular_view/FOOBAR.js');