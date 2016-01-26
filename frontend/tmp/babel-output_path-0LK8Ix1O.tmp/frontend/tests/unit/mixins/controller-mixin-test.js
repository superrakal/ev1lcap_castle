import Ember from 'ember';
import ControllerMixinMixin from '../../../mixins/controller-mixin';
import { module, test } from 'qunit';
module('Unit | Mixin | controller mixin');

test('it works', function (assert) {
  var ControllerMixinObject, subject;
  ControllerMixinObject = Ember.Object.extend(ControllerMixinMixin);
  subject = ControllerMixinObject.create();
  return assert.ok(subject);
});