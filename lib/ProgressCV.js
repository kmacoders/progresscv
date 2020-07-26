"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressCV = void 0;
var CircleLineProgress_1 = require("./Circle/CircleLineProgress");
var ProgressCV = (function () {
    function ProgressCV(el, options) {
        this.el = el;
        this.options = (options === undefined && {
            type: el.getAttribute('data-progress-type') || 'circleLineProgress',
            percent: el.getAttribute('data-percent') || 25,
            size: el.getAttribute('data-size') || 220,
            lineWidth: el.getAttribute('data-line') || 15,
            rotate: el.getAttribute('data-rotate') || 0,
            color: el.getAttribute('data-color-progress') || '#300399',
        }) || {
            type: options.type ||
                el.getAttribute('data-progress-type') ||
                'circleLineProgress',
            percent: options.percent || el.getAttribute('data-percent') || 25,
            size: options.size || el.getAttribute('data-size') || 220,
            lineWidth: options.lineWidth || el.getAttribute('data-line') || 15,
            rotate: options.rotate || el.getAttribute('data-rotate') || 0,
            color: options.color || el.getAttribute('data-color-progress') || '#300399',
        };
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    ProgressCV.prototype.init = function () {
        this.initializationCanvas();
        this.changePostionCanvas();
        switch (this.options.type) {
            case 'circleLineProgress': {
                var pgcv = new CircleLineProgress_1.default(this.el, this.ctx, this.options);
                pgcv.init();
                break;
            }
            default: {
                console.log('NO');
                break;
            }
        }
    };
    ProgressCV.prototype.initializationCanvas = function () {
        this.canvas.width = Number(this.options.size);
        this.canvas.height = Number(this.options.size);
        this.el.appendChild(this.canvas);
    };
    ProgressCV.prototype.changePostionCanvas = function () {
        this.ctx.translate(Number(this.options.size) / 2, Number(this.options.size) / 2);
        this.ctx.rotate((-1 / 2 + Number(this.options.rotate) / 180) * Math.PI);
    };
    return ProgressCV;
}());
exports.ProgressCV = ProgressCV;
//# sourceMappingURL=ProgressCV.js.map