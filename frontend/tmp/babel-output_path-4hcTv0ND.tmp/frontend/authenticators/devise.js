import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';

export default DeviseAuthenticator.extend({
  key: 'nsuask:session',
  serverTokenEndpoint: '/api/v1/authenticate'
});