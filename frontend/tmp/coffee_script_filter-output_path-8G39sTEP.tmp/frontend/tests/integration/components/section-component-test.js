import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('section-component', 'Integration | Component | section component', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs("{{section-component}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#section-component}}\n  template block text\n{{/section-component}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});
