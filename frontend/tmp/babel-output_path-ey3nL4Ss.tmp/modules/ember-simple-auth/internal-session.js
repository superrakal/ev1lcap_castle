import Ember from 'ember';

var on = Ember.on;

export default Ember.ObjectProxy.extend(Ember.Evented, {
  authenticator: null,
  store: null,
  container: null,
  isAuthenticated: false,
  attemptedTransition: null,
  content: { authenticated: {} },

  authenticate: function authenticate() {
    var _this = this;

    var args = Array.prototype.slice.call(arguments);
    var authenticator = args.shift();
    Ember.assert('Session#authenticate requires the authenticator to be specified, was "' + authenticator + '"!', !Ember.isEmpty(authenticator));
    var theAuthenticator = this.container.lookup(authenticator);
    Ember.assert('No authenticator for factory "' + authenticator + '" could be found!', !Ember.isNone(theAuthenticator));
    return new Ember.RSVP.Promise(function (resolve, reject) {
      theAuthenticator.authenticate.apply(theAuthenticator, args).then(function (content) {
        _this._setup(authenticator, content, true);
        resolve();
      }, function (error) {
        _this._clear();
        reject(error);
      });
    });
  },

  invalidate: function invalidate() {
    var _this2 = this;

    Ember.assert('Session#invalidate requires the session to be authenticated!', this.get('isAuthenticated'));
    return new Ember.RSVP.Promise(function (resolve, reject) {
      var authenticator = _this2.container.lookup(_this2.authenticator);
      authenticator.invalidate(_this2.content.authenticated).then(function () {
        authenticator.off('sessionDataUpdated');
        _this2._clear(true);
        resolve();
      }, function (error) {
        _this2.trigger('sessionInvalidationFailed', error);
        reject(error);
      });
    });
  },

  restore: function restore() {
    var _this3 = this;

    return new Ember.RSVP.Promise(function (resolve, reject) {
      var restoredContent = _this3.store.restore();

      var _ref = restoredContent.authenticated || {};

      var authenticator = _ref.authenticator;

      if (!!authenticator) {
        delete restoredContent.authenticated.authenticator;
        _this3.container.lookup(authenticator).restore(restoredContent.authenticated).then(function (content) {
          _this3.set('content', restoredContent);
          _this3._setup(authenticator, content);
          resolve();
        }, function () {
          Ember.Logger.debug('The authenticator "' + authenticator + '" rejected to restore the session - invalidating…');
          _this3.set('content', restoredContent);
          _this3._clear();
          reject();
        });
      } else {
        delete (restoredContent || {}).authenticated;
        _this3.set('content', restoredContent);
        _this3._clear();
        reject();
      }
    });
  },

  _setup: function _setup(authenticator, authenticatedContend, trigger) {
    trigger = !!trigger && !this.get('isAuthenticated');
    this.beginPropertyChanges();
    this.setProperties({
      isAuthenticated: true,
      authenticator: authenticator
    });
    Ember.set(this.content, 'authenticated', authenticatedContend);
    this._bindToAuthenticatorEvents();
    this._updateStore();
    this.endPropertyChanges();
    if (trigger) {
      this.trigger('authenticationSucceeded');
    }
  },

  _clear: function _clear(trigger) {
    trigger = !!trigger && this.get('isAuthenticated');
    this.beginPropertyChanges();
    this.setProperties({
      isAuthenticated: false,
      authenticator: null
    });
    Ember.set(this.content, 'authenticated', {});
    this._updateStore();
    this.endPropertyChanges();
    if (trigger) {
      this.trigger('invalidationSucceeded');
    }
  },

  setUnknownProperty: function setUnknownProperty(key, value) {
    Ember.assert('"authenticated" is a reserved key used by Ember Simple Auth!', key !== 'authenticated');
    var result = this._super(key, value);
    this._updateStore();
    return result;
  },

  _updateStore: function _updateStore() {
    var data = this.content;
    if (!Ember.isEmpty(this.authenticator)) {
      Ember.set(data, 'authenticated', Ember.merge({ authenticator: this.authenticator }, data.authenticated || {}));
    }
    this.store.persist(data);
  },

  _bindToAuthenticatorEvents: function _bindToAuthenticatorEvents() {
    var _this4 = this;

    var authenticator = this.container.lookup(this.authenticator);
    authenticator.off('sessionDataUpdated');
    authenticator.off('sessionDataInvalidated');
    authenticator.on('sessionDataUpdated', function (content) {
      _this4._setup(_this4.authenticator, content);
    });
    authenticator.on('sessionDataInvalidated', function () {
      _this4._clear(true);
    });
  },

  _bindToStoreEvents: on('init', function () {
    var _this5 = this;

    this.store.on('sessionDataUpdated', function (content) {
      var _ref2 = content.authenticated || {};

      var authenticator = _ref2.authenticator;

      if (!!authenticator) {
        delete content.authenticated.authenticator;
        _this5.container.lookup(authenticator).restore(content.authenticated).then(function (authenticatedContent) {
          _this5.set('content', content);
          _this5._setup(authenticator, authenticatedContent, true);
        }, function () {
          Ember.Logger.debug('The authenticator "' + authenticator + '" rejected to restore the session - invalidating…');
          _this5.set('content', content);
          _this5._clear(true);
        });
      } else {
        _this5.set('content', content);
        _this5._clear(true);
      }
    });
  })
});