define('frontend/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise'], function (exports, DeviseAuthenticator) {

  'use strict';

  exports['default'] = DeviseAuthenticator['default'].extend({
    key: 'nsuask:session',
    serverTokenEndpoint: '/api/v1/authenticate'
  });

});