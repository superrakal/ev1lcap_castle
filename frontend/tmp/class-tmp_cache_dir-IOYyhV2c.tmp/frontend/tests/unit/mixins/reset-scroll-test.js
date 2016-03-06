define('frontend/tests/unit/mixins/reset-scroll-test', ['ember', 'frontend/mixins/reset-scroll', 'qunit'], function (Ember, ResetScrollMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | reset scroll');

  qunit.test('it works', function (assert) {
    var ResetScrollObject, subject;
    ResetScrollObject = Ember['default'].Object.extend(ResetScrollMixin['default']);
    subject = ResetScrollObject.create();
    return assert.ok(subject);
  });

});