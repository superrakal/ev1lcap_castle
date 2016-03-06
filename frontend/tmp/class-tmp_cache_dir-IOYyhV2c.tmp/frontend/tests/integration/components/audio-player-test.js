define('frontend/tests/integration/components/audio-player-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('audio-player', 'Integration | Component | audio player', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{audio-player}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#audio-player}}\n  template block text\n{{/audio-player}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});