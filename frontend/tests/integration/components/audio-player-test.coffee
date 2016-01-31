`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'audio-player', 'Integration | Component | audio player', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{audio-player}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#audio-player}}
      template block text
    {{/audio-player}}
  """

  assert.equal @$().text().trim(), 'template block text'
