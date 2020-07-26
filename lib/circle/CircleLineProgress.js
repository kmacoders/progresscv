"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types_1 = require("../Types/Types");
var CircleLineProgress = (function () {
    function CircleLineProgress(el, ctx, options) {
        this.el = el;
        this.ctx = ctx;
        this.options = options;
    }
    CircleLineProgress.prototype.init = function () {
        console.log(this.options);
        this.drawCircle('#e6e6e6', Number(this.options.lineWidth), 100, 'round');
        var progressContainer = document.querySelector('.progresscv-container');
        if (progressContainer.getAttribute('data-progress-loader') === 'true') {
            this.effectProgressLoader(this.ctx, this.options.color);
        }
        else {
            this.drawCircle(this.options.color, Number(this.options.lineWidth), Number(this.options.percent), 'round');
            this.drawProgressNumber(Number(this.options.percent));
        }
    };
    CircleLineProgress.prototype.drawCircle = function (color, lineWidth, percent, lineCap) {
        var radius = (Number(this.options.size) - Number(this.options.lineWidth)) / 2;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, 0, Math.PI * 2 * (percent / 100), false);
        this.ctx.strokeStyle = color;
        this.ctx.lineCap = lineCap;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
    };
    CircleLineProgress.prototype.effectProgressLoader = function (ctx, color) {
        var _this = this;
        if (color === void 0) { color = '#300399'; }
        var counterPercent = 0;
        var drawProgress = function () {
            counterPercent = Math.round(counterPercent + Types_1.Utility.MEDIUM_SPEED);
            _this.drawCircle(color, Number(_this.options.lineWidth), counterPercent, 'round');
            _this.drawProgressNumber(counterPercent);
            if (counterPercent < Number(_this.options.percent)) {
                requestAnimationFrame(drawProgress);
            }
        };
        requestAnimationFrame(drawProgress);
    };
    CircleLineProgress.prototype.drawProgressNumber = function (percent) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.font = '30px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.rotate((1 / 2) * Math.PI);
        this.ctx.clearRect(-50, -50, 100, 100);
        this.ctx.fillText(percent + "%", 0, 0);
        this.ctx.restore();
    };
    return CircleLineProgress;
}());
exports.default = CircleLineProgress;
//# sourceMappingURL=CircleLineProgress.js.map