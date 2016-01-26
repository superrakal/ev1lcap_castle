export default {
  name: "session",

  initialize: function initialize(app) {
    var session = app.container.lookup('service:session');
    window.authorizeUser = function (xhr) {
      session.authorize('authorizer:devise', function (headerName, headerValue) {
        xhr.setRequestHeader(headerName, headerValue);
      });
    };
    app.registry.injection('route', 'session', 'service:session');
    app.registry.injection('controller', 'session', 'service:session');
    app.registry.injection('component', 'session', 'service:session');
  }
};