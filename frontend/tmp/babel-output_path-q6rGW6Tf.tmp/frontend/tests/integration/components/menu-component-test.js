import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('menu-component', 'Integration | Component | menu component', {
  integration: true
});

test('it renders', function (assert) {
  assert.expect(2);
  this.render(hbs("{{menu-component}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#menu-component}}\n  template block text\n{{/menu-component}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});