var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
  });

  app.import('bower_components/moment/moment.js');
  app.import('bower_components/moment/locale/ru.js');
  app.import('bower_components/jquery.nicescroll/jquery.nicescroll.min.js');
  return app.toTree();
};
