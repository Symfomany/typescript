/**
 * Some helpers in Nodejs for Webpack
 * Functions & Constant
 */

const path = require('path');

const EVENT = process.env.npm_lifecycle_event || '';

// Helper functions

/**
 * ROOT Directory
 */
const ROOT = path.resolve(__dirname, '..');

/**
 * If has options
 */
function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
    return EVENT.includes(flag);
}

function isWebpackDevServer() {
    return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
}

exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;