define('frontend/tests/integration/components/section-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('section-component', 'Integration | Component | section component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{section-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#section-component}}\n  template block text\n{{/section-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});