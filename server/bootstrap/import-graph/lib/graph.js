'use strict';

let _               = require('lodash'),
    fs              = require('fs'),
    path            = require('path'),
    glob            = require('glob');

/**
 * Class Graph
 */
class Graph {

    /**
     * @param {ImportParser} ImportParser
     * @param {Object} options
     * @param {String} dir
     */
    constructor(ImportParser, options, dir) {
        options = options || {};
        this.ImportParser = ImportParser;
        this.dir = dir;
        this.loadPaths = options.loadPaths || [];
        this.extensions = options.extensions || [];
        this.extensionPrefix = options.extensionPrefix || [];
        this.parseSyntax = options.parseSyntax || '';
        this.index = {};
    }

    /**
     * init the Graph to fill it's index object
     */
    init() {
        if (this.dir) {
            let filePatterns = this.dir + '/**/*@(' + this.extensionPrefix.join('|') + ').@(' + this.extensions.join('|') + ')';
            _.each(glob.sync(filePatterns, {dot: true}), (file) => {
                this.addFile(path.resolve(file));
            });
        }
    }

    /**
     *
     * @param filePath
     * @param parent
     */
    addFile(filePath, parent) {
        let entry = this.index[filePath] = this.index[filePath] || {
                imports: [],
                importedBy: [],
                modified: fs.statSync(filePath).mtime
            };

        let importParser = new this.ImportParser(this.parseSyntax);

        let resolvedParent,
            imports = importParser.parse(fs.readFileSync(filePath, 'utf-8')),
            cwd = path.dirname(filePath),
            loadPaths, resolved;

        for (let i = 0, l = imports.length; i < l; i++) {
            loadPaths = _([cwd, this.dir]).concat(this.loadPaths).filter().uniq().value();
            resolved = resolveFilePath(imports[i], loadPaths, this.extensions);
            if (!resolved)
                continue;
            // recurse into dependencies if not already enumerated
            if (!_.includes(entry.imports, resolved)) {
                entry.imports.push(resolved);
                this.addFile(fs.realpathSync(resolved), filePath);
            }
        }

        // add link back to parent
        if (parent) {
            resolvedParent = _(parent).intersection(this.loadPaths).value();

            if (resolvedParent) {
                resolvedParent = parent.substr(parent.indexOf(resolvedParent));
            } else {
                resolvedParent = parent;
            }

            entry.importedBy.push(resolvedParent);
        }
    }

    /**
     * @param {String} filePath
     * @param {Function} callback
     * @param {Function} edgeCallback
     * @param {Array} visited
     */
    visit(filePath, callback, edgeCallback, visited) {
        filePath = fs.realpathSync(filePath);
        visited = visited || [];
        if (!this.index.hasOwnProperty(filePath)) {
            edgeCallback('Graph doesn\'t contain ' + filePath, null);
        }
        let edges = edgeCallback(null, this.index[filePath]);

        let i, length = edges.length;
        for (i = 0; i < length; i++) {
            if (!_.includes(visited, edges[i])) {
                visited.push(edges[i]);
                callback(edges[i], this.index[edges[i]]);
                this.visit(edges[i], callback, edgeCallback, visited);
            }
        }
    }

    /**
     * visits all files that are ancestors of the provided file
     * @param {String} filePath
     * @param {Function} callback
     */
    visitAncestors(filePath, callback) {
        this.visit(filePath, callback, (err, node) => {
            if (err || !node)
                return [];
            return node.importedBy;
        }, []);
    }

    /**
     * visits all files that are descendants of the provided file
     * @param {String} filePath
     * @param {Function} callback
     */
    visitDescendants(filePath, callback) {
        this.visit(filePath, callback, (err, node) => {
            if (err || !node)
                return [];
            return node.imports;
        }, []);
    }
}

/**
 * Resolve file to a path
 * @param {String} filePath
 * @param {Array} loadPaths
 * @param {Array} extensions
 * @returns {String|boolean}
 */
function resolveFilePath(filePath, loadPaths, extensions) {
    // trim file extension
    let re = new RegExp('(\.(' + extensions.join('|') + '))$', 'i'),
        filePathName = filePath.replace(re, ''),
        extLength = extensions.length,
        resolvedFilePath,
        partialPath;
    for (let i = 0, l = loadPaths.length; i < l; i++) {
        for (let j = 0; j < extLength; j++) {
            resolvedFilePath = path.normalize(loadPaths[i] + '/' + filePathName + '.' + extensions[j]);
            if (fs.existsSync(resolvedFilePath)) {
                return resolvedFilePath;
            }
        }

        // special case for _partials
        for (let j = 0; j < extLength; j++) {
            resolvedFilePath = path.normalize(loadPaths[i] + '/' + filePathName + '.' + extensions[j]);
            partialPath = path.join(path.dirname(resolvedFilePath), '_' + path.basename(resolvedFilePath));
            if (fs.existsSync(partialPath)) {
                return partialPath;
            }
        }
    }

    return false; // File to import not found or unreadable
}

module.exports = Graph;