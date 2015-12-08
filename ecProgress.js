/*
var ecProgress = require('./ecProgress.js');
var p = new ecProgress();
p.on('change', console.log);
p.on('end', console.log);
p.add().add().add().done().done().add().done().add().done().done();
 */

(function(window) {
const dvalue = require('dvalue');
var ecProgress = function () { this.init(); };
ecProgress.prototype.init = function () {
  this.total = 0;
  this.todo = 0;
  this.cb = {change: [], end: []};
  this.errors = [];
  this.results = [];
};
ecProgress.prototype.add = function () {
  this.todo++;
  this.total++;
  return this;
};
ecProgress.prototype.getErrors = function () {
  return this.errors.length > 0? this.errors: undefined;
};
ecProgress.prototype.getResults = function () {
  return this.results.length > 0? this.results: undefined;
};
ecProgress.prototype.done = function (e, d) {
  this.todo--;
  if(!!e) { this.errors.push(e); }
  if(!!d) { this.results.push(d); }

  if(this.todo == 0) { // on end
    var errors = this.getErrors();
    var results = this.getResults();
    this.cb.end.map(function (f) {
      if(typeof(f) == 'function') { f(errors, results); }
    });
  }
  else { // on change
    var progress = (this.total - this.todo) / this.total;
    this.cb.change.map(function (f) {
      if(typeof(f) == 'function') { f(e, d, progress); }
    });
  }
  return this;
};
ecProgress.prototype.getProgress = function () {
  return (this.total - this.todo) / this.total;
};
ecProgress.prototype.getDetail = function () {
  return {
    total: this.total,
    todo: this.todo,
    done: this.total - this.todo,
    progress: (this.total - this.todo) / this.total
  };
};
ecProgress.prototype.on = function (ev, cb) {
  switch (ev) {
    case 'change':
      if(typeof(cb) == 'function') { this.cb.change.push(cb); }
      break;
    case 'end':
      if(typeof(cb) == 'function') { this.cb.end.push(cb); }
      break;
    default:
  }
  return this;
};
module.exports = ecProgress;

if (typeof exports !== "undefined") {
	exports.ecProgress = ecProgress;
}
else {
	window.ecProgress = ecProgress
	if (typeof define === "function" && define.amd) {
		define(function() {
			return {
				ecProgress: ecProgress
			}
		})
	}
}
})(typeof window === "undefined" ? this : window);
