import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('audio-player', 'Integration | Component | audio player', {
  integration: true
});

test('it renders', function (assert) {
  assert.expect(2);
  this.render(hbs("{{audio-player}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#audio-player}}\n  template block text\n{{/audio-player}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});