define('frontend/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, Ember, ApplicationRouteMixin) {

	'use strict';

	var ApplicationRoute = Ember['default'].Route.extend(ApplicationRouteMixin['default'], {});

	exports['default'] = ApplicationRoute;

});