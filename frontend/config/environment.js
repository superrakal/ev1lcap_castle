/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
      }
    },
    APP: {
    }
  };
  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'admin',
    routeIfAlreadyAuthenticated: 'admin'
  };

  return ENV;
};
