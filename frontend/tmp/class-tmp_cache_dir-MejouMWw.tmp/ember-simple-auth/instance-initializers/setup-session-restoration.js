define('ember-simple-auth/instance-initializers/setup-session-restoration', ['exports', 'ember-simple-auth/utils/lookup'], function (exports, lookup) {

  'use strict';



  exports['default'] = setupSessionRestoration;
  function setupSessionRestoration(instance) {
    var applicationRoute = lookup['default'](instance, 'route:application');
    var session = lookup['default'](instance, 'session:main');
    var originalBeforeModel = applicationRoute.beforeModel;
    var applyOriginalBeforeModel = function applyOriginalBeforeModel() {
      return originalBeforeModel.apply(applicationRoute, arguments);
    };
    applicationRoute.reopen({
      beforeModel: function beforeModel() {
        var _arguments = arguments;

        return session.restore().then(function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        }, function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        });
      }
    });
  }

});