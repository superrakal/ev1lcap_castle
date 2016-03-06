import { moduleForModel, test } from 'ember-qunit';
moduleForModel('message', 'Unit | Model | message', {
  needs: []
});

test('it exists', function (assert) {
  var model;
  model = this.subject();
  return assert.ok(!!model);
});