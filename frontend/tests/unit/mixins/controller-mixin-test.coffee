`import Ember from 'ember'`
`import ControllerMixinMixin from '../../../mixins/controller-mixin'`
`import { module, test } from 'qunit'`

module 'Unit | Mixin | controller mixin'

# Replace this with your real tests.
test 'it works', (assert) ->
  ControllerMixinObject = Ember.Object.extend ControllerMixinMixin
  subject = ControllerMixinObject.create()
  assert.ok subject
