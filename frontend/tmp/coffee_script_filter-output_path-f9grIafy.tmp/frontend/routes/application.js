import Ember from 'ember';
var ApplicationRoute;

ApplicationRoute = Ember.Route.extend({
  activate: function() {
    return Ember.run.later((function() {
      return $("body").niceScroll({
        cursorcolor: "#2ebaae"
      });
    }), 10);
  }
});

export default ApplicationRoute;
