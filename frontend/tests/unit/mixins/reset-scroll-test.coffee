`import Ember from 'ember'`
`import ResetScrollMixin from '../../../mixins/reset-scroll'`
`import { module, test } from 'qunit'`

module 'Unit | Mixin | reset scroll'

# Replace this with your real tests.
test 'it works', (assert) ->
  ResetScrollObject = Ember.Object.extend ResetScrollMixin
  subject = ResetScrollObject.create()
  assert.ok subject
