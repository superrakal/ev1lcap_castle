define('frontend/tests/unit/routes/messages/besit/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/besit/index', 'Unit | Route | messages/besit/index', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});