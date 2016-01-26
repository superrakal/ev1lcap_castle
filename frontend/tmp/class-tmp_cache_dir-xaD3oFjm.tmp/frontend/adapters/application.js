define('frontend/adapters/application', ['exports', 'active-model-adapter', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, ActiveModelAdapter, DataAdapterMixin) {

  'use strict';

  exports['default'] = ActiveModelAdapter['default'].extend(DataAdapterMixin['default'], {
    authorizer: 'authorizer:devise',
    namespace: 'api/v1'
  });

});