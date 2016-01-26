define('ember-simple-auth/authenticators/test', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, Ember, BaseAuthenticator) {

  'use strict';

  var RSVP = Ember['default'].RSVP;

  exports['default'] = BaseAuthenticator['default'].extend({
    restore: function restore(data) {
      return RSVP.resolve(data);
    },

    authenticate: function authenticate(data) {
      return RSVP.resolve(data);
    },

    invalidate: function invalidate() {
      return RSVP.resolve();
    }
  });

});