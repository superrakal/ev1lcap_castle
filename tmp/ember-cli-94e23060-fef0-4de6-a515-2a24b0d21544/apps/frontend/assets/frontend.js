/* jshint ignore:start */

/* jshint ignore:end */

define('frontend/adapters/application', ['exports', 'active-model-adapter', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, ActiveModelAdapter, DataAdapterMixin) {

  'use strict';

  exports['default'] = ActiveModelAdapter['default'].extend(DataAdapterMixin['default'], {
    authorizer: 'authorizer:devise',
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
define('frontend/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise'], function (exports, DeviseAuthenticator) {

  'use strict';

  exports['default'] = DeviseAuthenticator['default'].extend({
    key: 'nsuask:session',
    serverTokenEndpoint: '/api/v1/authenticate'
  });

});
define('frontend/authorizers/devise', ['exports', 'ember-simple-auth/authorizers/devise'], function (exports, DeviseAuthorizer) {

	'use strict';

	exports['default'] = DeviseAuthorizer['default'].extend({});

});
define('frontend/components/infinity-loader', ['exports', 'ember-infinity/components/infinity-loader'], function (exports, infinityLoader) {

	'use strict';

	exports['default'] = infinityLoader['default'];

});
define('frontend/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

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
define('frontend/initializers/ember-simple-auth', ['exports', 'ember', 'frontend/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, Ember, ENV, Configuration, setupSession, setupSessionService) {

  'use strict';

  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = ENV['default']['ember-simple-auth'] || {};
      config.baseURL = ENV['default'].baseURL;
      Configuration['default'].load(config);

      setupSession['default'](registry);
      setupSessionService['default'](registry);
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
define('frontend/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, setupSessionRestoration) {

  'use strict';

  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      setupSessionRestoration['default'](instance);
    }
  };

});
define('frontend/instance-initializers/session', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {
    name: "session",

    initialize: function initialize(app) {
      var session = app.container.lookup('service:session');
      window.authorizeUser = function (xhr) {
        session.authorize('authorizer:devise', function (headerName, headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        });
      };
      app.registry.injection('route', 'session', 'service:session');
      app.registry.injection('controller', 'session', 'service:session');
      app.registry.injection('component', 'session', 'service:session');
    }
  };

});
define('frontend/models/article', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var Article;

  Article = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    subtitle: DS['default'].attr('string'),
    text: DS['default'].attr('string'),
    preview_text: DS['default'].attr('string'),
    category: DS['default'].attr('string'),
    image: DS['default'].attr('string'),
    created_at: DS['default'].attr('date'),
    formattedCreatedAt: (function () {
      if (!this.get('created_at')) {
        return '';
      } else {
        return moment(this.get('created_at')).fromNow();
      }
    }).property('created_at'),
    safeText: (function () {
      if (!this.get('text')) {
        return '';
      } else {
        return Ember.String.htmlSafe(this.get('text'));
      }
    }).property('text')
  });

  exports['default'] = Article;

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
    this.route('article', {
      path: 'article/:id'
    });
    return this.route('not_found', {
      path: '/*path'
    });
  });

  exports['default'] = Router;

});
define('frontend/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, Ember, ApplicationRouteMixin) {

	'use strict';

	var ApplicationRoute = Ember['default'].Route.extend(ApplicationRouteMixin['default'], {});

	exports['default'] = ApplicationRoute;

});
define('frontend/routes/article', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ArticleRoute;

  ArticleRoute = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find('article', params.id);
    },
    setupController: function setupController(controller, model) {
      return controller.set('article', model);
    }
  });

  exports['default'] = ArticleRoute;

});
define('frontend/routes/root', ['exports', 'ember', 'ember-infinity/mixins/route'], function (exports, Ember, InfinityRoute) {

  'use strict';

  var RootRoute;

  RootRoute = Ember['default'].Route.extend(InfinityRoute['default'], {
    queryParams: {
      category: {
        refreshModel: true
      }
    },
    model: function model(params) {
      return this.infinityModel("article", {
        perPage: 10,
        startingPage: 1,
        category: params["category"]
      });
    },
    setupController: function setupController(controller, model) {
      return controller.set('model', model);
    }
  });

  exports['default'] = RootRoute;

});
define('frontend/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, SessionService) {

	'use strict';

	exports['default'] = SessionService['default'];

});
define('frontend/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, Adaptive) {

	'use strict';

	exports['default'] = Adaptive['default'].extend();

});
define('frontend/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 337
            },
            "end": {
              "line": 1,
              "column": 393
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Мысли");
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
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 486
            },
            "end": {
              "line": 1,
              "column": 583
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","img thinking");
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
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 644
            },
            "end": {
              "line": 1,
              "column": 700
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Хобби");
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
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 793
            },
            "end": {
              "line": 1,
              "column": 887
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","img hobby");
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
    var child4 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 948
            },
            "end": {
              "line": 1,
              "column": 1004
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Учеба");
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
    var child5 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1097
            },
            "end": {
              "line": 1,
              "column": 1191
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","img study");
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
    var child6 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1252
            },
            "end": {
              "line": 1,
              "column": 1310
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Работа");
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
    var child7 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 1404
            },
            "end": {
              "line": 1,
              "column": 1498
            }
          },
          "moduleName": "frontend/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","img work");
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
        "revision": "Ember@2.0.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 2184
          }
        },
        "moduleName": "frontend/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","wrapper");
        var el2 = dom.createElement("header");
        dom.setAttribute(el2,"id","header");
        var el3 = dom.createElement("h1");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","/");
        var el5 = dom.createTextNode(" Ev1lCap Castle");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"id","main");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2,"id","sidebar");
        var el3 = dom.createElement("section");
        dom.setAttribute(el3,"id","intro");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","/");
        dom.setAttribute(el4,"class","logo");
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","avatar");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("header");
        var el5 = dom.createElement("h2");
        var el6 = dom.createTextNode("Егор Топольняк");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","mini-posts");
        var el5 = dom.createElement("article");
        dom.setAttribute(el5,"class","mini-post");
        var el6 = dom.createElement("header");
        var el7 = dom.createElement("h3");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("time");
        dom.setAttribute(el7,"class","published");
        var el8 = dom.createTextNode("Показать все посты категории \"Мысли\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("article");
        dom.setAttribute(el5,"class","mini-post");
        var el6 = dom.createElement("header");
        var el7 = dom.createElement("h3");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("time");
        dom.setAttribute(el7,"class","published");
        var el8 = dom.createTextNode("Показать все посты категории \"Хобби\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("article");
        dom.setAttribute(el5,"class","mini-post");
        var el6 = dom.createElement("header");
        var el7 = dom.createElement("h3");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("time");
        dom.setAttribute(el7,"class","published");
        var el8 = dom.createTextNode("Показать все посты категории \"Учеба\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("article");
        dom.setAttribute(el5,"class","mini-post");
        var el6 = dom.createElement("header");
        var el7 = dom.createElement("h3");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("time");
        dom.setAttribute(el7,"class","published");
        var el8 = dom.createTextNode("Показать все посты категории \"Работа\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3,"class","blurb");
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("Обо мне");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Студент НГУ, ФИТ.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Занимаюсь веб-разработкой.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("Из хобби: фотография, велосипедные прогулки.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3,"id","footer");
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","icons");
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","https://twitter.com/topolnyak012");
        dom.setAttribute(el6,"class","fa-twitter");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"class","label");
        var el8 = dom.createTextNode("Twitter");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","http://vk.com/nsu_topolnyak");
        dom.setAttribute(el6,"class","fa-vk");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"class","label");
        var el8 = dom.createTextNode("VK");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","https://www.instagram.com/topol009/");
        dom.setAttribute(el6,"class","fa-instagram");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"class","label");
        var el8 = dom.createTextNode("Instagram");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","mailto:topolnyak012@gmail.com");
        dom.setAttribute(el6,"class","fa-envelope");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"class","label");
        var el8 = dom.createTextNode("Email");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [2, 1, 0]);
        var element2 = dom.childAt(element1, [0]);
        var element3 = dom.childAt(element1, [1]);
        var element4 = dom.childAt(element1, [2]);
        var element5 = dom.childAt(element1, [3]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [0, 0]),0,0);
        morphs[2] = dom.createMorphAt(element2,1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element3, [0, 0]),0,0);
        morphs[4] = dom.createMorphAt(element3,1,1);
        morphs[5] = dom.createMorphAt(dom.childAt(element4, [0, 0]),0,0);
        morphs[6] = dom.createMorphAt(element4,1,1);
        morphs[7] = dom.createMorphAt(dom.childAt(element5, [0, 0]),0,0);
        morphs[8] = dom.createMorphAt(element5,1,1);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,102],[1,112]]]],
        ["block","link-to",["root",["subexpr","query-params",[],["category","Мысли"],["loc",[null,[1,355],[1,386]]]]],[],0,null,["loc",[null,[1,337],[1,405]]]],
        ["block","link-to",["root",["subexpr","query-params",[],["category","Мысли"],["loc",[null,[1,504],[1,535]]]]],["class","image"],1,null,["loc",[null,[1,486],[1,595]]]],
        ["block","link-to",["root",["subexpr","query-params",[],["category","Хобби"],["loc",[null,[1,662],[1,693]]]]],[],2,null,["loc",[null,[1,644],[1,712]]]],
        ["block","link-to",["root",["subexpr","query-params",[],["category","Хобби"],["loc",[null,[1,811],[1,842]]]]],["class","image"],3,null,["loc",[null,[1,793],[1,899]]]],
        ["block","link-to",["root",["subexpr","query-params",[],["category","Учеба"],["loc",[null,[1,966],[1,997]]]]],[],4,null,["loc",[null,[1,948],[1,1016]]]],
        ["block","link-to",["root",["subexpr","query-params",[],["category","Учеба"],["loc",[null,[1,1115],[1,1146]]]]],["class","image"],5,null,["loc",[null,[1,1097],[1,1203]]]],
        ["block","link-to",["root",["subexpr","query-params",[],["category","Работа"],["loc",[null,[1,1270],[1,1302]]]]],[],6,null,["loc",[null,[1,1252],[1,1322]]]],
        ["block","link-to",["root",["subexpr","query-params",[],["category","Работа"],["loc",[null,[1,1422],[1,1454]]]]],["class","image"],7,null,["loc",[null,[1,1404],[1,1510]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6, child7]
    };
  }()));

});
define('frontend/templates/article', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 309
          }
        },
        "moduleName": "frontend/templates/article.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        dom.setAttribute(el1,"class","post");
        var el2 = dom.createElement("header");
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","title");
        var el4 = dom.createElement("h2");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","meta");
        var el4 = dom.createElement("time");
        dom.setAttribute(el4,"class","published");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"class","image featured");
        var el3 = dom.createElement("img");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        dom.setAttribute(el2,"class","text");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [0]);
        var element2 = dom.childAt(element1, [0]);
        var element3 = dom.childAt(element0, [1, 0]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [1, 0]),0,0);
        morphs[3] = dom.createAttrMorph(element3, 'src');
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [2]),0,0);
        return morphs;
      },
      statements: [
        ["content","article.title",["loc",[null,[1,53],[1,70]]]],
        ["content","article.subtitle",["loc",[null,[1,78],[1,98]]]],
        ["content","article.formattedCreatedAt",["loc",[null,[1,150],[1,180]]]],
        ["attribute","src",["get","article.image",["loc",[null,[1,239],[1,252]]]]],
        ["content","article.safeText",["loc",[null,[1,275],[1,295]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('frontend/templates/components/infinity-loader', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/infinity-loader.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["content","yield",["loc",[null,[2,2],[2,11]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/infinity-loader.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["content","loadedText",["loc",[null,[5,10],[5,24]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 8,
                "column": 2
              }
            },
            "moduleName": "frontend/templates/components/infinity-loader.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["content","loadingText",["loc",[null,[7,10],[7,25]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "frontend/templates/components/infinity-loader.hbs"
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
          ["block","if",[["get","infinityModel.reachedInfinity",["loc",[null,[4,8],[4,37]]]]],[],0,1,["loc",[null,[4,2],[8,9]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "frontend/templates/components/infinity-loader.hbs"
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
        ["block","if",[["get","hasBlock",["loc",[null,[1,6],[1,14]]]]],[],0,1,["loc",[null,[1,0],[9,7]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('frontend/templates/root', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 81
              },
              "end": {
                "line": 1,
                "column": 131
              }
            },
            "moduleName": "frontend/templates/root.hbs"
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
            ["content","article.title",["loc",[null,[1,114],[1,131]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 275
              },
              "end": {
                "line": 1,
                "column": 358
              }
            },
            "moduleName": "frontend/templates/root.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("img");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [0]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'src');
            return morphs;
          },
          statements: [
            ["attribute","src",["get","article.image",["loc",[null,[1,342],[1,355]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child2 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 433
              },
              "end": {
                "line": 1,
                "column": 497
              }
            },
            "moduleName": "frontend/templates/root.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Читать далее");
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
      var child3 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.3",
            "loc": {
              "source": null,
              "start": {
                "line": 1,
                "column": 541
              },
              "end": {
                "line": 1,
                "column": 621
              }
            },
            "moduleName": "frontend/templates/root.hbs"
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
            ["content","article.category",["loc",[null,[1,601],[1,621]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@2.0.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 662
            }
          },
          "moduleName": "frontend/templates/root.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("article");
          dom.setAttribute(el1,"class","post");
          var el2 = dom.createElement("header");
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","title");
          var el4 = dom.createElement("h2");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("p");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"class","meta");
          var el4 = dom.createElement("time");
          dom.setAttribute(el4,"class","published");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("footer");
          var el3 = dom.createElement("ul");
          dom.setAttribute(el3,"class","actions");
          var el4 = dom.createElement("li");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("ul");
          dom.setAttribute(el3,"class","stats");
          var el4 = dom.createElement("li");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [0]);
          var element2 = dom.childAt(element1, [0]);
          var element3 = dom.childAt(element2, [0]);
          var element4 = dom.childAt(element1, [3]);
          var morphs = new Array(7);
          morphs[0] = dom.createMorphAt(dom.childAt(element3, [0]),0,0);
          morphs[1] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[2] = dom.createMorphAt(dom.childAt(element2, [1, 0]),0,0);
          morphs[3] = dom.createMorphAt(element1,1,1);
          morphs[4] = dom.createMorphAt(dom.childAt(element1, [2]),0,0);
          morphs[5] = dom.createMorphAt(dom.childAt(element4, [0, 0]),0,0);
          morphs[6] = dom.createMorphAt(dom.childAt(element4, [1, 0]),0,0);
          return morphs;
        },
        statements: [
          ["block","link-to",["article",["get","article.id",["loc",[null,[1,102],[1,112]]]]],[],0,null,["loc",[null,[1,81],[1,143]]]],
          ["content","article.subtitle",["loc",[null,[1,151],[1,171]]]],
          ["content","article.formattedCreatedAt",["loc",[null,[1,223],[1,253]]]],
          ["block","link-to",["article",["get","article.id",["loc",[null,[1,296],[1,306]]]]],["class","image featured"],1,null,["loc",[null,[1,275],[1,370]]]],
          ["content","article.preview_text",["loc",[null,[1,373],[1,397]]]],
          ["block","link-to",["article",["get","article.id",["loc",[null,[1,454],[1,464]]]]],["class","button big"],2,null,["loc",[null,[1,433],[1,509]]]],
          ["block","link-to",["root",["subexpr","query-params",[],["category",["get","article.category",["loc",[null,[1,582],[1,598]]]]],["loc",[null,[1,559],[1,599]]]]],[],3,null,["loc",[null,[1,541],[1,633]]]]
        ],
        locals: ["article"],
        templates: [child0, child1, child2, child3]
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 784
          }
        },
        "moduleName": "frontend/templates/root.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[1,8],[1,13]]]]],[],0,null,["loc",[null,[1,0],[1,671]]]],
        ["inline","infinity-loader",[],["infinityModel",["subexpr","@mut",[["get","model",["loc",[null,[1,703],[1,708]]]]],[],[]],"loadingText","Идет подгрузка данных...","loadedText","Все данные подгружены"],["loc",[null,[1,671],[1,784]]]]
      ],
      locals: [],
      templates: [child0]
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
define('frontend/tests/authenticators/devise.jshint', function () {

  'use strict';

  module('JSHint - authenticators');
  test('authenticators/devise.js should pass jshint', function() { 
    ok(true, 'authenticators/devise.js should pass jshint.'); 
  });

});
define('frontend/tests/authorizers/devise.jshint', function () {

  'use strict';

  module('JSHint - authorizers');
  test('authorizers/devise.js should pass jshint', function() { 
    ok(true, 'authorizers/devise.js should pass jshint.'); 
  });

});
define('frontend/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, Test) {

  'use strict';

  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, Test['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  ;

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  ;

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }

  ;

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
define('frontend/tests/instance-initializers/session.jshint', function () {

  'use strict';

  module('JSHint - instance-initializers');
  test('instance-initializers/session.js should pass jshint', function() { 
    ok(true, 'instance-initializers/session.js should pass jshint.'); 
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
define('frontend/tests/integration/components/navigation-component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('navigation-component', 'Integration | Component | navigation component', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);
    this.render(hbs("{{navigation-component}}"));
    assert.equal(this.$().text().trim(), '');
    this.render(hbs("{{#navigation-component}}\n  template block text\n{{/navigation-component}}"));
    return assert.equal(this.$().text().trim(), 'template block text');
  });

});
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
define('frontend/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
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
define('frontend/tests/unit/controllers/besit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:besit', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/love-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:love', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/messages/besit/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:messages/besit/index', {});

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
define('frontend/tests/unit/controllers/messages/love/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:messages/love/index', {});

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
define('frontend/tests/unit/controllers/messages/overhear/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:messages/overhear/index', {});

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
define('frontend/tests/unit/controllers/overhear-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:overhear', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/root-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:root', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/controllers/sign-in-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:sign-in', {});

  ember_qunit.test('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });

});
define('frontend/tests/unit/mixins/controller-mixin-test', ['ember', 'frontend/mixins/controller-mixin', 'qunit'], function (Ember, ControllerMixinMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | controller mixin');

  qunit.test('it works', function (assert) {
    var ControllerMixinObject, subject;
    ControllerMixinObject = Ember['default'].Object.extend(ControllerMixinMixin['default']);
    subject = ControllerMixinObject.create();
    return assert.ok(subject);
  });

});
define('frontend/tests/unit/models/article-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('article', 'Unit | Model | article', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
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
define('frontend/tests/unit/models/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('user', 'Unit | Model | user', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});
define('frontend/tests/unit/routes/404-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:404', 'Unit | Route | 404', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/admin-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:admin', 'Unit | Route | admin', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
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
define('frontend/tests/unit/routes/article-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:article', 'Unit | Route | article', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/besit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:besit', 'Unit | Route | besit', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});
define('frontend/tests/unit/routes/love-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:love', 'Unit | Route | love', {});

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
define('frontend/tests/unit/routes/messages/besit/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/besit/index', 'Unit | Route | messages/besit/index', {});

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
define('frontend/tests/unit/routes/messages/love/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/love/index', 'Unit | Route | messages/love/index', {});

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
define('frontend/tests/unit/routes/messages/overhear/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:messages/overhear/index', 'Unit | Route | messages/overhear/index', {});

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
define('frontend/tests/unit/routes/overhear-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:overhear', 'Unit | Route | overhear', {});

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
define('frontend/tests/unit/routes/sign-in-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:sign-in', 'Unit | Route | sign in', {});

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
  return { 'default': {"modulePrefix":"frontend","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"frontend","version":"0.0.0+"},"ember-simple-auth":{"routeAfterAuthentication":"admin","routeIfAlreadyAuthenticated":"admin"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"browserify":{"tests":true},"exportApplicationGlobal":true}};
});

if (runningTests) {
  require("frontend/tests/test-helper");
} else {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map