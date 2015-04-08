'use strict';

module.exports = {
  standalone: function() {
    return require('./dist/dependency-injection.js');
  },

  MVC: function() {
    return require('./dist/mvc-injection.js');
  },

  MVVM: function() {
    return require('./dist/mvvm-injection.js');
  }
};
