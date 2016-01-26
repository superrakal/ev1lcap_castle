import { moduleFor, test } from 'ember-qunit';
moduleFor('route:messages', 'Unit | Route | messages', {});

test('it exists', function(assert) {
  var route;
  route = this.subject();
  return assert.ok(route);
});
