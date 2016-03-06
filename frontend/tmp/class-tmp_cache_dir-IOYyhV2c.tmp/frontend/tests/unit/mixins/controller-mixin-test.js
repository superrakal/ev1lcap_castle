define('frontend/tests/unit/mixins/controller-mixin-test', ['ember', 'frontend/mixins/controller-mixin', 'qunit'], function (Ember, ControllerMixinMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | controller mixin');

  qunit.test('it works', function (assert) {
    var ControllerMixinObject, subject;
    ControllerMixinObject = Ember['default'].Object.extend(ControllerMixinMixin['default']);
    subject = ControllerMixinObject.create();
    return assert.ok(subject);
  });

});