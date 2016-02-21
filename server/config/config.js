'use strict';

/**
 * Config to get the envoirment object from an env file, defaultly in env.json
 * Can set infinity enviorments
 */
class Config {
    constructor(env) {
		this.env = env || require('./env.json');
        this.node_env = 'development';
		switch (process.env.NODE_ENV) {
			case 'production': this.node_env = 'production';
				break;
			case 'staging': this.node_env = 'staging';
				break;
		}
    }
	
	get enviorment () {
		return this.env[this.node_env];
	}
}

module.exports = Config;