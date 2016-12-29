"use strict";
var Demo = (function () {
    function Demo(name) {
        this.name = name;
        this.version = 1;
    }
    Demo.prototype.out = function () {
        return "This is " + this.name + " in version " + this.version;
    };
    return Demo;
}());
exports.Demo = Demo;
