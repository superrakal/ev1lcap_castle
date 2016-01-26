define('frontend/models/article', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Article;

  Article = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    subtitle: DS['default'].attr('string'),
    text: DS['default'].attr('string'),
    preview_text: DS['default'].attr('string'),
    category: DS['default'].attr('string'),
    image: DS['default'].attr('string'),
    created_at: DS['default'].attr('date'),
    formattedCreatedAt: (function () {
      if (!this.get('created_at')) {
        return '';
      } else {
        return moment(this.get('created_at')).fromNow();
      }
    }).property('created_at'),
    safeText: (function () {
      if (!this.get('text')) {
        return '';
      } else {
        return Ember.String.htmlSafe(this.get('text'));
      }
    }).property('text')
  });

  exports['default'] = Article;

});