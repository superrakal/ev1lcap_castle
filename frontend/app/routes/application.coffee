`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend
  activate: ->
    Ember.run.later(( ->
      $("body").niceScroll({cursorcolor: "#2ebaae"})
    ), 10)
`export default ApplicationRoute`
