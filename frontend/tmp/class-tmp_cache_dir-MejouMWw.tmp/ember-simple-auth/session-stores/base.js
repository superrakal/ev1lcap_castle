define('ember-simple-auth/session-stores/base', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend(Ember['default'].Evented, {
    /**
      Triggered when the session store's data changes due to an external event,
      e.g. from another tab or window of the same application. The session
      handles that event, passes the updated data to its authenticator's
      {{#crossLink "BaseAuthenticator/restore:method"}}{{/crossLink}} method and
      handles the result of that invocation accordingly.
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      Persists the `data`. This replaces all currently stored data.
       `BaseStores`'s implementation does nothing. __This method must be
      overridden in subclasses__.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist() {},

    /**
      Returns all data currently stored as a plain object.
       `BaseStores`'s implementation returns an empty object. __This method must
      be overridden in subclasses__.
       @method restore
      @return {Object} The data currently persisted in the store.
      @public
    */
    restore: function restore() {
      return {};
    },

    /**
      Clears the store.
       `BaseStores`'s implementation does nothing. __This method must be
      overridden in subclasses__.
       @method clear
      @public
    */
    clear: function clear() {}
  });

});