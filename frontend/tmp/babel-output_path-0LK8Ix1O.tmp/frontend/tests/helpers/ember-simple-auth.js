export { authenticateSession };
export { currentSession };
export { invalidateSession };
import Test from 'ember-simple-auth/authenticators/test';

var TEST_CONTAINER_KEY = 'authenticator:test';

function ensureAuthenticator(app, container) {
  var authenticator = container.lookup(TEST_CONTAINER_KEY);
  if (!authenticator) {
    app.register(TEST_CONTAINER_KEY, Test);
  }
}

function authenticateSession(app, sessionData) {
  var container = app.__container__;

  var session = container.lookup('service:session');
  ensureAuthenticator(app, container);
  session.authenticate(TEST_CONTAINER_KEY, sessionData);
  return wait();
}

;

function currentSession(app) {
  return app.__container__.lookup('service:session');
}

;

function invalidateSession(app) {
  var session = app.__container__.lookup('service:session');
  if (session.get('isAuthenticated')) {
    session.invalidate();
  }
  return wait();
}

;