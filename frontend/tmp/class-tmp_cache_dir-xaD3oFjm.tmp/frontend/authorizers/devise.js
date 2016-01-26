define('frontend/authorizers/devise', ['exports', 'ember-simple-auth/authorizers/devise'], function (exports, DeviseAuthorizer) {

	'use strict';

	exports['default'] = DeviseAuthorizer['default'].extend({});

});