`import DS from 'ember-data'`

Article = DS.Model.extend
  title:        DS.attr 'string'
  subtitle:     DS.attr 'string'
  text:         DS.attr 'string'
  preview_text: DS.attr 'string'
  category:     DS.attr 'string'
  image:        DS.attr 'string'
  city:         DS.attr 'string'
  created_at:   DS.attr 'date'

  formattedCreatedAt: (->
    if !@get('created_at') then '' else moment(@get('created_at')).fromNow()
  ).property('created_at')

  safeText: (->
    if !@get('text') then '' else Ember.String.htmlSafe(@get 'text')
  ).property('text')

`export default Article`
