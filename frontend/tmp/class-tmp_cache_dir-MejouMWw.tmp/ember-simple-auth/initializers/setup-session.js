define('ember-simple-auth/initializers/setup-session', ['exports', 'ember', 'ember-simple-auth/internal-session', 'ember-simple-auth/session-stores/ephemeral', 'ember-simple-auth/utils/inject'], function (exports, Ember, InternalSession, Ephemeral, inject) {

  'use strict';



  exports['default'] = setupSession;
  function setupSession(registry) {
    registry.register('session:main', InternalSession['default']);

    var store = 'session-store:application';
    if (Ember['default'].testing) {
      store = 'session-store:test';
      registry.register(store, Ephemeral['default']);
    }
    inject['default'](registry, 'session:main', 'store', store);
  }

});