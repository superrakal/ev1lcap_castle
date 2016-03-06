import Ember from 'ember';
var AudioPlayerComponent;

AudioPlayerComponent = Ember.Component.extend({
  didInsertElement: function didInsertElement() {
    return this.$('audio').prop("volume", 0.1);
  }
});

export default AudioPlayerComponent;