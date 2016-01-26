import Ember from 'ember';
var ArticleRoute;

ArticleRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('article', params.id);
  },
  setupController: function(controller, model) {
    return controller.set('article', model);
  }
});

export default ArticleRoute;
