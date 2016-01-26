define('ember-simple-auth/mixins/unauthenticated-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, Ember, Configuration) {

  'use strict';

  var service = Ember['default'].inject.service;

  /**
    __This mixin is used to make routes accessible only if the session is
    not authenticated__ (e.g. login and registration routes). It defines a
    `beforeModel` method that aborts the current transition and instead
    transitions to the
    {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}
    if the session is authenticated.

    ```js
    // app/routes/login.js
    import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

    export default Ember.Route.extend(UnauthenticatedRouteMixin);
    ```

    @class UnauthenticatedRouteMixin
    @module ember-simple-auth/mixins/unauthenticated-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = Ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      Checks whether the session is authenticated and if it is aborts the current
      transition and instead transitions to the
      {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}.
       __If `beforeModel` is overridden in a route that uses this mixin, the route's
     implementation must call `this._super(...arguments)`__ so that the mixin's
     `beforeModel` method is actually executed.
       @method beforeModel
      @param {Transition} transition The transition that lead to this route
      @public
    */
    beforeModel: function beforeModel(transition) {
      if (this.get('session').get('isAuthenticated')) {
        transition.abort();
        Ember['default'].assert('The route configured as Configuration.routeIfAlreadyAuthenticated cannot implement the UnauthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== Configuration['default'].routeIfAlreadyAuthenticated);
        this.transitionTo(Configuration['default'].routeIfAlreadyAuthenticated);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });

});