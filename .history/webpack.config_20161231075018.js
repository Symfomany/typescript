console.log("**********************************************");

/**
 * @author: Boyer Julien
 * Load all environements in webpack/ directory
 * --env.prod :prod
 * --env.dev  :dev
 */

// Look in ./webpack folder for webpack.dev.js
switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./webpack/webpack.prod')({ env: 'production' });
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./webpack/webpack.dev')({ env: 'development' });
}