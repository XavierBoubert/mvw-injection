# MVW-Injection

Dependency Injection module for MV-Whatever patterns!

## Follow the project

* [Licence](https://github.com/XavierBoubert/mvw-injection/blob/master/LICENSE)
* [Changelog](https://github.com/XavierBoubert/mvw-injection/blob/master/CHANGELOG.md)
* [Milestones](https://github.com/XavierBoubert/mvw-injection/issues/milestones?state=open)

## Installation

### MVC patterns

Use the CDN version:
```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/mvw-injection/0.1.0/mvc-injection.min.js"></script>
```

Or copy the [dist](https://github.com/XavierBoubert/mvw-injection/tree/master/dist) folder into your project and include ```mvc-injection.js``` or ```mvc-injection.min.js``` (production) file in your HTML page or your node project.

### MVVM patterns

Use the CDN version:
```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/mvw-injection/0.1.0/mvvm-injection.min.js"></script>
```

Or copy the [dist](https://github.com/XavierBoubert/mvw-injection/tree/master/dist) folder into your project and include ```mvvm-injection.js``` or ```mvvm-injection.min.js``` (production) file in your HTML page or your node project.

### Standalone

If you want to apply you own patterns, you can use the base module.

Use the CDN version:
```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/mvw-injection/0.1.0/dependency-injection.min.js"></script>
```

Or copy the [dist](https://github.com/XavierBoubert/mvw-injection/tree/master/dist) folder into your project and include ```dependency-injection.js``` or ```dependency-injection.min.js``` (production) file in your page HTML or your node project.

You can [add you own interfaces](#create-custom-patterns) with ```DependencyInjection.registerInterface()```.

## How to use

 - [Introduction](#introduction)
 - [Node.js or Browser](#node-or-browser)
 - [Create dependencies](#create-dependencies)
 - [Inject dependencies](#inject-dependencies)
 - [Packaged dependencies](#packaged-dependencies)
 - [MVC](#mvc)
 - [MVVM](#mvvm)
 - [Create custom patterns](#create-custom-patterns)

### Introduction

MVW-Injection offers a structure to use dependency injection in a MV-Whatever way, i.e. with any pattern you want. It comes with MVC and MVVM patterns that you can include in your projects. Each dependency is contained in a M, V, C or VM package and can only be used by a package which has the rights from the pattern (i.e. M dependencies can't be used by V and so on).

### Node or Browser

The module can be used in node with:
```
npm install mvw-injection
```

Get the pattern you want:
```javascript
var MVCInjection = require('mvw-injection').MVC();

var MVVMInjection = require('mvw-injection').MVVM();

var DependencyInjection = require('mvw-injection').Standalone();
```

It can be used in the browser too:
```
bower install mvw-injection
```

Then include in your page the pattern file you need and use ```window.DependencyInjection```.

### Create dependencies

According to the pattern used, you can create your packaged dependencies that will be injected later on.

Register a dependency:
```javascript

// "model" is a method provided by the MVC pattern
// "User" is the defined name of the dependency
MVCInjection.model('User', function() {

  return function User(name) {
    this.name = name;
  };

});
```

When a package will need the ```User``` dependency, this function will be called once and return the User class. This function will never be called again as its result is cached. So any subsequent injection of the `User` dependency will return a reference to the first call generated dependency.

### Inject dependencies

A dependency or a custom function called with ```invoke()``` can include dependencies that will be injected.

Register a dependency that needs an other dependency:
```javascript

// "User" is the dependency created before.
// It is automatically executed and the result is sent to the "ActiveUser" service.
MVCInjection.service('ActiveUser', function(User) {

  function ActiveUser() {
    User.call(this, 'Xavier Boubert');
  }

  return new ActiveUser();

});
```

Execute a custom function which needs ```ActiveUser```:
```javascript

// Each pattern method can be used with an "injector":
// invoke() execute the function with dependencies injection
MVCInjection.injector.factory.invoke(function(ActiveUser) {

  // display "Xavier Boubert";
  console.log(ActiveUser.name);

});
```

When you invoke a function, you can pass custom dependencies in the second argument:
```javascript

MVCInjection.injector.factory.invoke(function(MyCustomDept, ActiveUser) {
  // ...
}, {

  // Dependencies needs to be stacked in a declared interface
  view: {

    // This dependency will only be defined in the invoked function.
    // It can use other dependencies relative to its packaged interface.
    MyCustomDept: function(User) {
      return function MyCustomDept() {
        // ...
      };
    }
  }
});
```

:exclamation: If you want to minify your JavaScript files, you will run into an issue with injection, because the module extracts the required dependencies by their name (that can be obfuscated with some minification tools). To avoid this, you can use the following syntax:
```javascript

// Use an Array with the dependencies in the right order and
// include the function at the end.
MVCInjection.service('ActiveUser', ['User', function(User) {

  // ...

}]);
```

### Packaged dependencies

According to the pattern used, a dependency can't call dependencies that belongs to another kind of element.

For example, in the MVCInjection, a dependency registered in ```MVCInjection.model()``` does't have access to ```MVCInjection.view()``` dependencies.

See the next chapters to known all patterns details rules.

### MVC

[See details of the MVC pattern](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

#### Models

| Dependency from         | Used to                                     | Can inject                          |
| ----------------------- | ------------------------------------------- | ----------------------------------- |
| ```model()```           | Create model classes                        | ```factory()``` and ```service()``` |
| ```factory()```         | Instantiation of classes                    | ```model()``` and ```service()```   |
| ```service()```         | Create singletons                           | ```model()``` and ```factory()```   |

#### Controllers

| Dependency from    | Used to          | Can inject                                         |
| ------------------ | ---------------- | -------------------------------------------------- |
| ```controller()``` | Get user actions | ```model()```, ```factory()``` and ```service()``` |

#### Views

| Dependency from   | Used to | Can inject  |
| ----------------- | ------- | ----------- |
| ```view()```      | Visible by the user | ```model()```, ```factory()```, ```service()``` and ```converter()``` |
| ```converter()``` | Transform data for a view component | ```model()```, ```factory()```, ```service()``` and ```view()``` |

### MVVM

[See details of the MVVM pattern](http://en.wikipedia.org/wiki/Model_View_ViewModel).

#### Models

| Dependency from | Used to | Can inject |
| --------------- | ------- | ---------- |
| ```model()```   | Create model classes | ```viewmodel()```, ```factory()``` and ```service()``` |
| ```factory()``` | Instantiation of classes | ```viewmodel()```, ```model()``` and ```service()``` |
| ```service()``` | Create singletons | ```viewmodel()```, ```model()``` and ```factory()``` |

#### ViewModels

| Dependency from | Used to | Can inject |
| --------------- | ------- | ---------- |
| ```viewmodel()``` | Make the link between views and models | ```model()```, ```factory()```, ```service()```, ```view()``` and ```converter()``` |

#### Views

| Dependency from   | Used to | Can inject  |
| ----------------- | ------- | ----------- |
| ```view()```      | Visible by the user | ```viewmodel()``` and ```converter()``` |
| ```converter()``` | Transform data for a view component | ```viewmodel()``` and ```view()``` |


### Create custom patterns

If you use the Standalone version, you can add you own patterns. Use ```DependencyInjection.registerInterface()``` to create new interfaces:
```javascript

// Register the "model" as a new package method.
// The second argument is the list of other interfaces that "model" can inject their dependencies
DependencyInjection.registerInterface('model', ['viewmodel', 'factory', 'service']);
```

## Contribute

To contribute to the project, read the [Contribution guidelines](https://github.com/XavierBoubert/mvw-injection/blob/master/CONTRIBUTING.md).
After that, you can create your own Pull Requests (PR) and submit them here.

## Lead contribution team

* [Xavier Boubert](http://xavierboubert.fr) [@xavierboubert](http://twitter.com/XavierBoubert)
