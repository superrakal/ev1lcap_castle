define('frontend/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ApplicationRoute;

  ApplicationRoute = Ember['default'].Route.extend({
    activate: function activate() {
      return Ember['default'].run.later(function () {
        return $("body").niceScroll({
          cursorcolor: "#2ebaae"
        });
      }, 10);
    }
  });

  exports['default'] = ApplicationRoute;

});