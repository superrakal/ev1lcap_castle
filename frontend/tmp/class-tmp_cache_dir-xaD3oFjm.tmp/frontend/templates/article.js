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