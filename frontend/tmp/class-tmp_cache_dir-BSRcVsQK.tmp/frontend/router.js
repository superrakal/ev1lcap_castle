define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router;

  Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('root', {
      path: '/'
    });
    this.route('article', {
      path: 'article/:id'
    });
    return this.route('not_found', {
      path: '/*path'
    });
  });

  exports['default'] = Router;

});