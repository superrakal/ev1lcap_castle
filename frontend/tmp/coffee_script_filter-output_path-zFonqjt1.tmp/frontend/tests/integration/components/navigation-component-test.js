import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('navigation-component', 'Integration | Component | navigation component', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs("{{navigation-component}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#navigation-component}}\n  template block text\n{{/navigation-component}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});
