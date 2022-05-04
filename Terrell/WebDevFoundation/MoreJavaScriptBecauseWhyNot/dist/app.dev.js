"use strict";

(function (app) {
  app.add = function (x, y) {
    return x + y;
  };

  app.subtract = function (x, y) {
    return x - y;
  };
})(window.app = window.app || {});

module.exports = app;