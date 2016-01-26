import DS from 'ember-data';
var Article;

Article = DS.Model.extend({
  title: DS.attr('string'),
  subtitle: DS.attr('string'),
  text: DS.attr('string'),
  preview_text: DS.attr('string'),
  category: DS.attr('string'),
  image: DS.attr('string'),
  created_at: DS.attr('date'),
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

export default Article;