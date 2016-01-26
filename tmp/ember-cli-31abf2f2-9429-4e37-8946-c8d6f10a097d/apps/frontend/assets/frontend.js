/* jshint ignore:start */

/* jshint ignore:end */

define('frontend/adapters/application', ['exports', 'active-model-adapter'], function (exports, ActiveModelAdapter) {

  'use strict';

  exports['default'] = ActiveModelAdapter['default'].extend({
    namespace: 'api/v1'
  });

});
define('frontend/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'frontend/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default'],
    rootElement: '#ember'
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  $(function () {
    var token;
    token = $('meta[name="csrf-token"]').attr('content');
    return $.ajaxPrefilter(function (options, originalOptions, xhr) {
      return xhr.setRequestHeader('X-CSRF-Token', token);
    });
  });

  exports['default'] = App;

});
define('frontend/components/menu-component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var MenuComponentComponent;

	MenuComponentComponent = Ember['default'].Component.extend();

	exports['default'] = MenuComponentComponent;

});
define('frontend/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ApplicationController;

  ApplicationController = Ember['default'].Controller.extend({
    isHelperBlockVisible: false,
    helperMessage: '',
    actions: {
      toggleHelper: function toggleHelper() {
        return $('.helper-block').stop().animate({
          height: "toggle"
        });
      },
      sendMessage: function sendMessage() {
        var message;
        this.set('helperMessage', $.trim(this.get('helperMessage')));
        if (this.get('helperMessage').length > 0) {
          message = this.get('helperMessage');
          return Ember['default'].$.ajax({
            type: 'GET',
            url: "/welcome/send_message?message=" + message,
            async: true,
            success: (function (_this) {
              return function () {
                alert('a');
                return _this.set('helperMessage', '');
              };
            })(this)
          });
        }
      }
    }
  });

  exports['default'] = ApplicationController;

});
define('frontend/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('frontend/controllers/messages/besit/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var MessagesBesitNewController;

  MessagesBesitNewController = Ember['default'].Controller.extend({
    actions: {
      send: function send() {
        var model;
        model = this.get('model');
        model.set('text', $.trim(model.get('text')));
        if (model.get('text').length > 0) {
          return model.save().then((function (_this) {
            return function () {
              return _this.transitionTo('messages.success');
            };
          })(this));
        }
      }
    }
  });

  exports['default'] = MessagesBesitNewController;

});
define('frontend/controllers/messages/love/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var MessagesLoveNewController;

  MessagesLoveNewController = Ember['default'].Controller.extend({
    actions: {
      send: function send() {
        var model;
        model = this.get('model');
        model.set('text', $.trim(model.get('text')));
        if (model.get('text').length > 0) {
          return model.save().then((function (_this) {
            return function () {
              return _this.transitionTo('messages.success');
            };
          })(this));
        }
      }
    }
  });

  exports['default'] = MessagesLoveNewController;

});
define('frontend/controllers/messages/overhear/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var MessagesOverhearNewController;

  MessagesOverhearNewController = Ember['default'].Controller.extend({
    actions: {
      send: function send() {
        var model;
        model = this.get('model');
        model.set('text', $.trim(model.get('text')));
        if (model.get('text').length > 0) {
          return model.save().then((function (_this) {
            return function () {
              return _this.transitionTo('messages.success');
            };
          })(this));
        }
      }
    }
  });

  exports['default'] = MessagesOverhearNewController;

});
define('frontend/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('frontend/initializers/active-model-adapter', ['exports', 'active-model-adapter', 'active-model-adapter/active-model-serializer'], function (exports, ActiveModelAdapter, ActiveModelSerializer) {

  'use strict';

  exports['default'] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', ActiveModelAdapter['default']);
      application.register('serializer:-active-model', ActiveModelSerializer['default']);
    }
  };

});
define('frontend/initializers/export-application-global', ['exports', 'ember', 'frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('frontend/instance-initializers/app-version', ['exports', 'frontend/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('frontend/models/message', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Message;

  Message = DS['default'].Model.extend({
    text: DS['default'].attr('string'),
    category: DS['default'].attr('string'),
    state: DS['default'].attr('string', {
      defaultValue: "new"
    })
  });

  exports['default'] = Message;

});
define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router;

  Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('root', {
      path: '/'
    });
    return this.resource('messages', function () {
      this.resource('messages.overhear', {
        path: '/overhear'
      }, function () {
        return this.route('new');
      });
      this.resource('messages.love', function () {
        return this.route('new');
      });
      this.resource('messages.besit', function () {
        return this.route('new');
      });
      return this.route('success');
    });
  });

  exports['default'] = Router;

});
define('frontend/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ApplicationRoute;

  ApplicationRoute = Ember['default'].Route.extend({
    actions: {
      loading: function loading() {
        $('html').append('<div class="preloader-wrapper"><div class="preloader"><i class="fa fa-refresh fa-spin fa-5x"></i><h1>NSU.ask</h1><h4>@ev1lcap</h4></div></div>');
        return this.router.one('didTransition', function () {
          $('.preloader-wrapper').stop().fadeOut();
          return $('.preloader-wrapper').remove();
        });
      }
    }
  });

  exports['default'] = ApplicationRoute;

});
define('frontend/routes/messages', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var MessagesRoute;

	MessagesRoute = Ember['default'].Route.extend();

	exports['default'] = MessagesRoute;

});
define('frontend/routes/messages/besit', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var MessagesBesitRoute;

	MessagesBesitRoute = Ember['default'].Route.extend();

	exports['default'] = MessagesBesitRoute;

});
define('frontend/routes/messages/besit/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var MessagesBesitNewRoute;

  MessagesBesitNewRoute = Ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('message');
    },
    setupController: function setupController(controller, model) {
      model.set('category', 'besit');
      return controller.set('model', model);
    }
  });

  exports['default'] = MessagesBesitNewRoute;

});
define('frontend/routes/messages/love', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var MessagesLoveRoute;

	MessagesLoveRoute = Ember['default'].Route.extend();

	exports['default'] = MessagesLoveRoute;

});
define('frontend/routes/messages/love/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var MessagesLoveNewRoute;

  MessagesLoveNewRoute = Ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('message');
    },
    setupController: function setupController(controller, model) {
      model.set('category', 'love');
      return controller.set('model', model);
    }
  });

  exports['default'] = MessagesLoveNewRoute;

});
define('frontend/routes/messages/overhear', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var MessagesOverhearRoute;

	MessagesOverhearRoute = Ember['default'].Route.extend();

	exports['default'] = MessagesOverhearRoute;

});
define('frontend/routes/messages/overhear/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var MessagesOverhearNewRoute;

  MessagesOverhearNewRoute = Ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('message');
    },
    setupController: function setupController(controller, model) {
      model.set('category', 'overhear');
      return controller.set('model', model);
    }
  });

  exports['default'] = MessagesOverhearNewRoute;

});
define('frontend/routes/messages/success', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var MessagesSuccessRoute;

	MessagesSuccessRoute = Ember['default'].Route.extend();

	exports['default'] = MessagesSuccessRoute;

});
define('frontend/routes/root', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	var RootRoute;

	RootRoute = Ember['default'].Route.extend();

	exports['default'] = RootRoute;

});
define('frontend/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 86
          }
        },
        "moduleName": "frontend/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
        morphs[2] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","menu-component",["loc",[null,[1,0],[1,18]]]],
        ["content","outlet",["loc",[null,[1,41],[1,51]]]],
        ["inline","partial",["partials/helper"],[],["loc",[null,[1,57],[1,86]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/components/menu-component', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 34
            },
            "end": {
              "line": 1,
              "column": 156
            }
          },
          "moduleName": "frontend/templates/components/menu-component.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","big_logo hidden-xs logo");
          var el2 = dom.createTextNode("NSU.ask");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","small_logo visible-xs logo");
          var el2 = dom.createTextNode("NSU.ask");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 180
          }
        },
        "moduleName": "frontend/templates/components/menu-component.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container-fluid");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0]),0,0);
        return morphs;
      },
      statements: [
        ["block","link-to",["root"],[],0,null,["loc",[null,[1,34],[1,168]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('frontend/templates/messages', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "moduleName": "frontend/templates/messages.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/messages/besit', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "moduleName": "frontend/templates/messages/besit.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/messages/besit/new', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 419
          }
        },
        "moduleName": "frontend/templates/messages/besit/new.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","page-head");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-lg-2 col-md-3 col-sm-6 col-xs-12 text-center");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","public-logo besit");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-lg-10 col-md-9 col-sm-6 hidden-xs");
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("БЕСИТ АКАДЕМ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","page-content");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","actions text-center");
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"class","btn btn-mint btn-block");
        var el3 = dom.createTextNode("Отправить");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
        morphs[1] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [
        ["inline","textarea",[],["placeholder","Введите сообщение","value",["subexpr","@mut",[["get","model.text",["loc",[null,[1,287],[1,297]]]]],[],[]]],["loc",[null,[1,238],[1,299]]]],
        ["element","action",["send"],[],["loc",[null,[1,346],[1,363]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/messages/love', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "moduleName": "frontend/templates/messages/love.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/messages/love/new', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 421
          }
        },
        "moduleName": "frontend/templates/messages/love/new.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","page-head");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-lg-2 col-md-3 col-sm-6 col-xs-12 text-center");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","public-logo love");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-lg-10 col-md-9 col-sm-6 hidden-xs");
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("Признавашки НГУ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","page-content");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","actions text-center");
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"class","btn btn-mint btn-block");
        var el3 = dom.createTextNode("Отправить");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
        morphs[1] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [
        ["inline","textarea",[],["placeholder","Введите сообщение","value",["subexpr","@mut",[["get","model.text",["loc",[null,[1,289],[1,299]]]]],[],[]]],["loc",[null,[1,240],[1,301]]]],
        ["element","action",["send"],[],["loc",[null,[1,348],[1,365]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/messages/overhear', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "moduleName": "frontend/templates/messages/overhear.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/messages/overhear/new', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 424
          }
        },
        "moduleName": "frontend/templates/messages/overhear/new.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","page-head");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-lg-2 col-md-3 col-sm-6 col-xs-12 text-center");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","public-logo overhear");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-lg-10 col-md-9 col-sm-6 hidden-xs");
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("Подслушано НГУ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","page-content");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","actions text-center");
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"class","btn btn-mint btn-block");
        var el3 = dom.createTextNode("Отправить");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
        morphs[1] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [
        ["inline","textarea",[],["placeholder","Введите сообщение","value",["subexpr","@mut",[["get","model.text",["loc",[null,[1,292],[1,302]]]]],[],[]]],["loc",[null,[1,243],[1,304]]]],
        ["element","action",["send"],[],["loc",[null,[1,351],[1,368]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/messages/success', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 414
          }
        },
        "moduleName": "frontend/templates/messages/success.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","message-success");
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Ваше сообщение успешно отправлено!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h4");
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Сообщение будет опубликовано в паблике при успешном прохождении цензуры.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Если Ваше сообщение не опубликовано в течение 1 недели, то оно не было одобрено и отправилось в архив.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Выражайте свои мысли корректно и мы будем рады передать их общественности!");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","text-right");
        var el4 = dom.createTextNode("С уважением, Команда NSU.ask");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/partials/helper', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 564
          }
        },
        "moduleName": "frontend/templates/partials/helper.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","helper-block");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","bubble");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","close-button");
        var el4 = dom.createElement("i");
        dom.setAttribute(el4,"class","fa fa-times");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","container-fluid");
        var el4 = dom.createElement("h4");
        var el5 = dom.createTextNode("Оставьте сообщение разработчику");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","actions");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","btn btn-block btn-mint");
        var el6 = dom.createTextNode("Отправить");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","helper");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"data-hint","Связь с разработчиком");
        dom.setAttribute(el2,"class","helper-wrapper hint hint--left");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3,"class","fa fa-user");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 0]);
        var element1 = dom.childAt(element0, [0]);
        var element2 = dom.childAt(element0, [1]);
        var element3 = dom.childAt(element2, [2, 0]);
        var element4 = dom.childAt(fragment, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(element2,1,1);
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createElementMorph(element4);
        return morphs;
      },
      statements: [
        ["element","action",["toggleHelper"],[],["loc",[null,[1,51],[1,76]]]],
        ["inline","textarea",[],["placeholder","Введите сообщение","value",["subexpr","@mut",[["get","controller.helperMessage",["loc",[null,[1,249],[1,273]]]]],[],[]]],["loc",[null,[1,200],[1,275]]]],
        ["element","action",["sendMessage"],[],["loc",[null,[1,304],[1,328]]]],
        ["element","action",["toggleHelper"],[],["loc",[null,[1,407],[1,432]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/partials/preloader', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 142
          }
        },
        "moduleName": "frontend/templates/partials/preloader.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","preloader-wrapper");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","preloader");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3,"class","fa fa-refresh fa-spin fa-5x");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("NSU.ask");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("@ev1lcap");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/root', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 95
            },
            "end": {
              "line": 1,
              "column": 332
            }
          },
          "moduleName": "frontend/templates/root.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-3 col-md-3 col-sm-6 col-xs-12 img-wrapper");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","img overhear");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-9 col-md-9 col-sm-6 hidden-xs");
          var el2 = dom.createElement("h2");
          var el3 = dom.createTextNode("Подслушано НГУ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h4");
          var el3 = dom.createTextNode("Страдашки НГУ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 374
            },
            "end": {
              "line": 1,
              "column": 617
            }
          },
          "moduleName": "frontend/templates/root.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-3 col-md-3 col-sm-6 col-xs-12 img-wrapper");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","img love");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-9 col-md-9 col-sm-6 hidden-xs");
          var el2 = dom.createElement("h2");
          var el3 = dom.createTextNode("Признавашки НГУ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h4");
          var el3 = dom.createTextNode("Признайся в своих чувствах");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 659
            },
            "end": {
              "line": 1,
              "column": 895
            }
          },
          "moduleName": "frontend/templates/root.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-3 col-md-3 col-sm-6 col-xs-12 img-wrapper");
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","img besit");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-9 col-md-9 col-sm-6 hidden-xs");
          var el2 = dom.createElement("h2");
          var el3 = dom.createTextNode("БЕСИТ АКАДЕМ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h4");
          var el3 = dom.createTextNode("Бесит! Бесит! Бесит!");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 919
          }
        },
        "moduleName": "frontend/templates/root.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1,"class","title text-center");
        var el2 = dom.createTextNode("Выберите паблик");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","publics");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row public");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row public");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row public");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [2]),0,0);
        return morphs;
      },
      statements: [
        ["block","link-to",["messages.overhear.new"],[],0,null,["loc",[null,[1,95],[1,344]]]],
        ["block","link-to",["messages.love.new"],[],1,null,["loc",[null,[1,374],[1,629]]]],
        ["block","link-to",["messages.besit.new"],[],2,null,["loc",[null,[1,659],[1,907]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('frontend/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('frontend/tests/helpers/resolver', ['exports', 'ember/resolver', 'frontend/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('frontend/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('frontend/tests/helpers/start-app', ['exports', 'ember', 'frontend/app', 'frontend/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('frontend/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('frontend/tests/integration/components/menu-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('menu-component', 'Integration | Component | menu component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{menu-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#menu-component}}\n  template block text\n{{/menu-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('frontend/tests/test-helper', ['frontend/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('frontend/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('frontend/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/messages/besit/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:messages/besit/new', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/messages/love/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:messages/love/new', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/messages/overhear/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:messages/overhear/new', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/models/message-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('message', 'Unit | Model | message', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/messages-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages', 'Unit | Route | messages', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/messages/besit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/besit', 'Unit | Route | messages/besit', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/messages/besit/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/besit/new', 'Unit | Route | messages/besit/new', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/messages/love-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/love', 'Unit | Route | messages/love', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/messages/love/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/love/new', 'Unit | Route | messages/love/new', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/messages/overhear-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/overhear', 'Unit | Route | messages/overhear', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/messages/overhear/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/overhear/new', 'Unit | Route | messages/overhear/new', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/messages/success-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/success', 'Unit | Route | messages/success', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/root-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:root', 'Unit | Route | root', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('frontend/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"frontend","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"frontend","version":"0.0.0+07c79a40"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"exportApplicationGlobal":true}};
});

if (runningTests) {
  require("frontend/tests/test-helper");
} else {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+07c79a40"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map