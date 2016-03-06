`import DS from 'ember-data'`

Article = DS.Model.extend
  title:          DS.attr 'string'
  subtitle:       DS.attr 'string'
  text:           DS.attr 'string'
  preview_text:   DS.attr 'string'
  category:       DS.attr 'string'
  city:           DS.attr 'string'
  music_link:     DS.attr 'string'
  image_link:     DS.attr 'string'

  visitors_count: DS.attr 'number'

  created_at:     DS.attr 'date'

  formattedCreatedAt: (->
    if !@get('created_at') then '' else moment(@get('created_at')).fromNow()
  ).property('created_at')

  safeText: (->
    if !@get('text') then '' else Ember.String.htmlSafe(@get 'text')
  ).property('text')

`export default Article`
