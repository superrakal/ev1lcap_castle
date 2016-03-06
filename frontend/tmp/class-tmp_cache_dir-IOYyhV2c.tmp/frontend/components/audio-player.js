define('frontend/components/audio-player', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var AudioPlayerComponent;

  AudioPlayerComponent = Ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      return this.$('audio').prop("volume", 0.1);
    }
  });

  exports['default'] = AudioPlayerComponent;

});