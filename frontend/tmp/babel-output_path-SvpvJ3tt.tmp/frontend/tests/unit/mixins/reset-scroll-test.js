import Ember from 'ember';
import ResetScrollMixin from '../../../mixins/reset-scroll';
import { module, test } from 'qunit';
module('Unit | Mixin | reset scroll');

test('it works', function (assert) {
  var ResetScrollObject, subject;
  ResetScrollObject = Ember.Object.extend(ResetScrollMixin);
  subject = ResetScrollObject.create();
  return assert.ok(subject);
});