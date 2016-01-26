var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
  });

  app.import('bower_components/hint.css/hint.css');
  app.import('bower_components/moment/moment.js');
  app.import('bower_components/moment/locale/ru.js');

  return app.toTree();
};
