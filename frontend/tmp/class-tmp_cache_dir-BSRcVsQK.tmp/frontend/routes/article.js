define('frontend/routes/article', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ArticleRoute;

  ArticleRoute = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find('article', params.id);
    },
    setupController: function setupController(controller, model) {
      return controller.set('article', model);
    }
  });

  exports['default'] = ArticleRoute;

});