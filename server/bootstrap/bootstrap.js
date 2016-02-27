'use strict';

let express 		= require('express'),
    http			= require('http'),
    socketio		= require('socket.io'),
	compression		= require('compression'),
    path            = require('path');
    
let Config          = require('../config/config'),
    Router          = require('../base/router');
  
__dirname = path.dirname(path.dirname(__dirname)); // slice the /server/bootstrap folder prefix
    
/**
 *  Bootstrap manager to initiate the app
 */
class Bootstrap {
    /**
     * 
     */
    constructor(app) {
        this.app = app;
    }
    
    /**
     * Loads the app
     */
    init() {
        this.config = new Config();
        // Express dependencies
        this.app.use(compression({level: 1}));
        this.app.set('view engine', 'jade');
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(express.static(__dirname));
        this.app.get('/', (req, res) => {
            res.sendFile(this.config.enviorment.index +'.html', { root: __dirname });
        });
        
        let server = http.createServer(this.app).listen(this.app.get('port'));
        console.info("\t+*+*+ New server on https://localhost:" + this.app.get('port') + " +*+*+");

        this.io = socketio(server);
        let router = new Router(this.app, this.io);
        router.init();
    }
};

// init app
let bootstarp = new Bootstrap(express());
bootstarp.init();