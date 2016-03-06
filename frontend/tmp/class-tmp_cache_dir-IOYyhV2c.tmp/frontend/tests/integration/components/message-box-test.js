define('frontend/tests/integration/components/message-box-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('message-box', 'Integration | Component | message box', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{message-box}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#message-box}}\n  template block text\n{{/message-box}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});