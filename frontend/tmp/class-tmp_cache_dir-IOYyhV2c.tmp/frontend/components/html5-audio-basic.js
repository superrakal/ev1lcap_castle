define('frontend/components/html5-audio-basic', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  //import/export concept -> ES6 modules -> http://jsmodules.io/

  exports['default'] = Ember['default'].Component.extend({
    //if no url is passed in, let's play a default song
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Test_ogg_mp3_48kbps.wav',
    src: Ember['default'].computed('url', 'length', 'width', function () {
      if (this.get('url') === undefined) {
        //an unresolved url is passed in
        return 'http://example.com/undefined.mp3';
      } else {
        //after the bound attribute is resolved.
        return this.get('url');
      }
    })
  });

});