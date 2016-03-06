import { moduleForModel, test } from 'ember-qunit';
moduleForModel('article', 'Unit | Model | article', {
  needs: []
});

test('it exists', function(assert) {
  var model;
  model = this.subject();
  return assert.ok(!!model);
});
