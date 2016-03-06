define('frontend/routes/root', ['exports', 'ember', 'ember-infinity/mixins/route', 'frontend/mixins/reset-scroll'], function (exports, Ember, InfinityRoute, ResetScrollMixin) {

  'use strict';

  var RootRoute;

  RootRoute = Ember['default'].Route.extend(InfinityRoute['default'], ResetScrollMixin['default'], {
    queryParams: {
      category: {
        refreshModel: true
      }
    },
    model: function model(params) {
      return this.infinityModel("article", {
        perPage: 10,
        startingPage: 1,
        category: params["category"]
      });
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = RootRoute;

});