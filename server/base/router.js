'use strict';

let ImportGraph = require('../bootstrap/import-graph/index');

/**
 *  Router Base
 */
class Router {
    /**
     * 
     */
    constructor(app, io) {
        this.app = app;
        this.io = io;
    }
    
    /**
     * 
     */
    init () {
        let importGraph = new ImportGraph();
        let graph = importGraph.createGraph(__dirname.slice(0,-5), { // /base is slice -5
                loadPaths: [process.cwd() + '/server'],
                extensions: ['js'],
                extensionPrefix: ['.router'],
                parseSyntax: 'js'
            });
            graph.visitAncestors(__dirname + '/router.js', (node) => {
                let RouterDescendant = require(node),
                    // init inhertanced routers here
                    routerDescendant = new RouterDescendant(this.app, this.io, this.socket);
                routerDescendant.init();
            });
    }
    
    /**
     * 
     */
    onConnection (callback) {
        this.io.on('connection', callback);
    }  
}
module.exports = Router;