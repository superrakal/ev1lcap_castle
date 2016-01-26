import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";
var RootRoute;

RootRoute = Ember.Route.extend(InfinityRoute, {
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

export default RootRoute;