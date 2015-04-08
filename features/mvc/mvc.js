(function(root) {
  'use strict';

  var MVCInjection = module && module.exports || root.MVCInjection;

  // Constants

  MVCInjection.registerInterface('constant');

  // Models

  MVCInjection.registerInterface('model', ['constant', 'factory', 'service']);
  MVCInjection.registerInterface('factory', ['constant', 'model', 'service']);
  MVCInjection.registerInterface('service', ['constant', 'model', 'factory']);

  // Controllers

  MVCInjection.registerInterface('controller', ['constant', 'model', 'factory', 'service']);

  // Views

  MVCInjection.registerInterface('view', ['constant', 'model', 'factory', 'service', 'converter']);
  MVCInjection.registerInterface('converter', ['constant', 'model', 'factory', 'service', 'view']);

})(this);
