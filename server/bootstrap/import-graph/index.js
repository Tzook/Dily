'use strict';

let _               = require('lodash'),
    fs              = require('fs'),
    path            = require('path'),
    Graph           = require('./lib/graph'),
    ImportParser    = require('./lib/import-parser');

/**
 * class ImportGraph
 */
class ImportGraph {
    /**
     * Will create a graph for a file or a directory
     * @name ImportGraph.createGraph
     * @param {String} entryPath
     * @param {Object} [options]
     * @returns {Graph}
     */
    createGraph(entryPath, options) {
        let isFile = (fs.lstatSync(entryPath).isFile());
        if (fs.lstatSync(entryPath).isDirectory() || isFile) {
            entryPath = path.resolve(entryPath);
            options = processOptions(options);
            let graph;
            if (isFile) {
                graph = new Graph(ImportParser, options);
                graph.addFile(entryPath);
            } else {
                graph = new Graph(ImportParser, options, entryPath);
                graph.init();
            }
            return graph;
        }
    }
}

/**
 * @param {Object} options
 */
function processOptions(options) {
    return _.assign({
        loadPaths: [process.cwd()],
        extensions: ['js'],
        extensionPrefix: [],
        parseSyntax: 'js'
    }, options);
}

module.exports = ImportGraph;
