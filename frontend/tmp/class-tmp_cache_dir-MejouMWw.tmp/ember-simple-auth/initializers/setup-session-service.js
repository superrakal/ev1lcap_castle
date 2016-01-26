define('ember-simple-auth/initializers/setup-session-service', ['exports', 'ember-simple-auth/utils/inject'], function (exports, inject) {

  'use strict';



  exports['default'] = setupSessionStore;
  function setupSessionStore(registry) {
    inject['default'](registry, 'service:session', 'session', 'session:main');
  }

});