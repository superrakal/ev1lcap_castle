define('frontend/mixins/reset-scroll', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ResetScrollMixin;

  ResetScrollMixin = Ember['default'].Mixin.create({
    activate: function activate() {
      this._super();
      return window.scrollTo(0, 0);
    }
  });

  exports['default'] = ResetScrollMixin;

});