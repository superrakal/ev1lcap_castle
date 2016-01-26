export default Ember.HTMLBars.template((function() {
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