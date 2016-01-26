import Ember from 'ember';
import config from './config/environment';
var Router;

Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('root', {
    path: '/'
  });
  this.route('article', {
    path: 'article/:id'
  });
  return this.route('not_found', {
    path: '/*path'
  });
});

export default Router;