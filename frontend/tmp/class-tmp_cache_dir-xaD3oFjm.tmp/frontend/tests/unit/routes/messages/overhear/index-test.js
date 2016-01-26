define('frontend/tests/unit/routes/messages/overhear/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/overhear/index', 'Unit | Route | messages/overhear/index', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});