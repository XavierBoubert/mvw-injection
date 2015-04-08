(function(root) {
  'use strict';

  var DependencyInjection = module && module.exports || root.DependencyInjection;

  // Models

  DependencyInjection.registerInterface('model', ['viewmodel', 'factory', 'service']);
  DependencyInjection.registerInterface('factory', ['viewmodel', 'model', 'service']);
  DependencyInjection.registerInterface('service', ['viewmodel', 'model', 'factory']);

  // ViewModels

  DependencyInjection.registerInterface('viewmodel', ['model', 'factory', 'service', 'view', 'converter']);

  // Views

  DependencyInjection.registerInterface('view', ['viewmodel', 'converter']);
  DependencyInjection.registerInterface('converter', ['viewmodel', 'view']);

})(this);
