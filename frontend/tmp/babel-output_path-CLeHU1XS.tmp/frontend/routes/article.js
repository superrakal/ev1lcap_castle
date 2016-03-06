import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';
var ArticleRoute;

ArticleRoute = Ember.Route.extend(ResetScrollMixin, {
  model: function model(params) {
    return this.store.find('article', params.id);
  },
  setupController: function setupController(controller, model) {
    return controller.set('article', model);
  }
});

export default ArticleRoute;