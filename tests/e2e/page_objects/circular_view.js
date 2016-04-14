'use strict';
var CircularView = function() {
    this.getPlasmidProjectName = function() {
        return element(by.id('projectName')).getText();
    };

    this.getPlasmidProjectDescription = function() {
        return element(by.id('projectDescription')).getText();
    };
}

module.exports = CircularView;