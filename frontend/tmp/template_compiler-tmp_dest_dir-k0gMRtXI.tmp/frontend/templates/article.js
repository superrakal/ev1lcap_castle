export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 345
          },
          "end": {
            "line": 1,
            "column": 431
          }
        },
        "moduleName": "frontend/templates/article.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        dom.setAttribute(el1,"class","audio");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        return morphs;
      },
      statements: [
        ["inline","audio-player",[],["src",["subexpr","@mut",[["get","article.music_link",["loc",[null,[1,407],[1,425]]]]],[],[]]],["loc",[null,[1,388],[1,427]]]]
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
          "column": 488
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
      var el5 = dom.createElement("p");
      dom.setAttribute(el5,"class","geolocation");
      var el6 = dom.createElement("i");
      dom.setAttribute(el6,"class","fa fa-map-marker");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode(" ");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("a");
      dom.setAttribute(el2,"class","image featured");
      var el3 = dom.createElement("img");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
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
      var element3 = dom.childAt(element1, [1, 0]);
      var element4 = dom.childAt(element0, [1, 0]);
      var morphs = new Array(7);
      morphs[0] = dom.createMorphAt(dom.childAt(element2, [0]),0,0);
      morphs[1] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
      morphs[2] = dom.createMorphAt(element3,0,0);
      morphs[3] = dom.createMorphAt(dom.childAt(element3, [1]),2,2);
      morphs[4] = dom.createAttrMorph(element4, 'src');
      morphs[5] = dom.createMorphAt(element0,2,2);
      morphs[6] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
      return morphs;
    },
    statements: [
      ["content","article.title",["loc",[null,[1,53],[1,70]]]],
      ["content","article.subtitle",["loc",[null,[1,78],[1,98]]]],
      ["content","article.formattedCreatedAt",["loc",[null,[1,150],[1,180]]]],
      ["content","article.city",["loc",[null,[1,241],[1,257]]]],
      ["attribute","src",["get","article.image_link",["loc",[null,[1,320],[1,338]]]]],
      ["block","if",[["get","article.music_link",["loc",[null,[1,351],[1,369]]]]],[],0,null,["loc",[null,[1,345],[1,438]]]],
      ["content","article.safeText",["loc",[null,[1,454],[1,474]]]]
    ],
    locals: [],
    templates: [child0]
  };
}()));