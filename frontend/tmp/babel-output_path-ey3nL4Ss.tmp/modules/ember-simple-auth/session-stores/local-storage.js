/* global localStorage */
import Ember from 'ember';
import BaseStore from './base';
import objectsAreEqual from '../utils/objects-are-equal';

var on = Ember.on;

/**
  Session store that persists data in the browser's `localStorage`.

  __`localStorage` is not available in Safari when running in private mode. In
  general it is better to use the
  {{#crossLink "AdaptiveStore"}}{{/crossLink}} that automatically falls back to
  the {{#crossLink "CookieStore"}}{{/crossLink}} when `localStorage` is not
  available.__

  @class LocalStorageStore
  @module ember-simple-auth/session-stores/local-storage
  @extends BaseStore
  @public
*/
export default BaseStore.extend({
  /**
    The `localStorage` key the store persists data in.
     @property key
    @type String
    @default 'ember_simple_auth:session'
    @public
  */
  key: 'ember_simple_auth:session',

  _setup: on('init', function () {
    this._bindToStorageEvents();
  }),

  /**
    Persists the `data` in the `localStorage`.
     @method persist
    @param {Object} data The data to persist
    @public
  */
  persist: function persist(data) {
    data = JSON.stringify(data || {});
    localStorage.setItem(this.key, data);
    this._lastData = this.restore();
  },

  /**
    Returns all data currently stored in the `localStorage` as a plain object.
     @method restore
    @return {Object} The data currently persisted in the `localStorage`.
    @public
  */
  restore: function restore() {
    var data = localStorage.getItem(this.key);
    return JSON.parse(data) || {};
  },

  /**
    Clears the store by deleting the
    {{#crossLink "LocalStorageStore/key:property"}}{{/crossLink}} from
    `localStorage`.
     @method clear
    @public
  */
  clear: function clear() {
    localStorage.removeItem(this.key);
    this._lastData = {};
  },

  _bindToStorageEvents: function _bindToStorageEvents() {
    var _this = this;

    Ember.$(window).bind('storage', function () {
      var data = _this.restore();
      if (!objectsAreEqual(data, _this._lastData)) {
        _this._lastData = data;
        _this.trigger('sessionDataUpdated', data);
      }
    });
  }
});