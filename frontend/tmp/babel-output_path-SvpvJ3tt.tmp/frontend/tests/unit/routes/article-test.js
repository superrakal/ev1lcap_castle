import { moduleFor, test } from 'ember-qunit';
moduleFor('route:article', 'Unit | Route | article', {});

test('it exists', function (assert) {
  var route;
  route = this.subject();
  return assert.ok(route);
});