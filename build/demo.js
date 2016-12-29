"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// target est la class qui va se faire décorer
function Component(target) {
    console.log(target);
}
var Demo = (function () {
    function Demo(option) {
    }
    Object.defineProperty(Demo.prototype, "element", {
        get: function () {
            return this._element;
        },
        set: function (value) {
            this._element = value;
        },
        enumerable: true,
        configurable: true
    });
    Demo.prototype.demo = function () {
    };
    return Demo;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Demo;
var Demo2 = (function (_super) {
    __extends(Demo2, _super);
    function Demo2() {
        return _super.apply(this, arguments) || this;
    }
    return Demo2;
}(Demo));
