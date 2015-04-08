(function(root) {
  'use strict';

  var DependencyInjection = module && module.exports || root.DependencyInjection;

  // Models

  DependencyInjection.registerInterface('model', ['factory', 'service']);
  DependencyInjection.registerInterface('factory', ['model', 'service']);
  DependencyInjection.registerInterface('service', ['model', 'factory']);

  // Controllers

  DependencyInjection.registerInterface('controller', ['model', 'factory', 'service']);

  // Views

  DependencyInjection.registerInterface('view', ['model', 'factory', 'service', 'converter']);
  DependencyInjection.registerInterface('converter', ['model', 'factory', 'service', 'view']);

})(this);
