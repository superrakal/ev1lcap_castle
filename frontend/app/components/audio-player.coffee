`import Ember from 'ember'`

AudioPlayerComponent = Ember.Component.extend
  didInsertElement: ->
    @$('audio').prop("volume", 0.1)

`export default AudioPlayerComponent`
