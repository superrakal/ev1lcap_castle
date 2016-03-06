define('frontend/routes/article', ['exports', 'ember', 'frontend/mixins/reset-scroll'], function (exports, Ember, ResetScrollMixin) {

  'use strict';

  var ArticleRoute;

  ArticleRoute = Ember['default'].Route.extend(ResetScrollMixin['default'], {
    model: function model(params) {
      return this.store.find('article', params.id);
    },
    setupController: function setupController(controller, model) {
      return controller.set('article', model);
    }
  });

  exports['default'] = ArticleRoute;

});