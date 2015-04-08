'use strict';

var MVCInjection = require('./dist/mvc-injection.js');

MVCInjection.model('User', function() {
  return function User(name) {
    this.name = name;
  };
});

MVCInjection.service('ActiveUserService', function(User) {
  return new User('Xavier Boubert');
});

MVCInjection.injector.view.invoke(function(ActiveUserService) {
  console.log(ActiveUserService);
});
