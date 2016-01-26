define('active-model-adapter', ['active-model-adapter/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('active-model-adapter/active-model-adapter', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  var InvalidError = DS['default'].InvalidError;
  var errorsHashToArray = DS['default'].errorsHashToArray;
  var RESTAdapter = DS['default'].RESTAdapter;
  var _Ember$String = Ember['default'].String;
  var pluralize = _Ember$String.pluralize;
  var decamelize = _Ember$String.decamelize;
  var underscore = _Ember$String.underscore;

  /**
    @module ember-data
  */

  /**
    The ActiveModelAdapter is a subclass of the RESTAdapter designed to integrate
    with a JSON API that uses an underscored naming convention instead of camelCasing.
    It has been designed to work out of the box with the
    [active\_model\_serializers](http://github.com/rails-api/active_model_serializers)
    Ruby gem. This Adapter expects specific settings using ActiveModel::Serializers,
    `embed :ids, embed_in_root: true` which sideloads the records.

    This adapter extends the DS.RESTAdapter by making consistent use of the camelization,
    decamelization and pluralization methods to normalize the serialized JSON into a
    format that is compatible with a conventional Rails backend and Ember Data.

    ## JSON Structure

    The ActiveModelAdapter expects the JSON returned from your server to follow
    the REST adapter conventions substituting underscored keys for camelcased ones.

    Unlike the DS.RESTAdapter, async relationship keys must be the singular form
    of the relationship name, followed by "_id" for DS.belongsTo relationships,
    or "_ids" for DS.hasMany relationships.

    ### Conventional Names

    Attribute names in your JSON payload should be the underscored versions of
    the attributes in your Ember.js models.

    For example, if you have a `Person` model:

    ```js
    App.FamousPerson = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.attr('string')
    });
    ```

    The JSON returned should look like this:

    ```js
    {
      "famous_person": {
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation": "President"
      }
    }
    ```

    Let's imagine that `Occupation` is just another model:

    ```js
    App.Person = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.belongsTo('occupation')
    });

    App.Occupation = DS.Model.extend({
      name: DS.attr('string'),
      salary: DS.attr('number'),
      people: DS.hasMany('person')
    });
    ```

    The JSON needed to avoid extra server calls, should look like this:

    ```js
    {
      "people": [{
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation_id": 1
      }],

      "occupations": [{
        "id": 1,
        "name": "President",
        "salary": 100000,
        "person_ids": [1]
      }]
    }
    ```

    @class ActiveModelAdapter
    @constructor
    @namespace DS
    @extends DS.RESTAdapter
  **/

  var ActiveModelAdapter = RESTAdapter.extend({
    defaultSerializer: '-active-model',
    /**
      The ActiveModelAdapter overrides the `pathForType` method to build
      underscored URLs by decamelizing and pluralizing the object type name.
       ```js
        this.pathForType("famousPerson");
        //=> "famous_people"
      ```
       @method pathForType
      @param {String} modelName
      @return String
    */
    pathForType: function pathForType(modelName) {
      var decamelized = decamelize(modelName);
      var underscored = underscore(decamelized);
      return pluralize(underscored);
    },

    /**
      The ActiveModelAdapter overrides the `handleResponse` method
      to format errors passed to a DS.InvalidError for all
      422 Unprocessable Entity responses.
       A 422 HTTP response from the server generally implies that the request
      was well formed but the API was unable to process it because the
      content was not semantically correct or meaningful per the API.
       For more information on 422 HTTP Error code see 11.2 WebDAV RFC 4918
      https://tools.ietf.org/html/rfc4918#section-11.2
       @method ajaxError
      @param {Object} jqXHR
      @return error
    */
    handleResponse: function handleResponse(status, headers, payload) {
      if (this.isInvalid(status, headers, payload)) {
        var errors = errorsHashToArray(payload.errors);

        return new InvalidError(errors);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });

  exports['default'] = ActiveModelAdapter;

});
define('active-model-adapter/active-model-serializer', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  var _Ember$String = Ember['default'].String;
  var singularize = _Ember$String.singularize;
  var classify = _Ember$String.classify;
  var decamelize = _Ember$String.decamelize;
  var camelize = _Ember$String.camelize;
  var underscore = _Ember$String.underscore;
  var RESTSerializer = DS['default'].RESTSerializer;
  var normalizeModelName = DS['default'].normalizeModelName;

  /**
    The ActiveModelSerializer is a subclass of the RESTSerializer designed to integrate
    with a JSON API that uses an underscored naming convention instead of camelCasing.
    It has been designed to work out of the box with the
    [active\_model\_serializers](http://github.com/rails-api/active_model_serializers)
    Ruby gem. This Serializer expects specific settings using ActiveModel::Serializers,
    `embed :ids, embed_in_root: true` which sideloads the records.

    This serializer extends the DS.RESTSerializer by making consistent
    use of the camelization, decamelization and pluralization methods to
    normalize the serialized JSON into a format that is compatible with
    a conventional Rails backend and Ember Data.

    ## JSON Structure

    The ActiveModelSerializer expects the JSON returned from your server
    to follow the REST adapter conventions substituting underscored keys
    for camelcased ones.

    ### Conventional Names

    Attribute names in your JSON payload should be the underscored versions of
    the attributes in your Ember.js models.

    For example, if you have a `Person` model:

    ```js
    App.FamousPerson = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.attr('string')
    });
    ```

    The JSON returned should look like this:

    ```js
    {
      "famous_person": {
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation": "President"
      }
    }
    ```

    Let's imagine that `Occupation` is just another model:

    ```js
    App.Person = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.belongsTo('occupation')
    });

    App.Occupation = DS.Model.extend({
      name: DS.attr('string'),
      salary: DS.attr('number'),
      people: DS.hasMany('person')
    });
    ```

    The JSON needed to avoid extra server calls, should look like this:

    ```js
    {
      "people": [{
        "id": 1,
        "first_name": "Barack",
        "last_name": "Obama",
        "occupation_id": 1
      }],

      "occupations": [{
        "id": 1,
        "name": "President",
        "salary": 100000,
        "person_ids": [1]
      }]
    }
    ```

    @class ActiveModelSerializer
    @namespace DS
    @extends DS.RESTSerializer
  */
  var ActiveModelSerializer = RESTSerializer.extend({
    // SERIALIZE

    /**
      Converts camelCased attributes to underscored when serializing.
       @method keyForAttribute
      @param {String} attribute
      @return String
    */
    keyForAttribute: function keyForAttribute(attr) {
      return decamelize(attr);
    },

    /**
      Underscores relationship names and appends "_id" or "_ids" when serializing
      relationship keys.
       @method keyForRelationship
      @param {String} relationshipModelName
      @param {String} kind
      @return String
    */
    keyForRelationship: function keyForRelationship(relationshipModelName, kind) {
      var key = decamelize(relationshipModelName);
      if (kind === "belongsTo") {
        return key + "_id";
      } else if (kind === "hasMany") {
        return singularize(key) + "_ids";
      } else {
        return key;
      }
    },

    /**
     `keyForLink` can be used to define a custom key when deserializing link
     properties. The `ActiveModelSerializer` camelizes link keys by default.
      @method keyForLink
     @param {String} key
     @param {String} kind `belongsTo` or `hasMany`
     @return {String} normalized key
    */
    keyForLink: function keyForLink(key, relationshipKind) {
      return camelize(key);
    },

    /*
      Does not serialize hasMany relationships by default.
    */
    serializeHasMany: function serializeHasMany() {},

    /**
     Underscores the JSON root keys when serializing.
       @method payloadKeyFromModelName
      @param {String} modelName
      @return {String}
    */
    payloadKeyFromModelName: function payloadKeyFromModelName(modelName) {
      return underscore(decamelize(modelName));
    },

    /**
      Serializes a polymorphic type as a fully capitalized model name.
       @method serializePolymorphicType
      @param {DS.Snapshot} snapshot
      @param {Object} json
      @param {Object} relationship
    */
    serializePolymorphicType: function serializePolymorphicType(snapshot, json, relationship) {
      var key = relationship.key;
      var belongsTo = snapshot.belongsTo(key);
      var jsonKey = underscore(key + "_type");

      if (Ember['default'].isNone(belongsTo)) {
        json[jsonKey] = null;
      } else {
        json[jsonKey] = classify(belongsTo.modelName).replace('/', '::');
      }
    },

    /**
      Add extra step to `DS.RESTSerializer.normalize` so links are normalized.
       If your payload looks like:
       ```js
      {
        "post": {
          "id": 1,
          "title": "Rails is omakase",
          "links": { "flagged_comments": "api/comments/flagged" }
        }
      }
      ```
       The normalized version would look like this
       ```js
      {
        "post": {
          "id": 1,
          "title": "Rails is omakase",
          "links": { "flaggedComments": "api/comments/flagged" }
        }
      }
      ```
       @method normalize
      @param {subclass of DS.Model} typeClass
      @param {Object} hash
      @param {String} prop
      @return Object
    */
    normalize: function normalize(typeClass, hash, prop) {
      this.normalizeLinks(hash);
      return this._super(typeClass, hash, prop);
    },

    /**
      Convert `snake_cased` links  to `camelCase`
       @method normalizeLinks
      @param {Object} data
    */

    normalizeLinks: function normalizeLinks(data) {
      if (data.links) {
        var links = data.links;

        for (var link in links) {
          var camelizedLink = camelize(link);

          if (camelizedLink !== link) {
            links[camelizedLink] = links[link];
            delete links[link];
          }
        }
      }
    },

    extractRelationships: function extractRelationships(modelClass, resourceHash) {
      modelClass.eachRelationship(function (key, relationshipMeta) {
        var relationshipKey = this.keyForRelationship(key, relationshipMeta.kind, "deserialize");

        // prefer the format the AMS gem expects, e.g.:
        // relationship: {id: id, type: type}
        if (relationshipMeta.options.polymorphic) {
          extractPolymorphicRelationships(key, relationshipMeta, resourceHash, relationshipKey);
        }
        // If the preferred format is not found, use {relationship_name_id, relationship_name_type}
        if (resourceHash.hasOwnProperty(relationshipKey) && typeof resourceHash[relationshipKey] !== 'object') {
          var polymorphicTypeKey = this.keyForRelationship(key) + '_type';
          if (resourceHash[polymorphicTypeKey] && relationshipMeta.options.polymorphic) {
            var id = resourceHash[relationshipKey];
            var type = resourceHash[polymorphicTypeKey];
            delete resourceHash[polymorphicTypeKey];
            delete resourceHash[relationshipKey];
            resourceHash[relationshipKey] = { id: id, type: type };
          }
        }
      }, this);
      return this._super.apply(this, arguments);
    },

    modelNameFromPayloadKey: function modelNameFromPayloadKey(key) {
      var convertedFromRubyModule = singularize(key.replace('::', '/'));
      return normalizeModelName(convertedFromRubyModule);
    }
  });

  function extractPolymorphicRelationships(key, relationshipMeta, resourceHash, relationshipKey) {
    var polymorphicKey = decamelize(key);
    var hash = resourceHash[polymorphicKey];
    if (hash !== null && typeof hash === 'object') {
      resourceHash[relationshipKey] = hash;
    }
  }

  exports['default'] = ActiveModelSerializer;

});
define('active-model-adapter/index', ['exports', 'active-model-adapter/active-model-adapter', 'active-model-adapter/active-model-serializer'], function (exports, ActiveModelAdapter, ActiveModelSerializer) {

	'use strict';

	exports['default'] = ActiveModelAdapter['default'];

	exports.ActiveModelAdapter = ActiveModelAdapter['default'];
	exports.ActiveModelSerializer = ActiveModelSerializer['default'];

});
define('ember-cli-content-security-policy', ['ember-cli-content-security-policy/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-infinity', ['ember-infinity/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-infinity/components/infinity-loader', ['exports', 'ember', 'ember-version-is'], function (exports, Ember, emberVersionIs) {

  'use strict';

  var InfinityLoaderComponent = Ember['default'].Component.extend({
    classNames: ["infinity-loader"],
    classNameBindings: ["infinityModel.reachedInfinity"],
    guid: null,
    eventDebounce: 10,
    loadMoreAction: 'infinityLoad',
    loadingText: 'Loading Infinite Model...',
    loadedText: 'Infinite Model Entirely Loaded.',
    destroyOnInfinity: false,
    developmentMode: false,
    scrollable: null,
    triggerOffset: 0,

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this._setupScrollable();
      this.set('guid', Ember['default'].guidFor(this));
      this._bindEvent('scroll');
      this._bindEvent('resize');
      this._loadMoreIfNeeded();
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this._unbindEvent('scroll');
      this._unbindEvent('resize');
    },

    _bindEvent: function _bindEvent(eventName) {
      var _this = this;

      this.get('_scrollable').on(eventName + '.' + this.get('guid'), function () {
        Ember['default'].run.debounce(_this, _this._loadMoreIfNeeded, _this.get('eventDebounce'));
      });
    },

    _unbindEvent: function _unbindEvent(eventName) {
      this.get('_scrollable').off(eventName + '.' + this.get('guid'));
    },

    _selfOffset: function _selfOffset() {
      if (this.get('_customScrollableIsDefined')) {
        return this.$().position().top + this.get("_scrollable").scrollTop();
      } else {
        return this.$().offset().top;
      }
    },

    _bottomOfScrollableOffset: function _bottomOfScrollableOffset() {
      return this.get('_scrollable').height() + this.get("_scrollable").scrollTop();
    },

    _triggerOffset: function _triggerOffset() {
      return this._selfOffset() - this.get('triggerOffset');
    },

    _shouldLoadMore: function _shouldLoadMore() {
      if (this.get('developmentMode')) {
        return false;
      }

      return this._bottomOfScrollableOffset() > this._triggerOffset();
    },

    _loadMoreIfNeeded: function _loadMoreIfNeeded() {
      if (this._shouldLoadMore()) {
        this.sendAction('loadMoreAction');
      }
    },

    _setupScrollable: function _setupScrollable() {
      var scrollable = this.get('scrollable');
      if (Ember['default'].typeOf(scrollable) === 'string') {
        var items = Ember['default'].$(scrollable);
        if (items.length === 1) {
          this.set('_scrollable', items.eq(0));
        } else if (items.length > 1) {
          throw new Error("Ember Infinity: Multiple scrollable elements found for: " + scrollable);
        } else {
          throw new Error("Ember Infinity: No scrollable element found for: " + scrollable);
        }
        this.set('_customScrollableIsDefined', true);
      } else if (scrollable === undefined || scrollable === null) {
        this.set('_scrollable', Ember['default'].$(window));
        this.set('_customScrollableIsDefined', false);
      } else {
        throw new Error("Ember Infinity: Scrollable must either be a css selector string or left empty to default to window");
      }
    },

    loadedStatusDidChange: Ember['default'].observer('infinityModel.reachedInfinity', 'destroyOnInfinity', function () {
      if (this.get('infinityModel.reachedInfinity') && this.get('destroyOnInfinity')) {
        this.destroy();
      }
    }),

    infinityModelPushed: Ember['default'].observer('infinityModel.length', function () {
      Ember['default'].run.scheduleOnce('afterRender', this, this._loadMoreIfNeeded);
    })
  });

  if (emberVersionIs['default']('lessThan', '1.13.0')) {
    InfinityLoaderComponent.reopen({
      hasBlock: Ember['default'].computed.alias('template')
    });
  }

  exports['default'] = InfinityLoaderComponent;

});
define('ember-infinity/mixins/route', ['exports', 'ember', 'ember-version-is'], function (exports, Ember, ember_version_is) {

  'use strict';

  var keys = Object.keys || Ember['default'].keys;
  /**
    The Ember Infinity Route Mixin enables an application route to load paginated
    records for the route `model` as triggered by the controller (or Infinity Loader
    component).

    @class RouteMixin
    @namespace EmberInfinity
    @module ember-infinity/mixins/route
    @extends Ember.Mixin
  */
  var RouteMixin = Ember['default'].Mixin.create({

    /**
      @private
      @property _perPage
      @type Integer
      @default 25
    */
    _perPage: 25,

    /**
      @private
      @property currentPage
      @type Integer
      @default 0
    */
    currentPage: 0,

    /**
      @private
      @property _extraParams
      @type Object
      @default {}
    */
    _extraParams: {},

    /**
      @private
      @property _boundParams
      @type Object
      @default {}
    */
    _boundParams: {},

    /**
      @private
      @property _loadingMore
      @type Boolean
      @default false
    */
    _loadingMore: false,

    /**
      @private
      @property _totalPages
      @type Integer
      @default 0
    */
    _totalPages: 0,

    /**
      @private
      @property _infinityModelName
      @type String
      @default null
    */
    _infinityModelName: null,

    /**
      @private
      @property _modelPath
      @type String
      @default 'controller.model'
    */
    _modelPath: 'controller.model',

    /**
     * Name of the "per page" param in the
     * resource request payload
     * @type {String}
     * @default  "per_page"
     */
    perPageParam: 'per_page',

    /**
     * Name of the "page" param in the
     * resource request payload
     * @type {String}
     * @default "page"
     */
    pageParam: 'page',

    /**
     * Path of the "total pages" param in
     * the HTTP response
     * @type {String}
     * @default "meta.total_pages"
     */
    totalPagesParam: 'meta.total_pages',

    actions: {
      infinityLoad: function infinityLoad() {
        this._infinityLoad();
      }
    },

    /**
     * The supported findMethod name for
     * the developers Ember Data version.
     * Provided here for backwards compat.
     * @type {String}
     * @default "query"
     */
    _storeFindMethod: 'query',

    _firstPageLoaded: false,

    /**
      @private
      @property _canLoadMore
      @type Boolean
      @default false
    */
    _canLoadMore: Ember['default'].computed('_totalPages', 'currentPage', function () {
      var totalPages = this.get('_totalPages');
      var currentPage = this.get('currentPage');

      return totalPages && currentPage !== undefined ? currentPage < totalPages : false;
    }),

    /**
     @private
     @method _infinityModel
     @return {DS.RecordArray} the model
    */
    _infinityModel: function _infinityModel() {
      return this.get(this.get('_modelPath'));
    },

    _ensureCompatibility: function _ensureCompatibility() {
      if (ember_version_is.emberDataVersionIs('greaterThan', '1.0.0-beta.19.2') && ember_version_is.emberDataVersionIs('lessThan', '1.13.4')) {
        throw new Ember['default'].Error("Ember Infinity: You are using an unsupported version of Ember Data.  Please upgrade to at least 1.13.4 or downgrade to 1.0.0-beta.19.2");
      }

      if (Ember['default'].isEmpty(this.get('store')) || Ember['default'].isEmpty(this.get('store')[this._storeFindMethod])) {
        throw new Ember['default'].Error("Ember Infinity: Ember Data store is not available to infinityModel");
      }

      if (this.get('_infinityModelName') === undefined) {
        throw new Ember['default'].Error("Ember Infinity: You must pass a Model Name to infinityModel");
      }
    },

    /**
      Use the infinityModel method in the place of `this.store.find('model')` to
      initialize the Infinity Model for your route.
       @method infinityModel
      @param {String} modelName The name of the model.
      @param {Object} options Optional, the perPage and startingPage to load from.
      @param {Object} boundParams Optional, any route properties to be included as additional params.
      @return {Ember.RSVP.Promise}
    */
    infinityModel: function infinityModel(modelName, options, boundParams) {
      if (ember_version_is.emberDataVersionIs('lessThan', '1.13.0')) {
        this.set('_storeFindMethod', 'find');
      }

      this.set('_infinityModelName', modelName);

      this._ensureCompatibility();

      options = options ? Ember['default'].merge({}, options) : {};
      var startingPage = options.startingPage === undefined ? 0 : options.startingPage - 1;

      var perPage = options.perPage || this.get('_perPage');
      var modelPath = options.modelPath || this.get('_modelPath');

      delete options.startingPage;
      delete options.perPage;
      delete options.modelPath;

      this.setProperties({
        currentPage: startingPage,
        _firstPageLoaded: false,
        _perPage: perPage,
        _modelPath: modelPath,
        _extraParams: options
      });

      if (typeof boundParams === 'object') {
        this.set('_boundParams', boundParams);
      }

      return this._loadNextPage();
    },

    /**
     Call additional functions after finding the infinityModel in the Ember data store.
     @private
     @method _afterInfinityModel
     @param {Function} infinityModelPromise The resolved result of the Ember store find method. Passed in automatically.
     @return {Ember.RSVP.Promise}
    */
    _afterInfinityModel: function _afterInfinityModel(_this) {
      return function (infinityModelPromiseResult) {
        if (typeof _this.afterInfinityModel === 'function') {
          var result = _this.afterInfinityModel(infinityModelPromiseResult);
          if (result) {
            return result;
          }
        }

        return infinityModelPromiseResult;
      };
    },

    /**
     Trigger a load of the next page of results.
      @private
     @method _infinityLoad
     */
    _infinityLoad: function _infinityLoad() {
      if (this.get('_loadingMore') || !this.get('_canLoadMore')) {
        return;
      }

      this._loadNextPage();
    },

    /**
     load the next page from the adapter and update the model
      @private
     @method _loadNextPage
     @return {Ember.RSVP.Promise} A Promise that resolves the model
     */
    _loadNextPage: function _loadNextPage() {
      var _this2 = this;

      this.set('_loadingMore', true);

      return this._requestNextPage().then(function (newObjects) {
        _this2._nextPageLoaded(newObjects);

        return newObjects;
      })['finally'](function () {
        _this2.set('_loadingMore', false);
      });
    },

    /**
     request the next page from the adapter
      @private
     @method _requestNextPage
     @returns {Ember.RSVP.Promise} A Promise that resolves the next page of objects
     */
    _requestNextPage: function _requestNextPage() {
      var modelName = this.get('_infinityModelName');
      var nextPage = this.incrementProperty('currentPage');
      var params = this._buildParams(nextPage);

      return this.get('store')[this._storeFindMethod](modelName, params).then(this._afterInfinityModel(this));
    },

    /**
     build the params for the next page request
      @private
     @method _buildParams
     @param {Number} nextPage the page number for the current request
     @return {Object} The query params for the next page of results
     */
    _buildParams: function _buildParams(nextPage) {
      var _this3 = this;

      var pageParams = {};
      pageParams[this.get('perPageParam')] = this.get('_perPage');
      pageParams[this.get('pageParam')] = nextPage;

      var params = Ember['default'].merge(pageParams, this.get('_extraParams'));

      var boundParams = this.get('_boundParams');
      if (!Ember['default'].isEmpty(boundParams)) {
        keys(boundParams).forEach(function (k) {
          return params[k] = _this3.get(boundParams[k]);
        });
      }

      return params;
    },

    /**
     Update the infinity model with new objects
     Only called on the second page and following
      @deprecated
     @method updateInfinityModel
     @param {Ember.Enumerable} newObjects The new objects to add to the model
     @return {Ember.Array} returns the new objects
     */
    updateInfinityModel: function updateInfinityModel(newObjects) {
      return this._doUpdate(newObjects);
    },

    _doUpdate: function _doUpdate(newObjects) {
      var infinityModel = this._infinityModel();
      return infinityModel.pushObjects(newObjects.get('content'));
    },

    /**
      @method _nextPageLoaded
     @param {Ember.Enumerable} newObjects The new objects to add to the model
     @return {DS.RecordArray} returns the updated infinity model
     @private
     */
    _nextPageLoaded: function _nextPageLoaded(newObjects) {
      var totalPages = newObjects.get(this.get('totalPagesParam'));
      this.set('_totalPages', totalPages);

      var infinityModel = newObjects;

      if (this.get('_firstPageLoaded')) {
        if (typeof this.updateInfinityModel === 'function' && this.updateInfinityModel !== Ember['default'].Object.extend(RouteMixin).create().updateInfinityModel) {
          Ember['default'].deprecate("EmberInfinity.updateInfinityModel is deprecated. " + "Please use EmberInfinity.afterInfinityModel.", false, { id: 'ember-infinity.updateInfinityModel', until: '2.1' });

          infinityModel = this.updateInfinityModel(newObjects);
        } else {
          infinityModel = this._doUpdate(newObjects);
        }
      }

      this.set('_firstPageLoaded', true);
      this._notifyInfinityModelUpdated(newObjects);

      var canLoadMore = this.get('_canLoadMore');
      infinityModel.set('reachedInfinity', !canLoadMore);

      if (!canLoadMore) {
        this._notifyInfinityModelLoaded();
      }

      return infinityModel;
    },

    /**
     notify that the infinity model has been updated
      @private
     @method _notifyInfinityModelUpdated
     */
    _notifyInfinityModelUpdated: function _notifyInfinityModelUpdated(newObjects) {
      if (!this.infinityModelUpdated) {
        return;
      }

      Ember['default'].run.scheduleOnce('afterRender', this, 'infinityModelUpdated', {
        lastPageLoaded: this.get('currentPage'),
        totalPages: this.get('_totalPages'),
        newObjects: newObjects
      });
    },

    /**
     finish the loading cycle by notifying that infinity has been reached
      @private
     @method _notifyInfinityModelLoaded
     */
    _notifyInfinityModelLoaded: function _notifyInfinityModelLoaded() {
      if (!this.infinityModelLoaded) {
        return;
      }

      var totalPages = this.get('_totalPages');
      Ember['default'].run.scheduleOnce('afterRender', this, 'infinityModelLoaded', { totalPages: totalPages });
    }
  });

  exports['default'] = RouteMixin;

});
define('ember-simple-auth', ['ember-simple-auth/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-simple-auth/authenticators/base', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var RSVP = Ember['default'].RSVP;

  /**
    The base class for all authenticators. __This serves as a starting point for
    implementing custom authenticators and must not be used directly.__

    The authenticator authenticates the session. The actual mechanism used to do
    this might e.g. be posting a set of credentials to a server and in exchange
    retrieving an access token, initiating authentication against an external
    provider like Facebook etc. and depends on the specific authenticator. Any
    data that the authenticator receives upon successful authentication and
    resolves with from the
    {{#crossLink "BaseAuthenticator/authenticate:method"}}{{/crossLink}}
    method is stored in the session and can be accessed via the session service
    and be used by the authorizer (see
    {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) to e.g.
    authorize outgoing requests.

    The authenticator also decides whether a set of data that was restored from
    the session store (see
    {{#crossLink "BaseStore/restore:method"}}{{/crossLink}}) makes up an
    authenticated session or not.

    __Authenticators for an application are defined in the `app/authenticators`
    directory__, e.g.:

    ```js
    // app/authenticators/oauth2.js
    import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';

    export default OAuth2PasswordGrantAuthenticator.extend({
      ...
    });
    ```

    and can then be used with the name Ember CLI automatically registers them
    with in the Ember container:

    ```js
    // app/components/login-form.js
    export default Ember.Controller.extend({
      session: Ember.inject.service(),

      actions: {
        authenticate: function() {
          this.get('session').authenticate('authenticator:oauth2');
        }
      }
    });
    ```

    @class BaseAuthenticator
    @module ember-simple-auth/authenticators/base
    @extends Ember.Object
    @uses Ember.Evented
    @public
  */
  exports['default'] = Ember['default'].Object.extend(Ember['default'].Evented, {
    /**
      __Triggered when the authentication data is updated by the authenticator
      due to an external or scheduled event__. This might happen e.g. if the
      authenticator refreshes an expired token or an event is triggered from an
      external authentication provider that the authenticator uses. The session
      handles that event, passes the updated data back to the authenticator's
      {{#crossLink "BaseAuthenticator/restore:method"}}{{/crossLink}}
      method and handles the result of that invocation accordingly.
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      __Triggered when the authenciation data is invalidated by the authenticator
      due to an external or scheduled event__. This might happen e.g. if a token
      expires or an event is triggered from an external authentication provider
      that the authenticator uses. The session handles that event and will
      invalidate itself when it is triggered.
       @event sessionDataInvalidated
      @public
    */

    /**
      Restores the session from a session data object. __This method is invoked
      by the session either on application startup if session data is restored
      from the session store__ or when properties in the store change due to
      external events (e.g. in another tab) and the new session data needs to be
      validated for whether it constitutes an authenticated session.
       __This method returns a promise. A resolving promise results in the session
      becoming or remaining authenticated.__ Any data the promise resolves with
      will be saved in and accessible via the session service's
      `data.authenticated` property (see
      {{#crossLink "SessionService/data:property"}}{{/crossLink}}). A rejecting
      promise indicates that `data` does not constitute a valid session and will
      result in the session being invalidated or remaining unauthencicated.
       The `BaseAuthenticator`'s implementation always returns a rejecting
      promise. __This method must be overridden in subclasses.__
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore() {
      return RSVP.reject();
    },

    /**
      Authenticates the session with the specified `args`. These options vary
      depending on the actual authentication mechanism the authenticator
      implements (e.g. a set of credentials or a Facebook account id etc.). __The
      session will invoke this method in order to authenticate itself__ (see
      {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}}).
       __This method returns a promise. A resolving promise will result in the
      session becoming authenticated.__ Any data the promise resolves with will
      be saved in and accessible via the session service's `data.authenticated`
      property (see {{#crossLink "SessionService/data:property"}}{{/crossLink}}).
      A rejecting promise indicates that authentication failed and will result in
      the session remaining unauthenticated.
       The `BaseAuthenticator`'s implementation always returns a rejecting promise
      and thus never authenticates the session. __This method must be overridden
      in subclasses__.
       @method authenticate
      @param {Any} [...args] The arguments that the authenticator requires to authenticate the session
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate() {
      return RSVP.reject();
    },

    /**
      This method is invoked as a callback when the session is invalidated. While
      the session will invalidate itself and clear all authenticated session data,
      it might be necessary for some authenticators to perform additional tasks
      (e.g. invalidating an access token on the server side).
       __This method returns a promise. A resolving promise will result in the
      session becoming unauthenticated.__ A rejecting promise will result in
      invalidation being intercepted and the session remaining authenticated.
       The `BaseAuthenticator`'s implementation always returns a resolving promise
      and thus never intercepts session invalidation. __This method doesn't have
      to be overridden in custom authenticators__ if no actions need to be
      performed on session invalidation.
       @method invalidate
      @param {Object} data The current authenticated session data
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate() {
      return RSVP.resolve();
    }
  });

});
define('ember-simple-auth/authenticators/devise', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, Ember, BaseAuthenticator) {

  'use strict';

  var RSVP = Ember['default'].RSVP;
  var isEmpty = Ember['default'].isEmpty;
  var run = Ember['default'].run;
  var get = Ember['default'].get;

  /**
    Authenticator that works with the Ruby gem
    [devise](https://github.com/plataformatec/devise).

    __As token authentication is not actually part of devise anymore, the server
    needs to implement some customizations__ to work with this authenticator -
    see [this gist](https://gist.github.com/josevalim/fb706b1e933ef01e4fb6).

    @class DeviseAuthenticator
    @module ember-simple-auth/authenticators/devise
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = BaseAuthenticator['default'].extend({
    /**
      The endpoint on the server that the authentication request is sent to.
       @property serverTokenEndpoint
      @type String
      @default '/users/sign_in'
      @public
    */
    serverTokenEndpoint: '/users/sign_in',

    /**
      The devise resource name. __This will be used in the request and also be
      expected in the server's response.__
       @property resourceName
      @type String
      @default 'user'
      @public
    */
    resourceName: 'user',

    /**
      The token attribute name. __This will be used in the request and also be
      expected in the server's response.__
       @property tokenAttributeName
      @type String
      @default 'token'
      @public
    */
    tokenAttributeName: 'token',

    /**
      The identification attribute name. __This will be used in the request and
      also be expected in the server's response.__
       @property identificationAttributeName
      @type String
      @default 'email'
      @public
    */
    identificationAttributeName: 'email',

    /**
      Restores the session from a session data object; __returns a resolving
      promise when there are non-empty
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
      and
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}
      values in `data`__ and a rejecting promise otherwise.
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _getProperties = this.getProperties('tokenAttributeName', 'identificationAttributeName');

      var tokenAttributeName = _getProperties.tokenAttributeName;
      var identificationAttributeName = _getProperties.identificationAttributeName;

      var tokenAttribute = get(data, tokenAttributeName);
      var identificationAttribute = get(data, identificationAttributeName);
      return new RSVP.Promise(function (resolve, reject) {
        if (!isEmpty(tokenAttribute) && !isEmpty(identificationAttribute)) {
          resolve(data);
        } else {
          reject();
        }
      });
    },

    /**
      Authenticates the session with the specified `identification` and
      `password`; the credentials are `POST`ed to the
      {{#crossLink "DeviseAuthenticator/serverTokenEndpoint:property"}}server{{/crossLink}}.
      If the credentials are valid the server will responds with a
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
      and
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}.
      __If the credentials are valid and authentication succeeds, a promise that
      resolves with the server's response is returned__, otherwise a promise that
      rejects with the server error is returned.
       @method authenticate
      @param {String} identification The user's identification
      @param {String} password The user's password
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(identification, password) {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var _getProperties2 = _this.getProperties('resourceName', 'identificationAttributeName');

        var resourceName = _getProperties2.resourceName;
        var identificationAttributeName = _getProperties2.identificationAttributeName;

        var data = {};
        data[resourceName] = { password: password };
        data[resourceName][identificationAttributeName] = identification;

        _this.makeRequest(data).then(function (response) {
          run(null, resolve, response);
        }, function (xhr) {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      });
    },

    /**
      Does nothing
       @method invalidate
      @return {Ember.RSVP.Promise} A resolving promise
      @public
    */
    invalidate: function invalidate() {
      return RSVP.resolve();
    },

    /**
      Makes a request to the devise server.
       @method makeRequest
      @param {Object} data The request data
      @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
      @protected
    */
    makeRequest: function makeRequest(data) {
      var serverTokenEndpoint = this.get('serverTokenEndpoint');
      return Ember['default'].$.ajax({
        url: serverTokenEndpoint,
        type: 'POST',
        dataType: 'json',
        data: data,
        beforeSend: function beforeSend(xhr, settings) {
          xhr.setRequestHeader('Accept', settings.accepts.json);
        }
      });
    }
  });

});
define('ember-simple-auth/authenticators/oauth2-password-grant', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, Ember, BaseAuthenticator) {

  'use strict';

  /* jscs:disable requireDotNotation */
  var RSVP = Ember['default'].RSVP;
  var isEmpty = Ember['default'].isEmpty;
  var run = Ember['default'].run;

  /**
    Authenticator that conforms to OAuth 2
    ([RFC 6749](http://tools.ietf.org/html/rfc6749)), specifically the _"Resource
    Owner Password Credentials Grant Type"_.

    This authenticator also automatically refreshes access tokens (see
    [RFC 6749, section 6](http://tools.ietf.org/html/rfc6749#section-6)) if the
    server supports it.

    @class OAuth2PasswordGrantAuthenticator
    @module ember-simple-auth/authenticators/oauth2-password-grant
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = BaseAuthenticator['default'].extend({
    /**
      Triggered when the authenticator refreshed the access token (see
      [RFC 6749, section 6](http://tools.ietf.org/html/rfc6749#section-6)).
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      The client_id to be sent to the authentication server (see
      https://tools.ietf.org/html/rfc6749#appendix-A.1). __This should only be
      used for statistics or logging etc. as it cannot actually be trusted since
      it could have been manipulated on the client!__
       @property clientId
      @type String
      @default null
      @public
    */
    clientId: null,

    /**
      The endpoint on the server that authentication and token refresh requests
      are sent to.
       @property serverTokenEndpoint
      @type String
      @default '/token'
      @public
    */
    serverTokenEndpoint: '/token',

    /**
      The endpoint on the server that token revocation requests are sent to. Only
      set this if the server actually supports token revokation. If this is
      `null`, the authenticator will not revoke tokens on session invalidation.
       __If token revocation is enabled but fails, session invalidation will be
      intercepted and the session will remain authenticated (see
      {{#crossLink "OAuth2PasswordGrantAuthenticator/invalidate:method"}}{{/crossLink}}).__
       @property serverTokenRevocationEndpoint
      @type String
      @default null
      @public
    */
    serverTokenRevocationEndpoint: null,

    /**
      Sets whether the authenticator automatically refreshes access tokens if the
      server supports it.
       @property refreshAccessTokens
      @type Boolean
      @default true
      @public
    */
    refreshAccessTokens: true,

    _refreshTokenTimeout: null,

    /**
      Restores the session from a session data object; __will return a resolving
      promise when there is a non-empty `access_token` in the session data__ and
      a rejecting promise otherwise.
       If the server issues expiring access tokens and there is an expired access
      token in the session data along with a refresh token, the authenticator
      will try to refresh the access token and return a promise that resolves
      with the new access token if the refresh was successful. If there is no
      refresh token or the token refresh is not successful, a rejecting promise
      will be returned.
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var now = new Date().getTime();
        var refreshAccessTokens = _this.get('refreshAccessTokens');
        if (!isEmpty(data['expires_at']) && data['expires_at'] < now) {
          if (refreshAccessTokens) {
            _this._refreshAccessToken(data['expires_in'], data['refresh_token']).then(resolve, reject);
          } else {
            reject();
          }
        } else {
          if (isEmpty(data['access_token'])) {
            reject();
          } else {
            _this._scheduleAccessTokenRefresh(data['expires_in'], data['expires_at'], data['refresh_token']);
            resolve(data);
          }
        }
      });
    },

    /**
      Authenticates the session with the specified `identification`, `password`
      and optional `scope`; issues a `POST` request to the
      {{#crossLink "OAuth2PasswordGrantAuthenticator/serverTokenEndpoint:property"}}{{/crossLink}}
      and receives the access token in response (see
      http://tools.ietf.org/html/rfc6749#section-4.3).
       __If the credentials are valid (and the optionally requested scope is
      granted) and thus authentication succeeds, a promise that resolves with the
      server's response is returned__, otherwise a promise that rejects with the
      error as returned by the server is returned.
       __If the server supports it, this method also schedules refresh requests
      for the access token before it expires.__
       @method authenticate
      @param {String} identification The resource owner username
      @param {String} password The resource owner password
      @param {String|Array} scope The scope of the access request (see [RFC 6749, section 3.3](http://tools.ietf.org/html/rfc6749#section-3.3))
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(identification, password) {
      var _this2 = this;

      var scope = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      return new RSVP.Promise(function (resolve, reject) {
        var data = { 'grant_type': 'password', username: identification, password: password };
        var serverTokenEndpoint = _this2.get('serverTokenEndpoint');
        var scopesString = Ember['default'].makeArray(scope).join(' ');
        if (!Ember['default'].isEmpty(scopesString)) {
          data.scope = scopesString;
        }
        _this2.makeRequest(serverTokenEndpoint, data).then(function (response) {
          run(function () {
            var expiresAt = _this2._absolutizeExpirationTime(response['expires_in']);
            _this2._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
            if (!isEmpty(expiresAt)) {
              response = Ember['default'].merge(response, { 'expires_at': expiresAt });
            }
            resolve(response);
          });
        }, function (xhr) {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      });
    },

    /**
      If token revocation is enabled, this will revoke the access token (and the
      refresh token if present). If token revocation succedds, this method
      returns a resolving promise, otherwise it will return a rejecting promise,
      thus intercepting session invalidation.
       If token revocation is not enabled this method simply returns a resolving
      promise.
       @method invalidate
      @param {Object} data The current authenticated session data
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate(data) {
      var _this3 = this;

      var serverTokenRevocationEndpoint = this.get('serverTokenRevocationEndpoint');
      function success(resolve) {
        run.cancel(this._refreshTokenTimeout);
        delete this._refreshTokenTimeout;
        resolve();
      }
      return new RSVP.Promise(function (resolve) {
        if (isEmpty(serverTokenRevocationEndpoint)) {
          success.apply(_this3, [resolve]);
        } else {
          (function () {
            var requests = [];
            Ember['default'].A(['access_token', 'refresh_token']).forEach(function (tokenType) {
              var token = data[tokenType];
              if (!isEmpty(token)) {
                requests.push(_this3.makeRequest(serverTokenRevocationEndpoint, {
                  'token_type_hint': tokenType, token: token
                }));
              }
            });
            var succeed = function succeed() {
              success.apply(_this3, [resolve]);
            };
            RSVP.all(requests).then(succeed, succeed);
          })();
        }
      });
    },

    /**
      Makes a request to the OAuth 2.0 server.
       @method makeRequest
      @param {String} url The request URL
      @param {Object} data The request data
      @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
      @protected
    */
    makeRequest: function makeRequest(url, data) {
      var options = {
        url: url,
        data: data,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded'
      };
      var clientId = this.get('clientId');

      if (!isEmpty(clientId)) {
        var base64ClientId = window.btoa(clientId.concat(':'));
        Ember['default'].merge(options, {
          headers: {
            Authorization: 'Basic ' + base64ClientId
          }
        });
      }

      return Ember['default'].$.ajax(options);
    },

    _scheduleAccessTokenRefresh: function _scheduleAccessTokenRefresh(expiresIn, expiresAt, refreshToken) {
      var refreshAccessTokens = this.get('refreshAccessTokens');
      if (refreshAccessTokens) {
        var now = new Date().getTime();
        if (isEmpty(expiresAt) && !isEmpty(expiresIn)) {
          expiresAt = new Date(now + expiresIn * 1000).getTime();
        }
        var offset = (Math.floor(Math.random() * 5) + 5) * 1000;
        if (!isEmpty(refreshToken) && !isEmpty(expiresAt) && expiresAt > now - offset) {
          run.cancel(this._refreshTokenTimeout);
          delete this._refreshTokenTimeout;
          if (!Ember['default'].testing) {
            this._refreshTokenTimeout = run.later(this, this._refreshAccessToken, expiresIn, refreshToken, expiresAt - now - offset);
          }
        }
      }
    },

    _refreshAccessToken: function _refreshAccessToken(expiresIn, refreshToken) {
      var _this4 = this;

      var data = { 'grant_type': 'refresh_token', 'refresh_token': refreshToken };
      var serverTokenEndpoint = this.get('serverTokenEndpoint');
      return new RSVP.Promise(function (resolve, reject) {
        _this4.makeRequest(serverTokenEndpoint, data).then(function (response) {
          run(function () {
            expiresIn = response['expires_in'] || expiresIn;
            refreshToken = response['refresh_token'] || refreshToken;
            var expiresAt = _this4._absolutizeExpirationTime(expiresIn);
            var data = Ember['default'].merge(response, { 'expires_in': expiresIn, 'expires_at': expiresAt, 'refresh_token': refreshToken });
            _this4._scheduleAccessTokenRefresh(expiresIn, null, refreshToken);
            _this4.trigger('sessionDataUpdated', data);
            resolve(data);
          });
        }, function (xhr, status, error) {
          Ember['default'].Logger.warn('Access token could not be refreshed - server responded with ' + error + '.');
          reject();
        });
      });
    },

    _absolutizeExpirationTime: function _absolutizeExpirationTime(expiresIn) {
      if (!isEmpty(expiresIn)) {
        return new Date(new Date().getTime() + expiresIn * 1000).getTime();
      }
    }
  });

});
define('ember-simple-auth/authenticators/test', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, Ember, BaseAuthenticator) {

  'use strict';

  var RSVP = Ember['default'].RSVP;

  exports['default'] = BaseAuthenticator['default'].extend({
    restore: function restore(data) {
      return RSVP.resolve(data);
    },

    authenticate: function authenticate(data) {
      return RSVP.resolve(data);
    },

    invalidate: function invalidate() {
      return RSVP.resolve();
    }
  });

});
define('ember-simple-auth/authenticators/torii', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, Ember, BaseAuthenticator) {

  'use strict';

  var RSVP = Ember['default'].RSVP;
  var isEmpty = Ember['default'].isEmpty;

  /**
    Authenticator that wraps the
    [Torii library](https://github.com/Vestorly/torii) and thus allows to connect
    any external authentication provider that torii defines a provider for.

    In order to use this authenticator, __the application needs to have the
    [torii addon](https://github.com/Vestorly/torii) installed and must inject
    the torii service into the authenticator__:

    ```js
    // app/authenticators/torii.js
    import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';

    export default ToriiAuthenticator.extend(
      torii: Ember.inject.service()
    )
    ```

    @class ToriiAuthenticator
    @module ember-simple-auth/authenticators/torii
    @extends BaseAuthenticator
    @public
  */
  exports['default'] = BaseAuthenticator['default'].extend({
    _provider: null,

    /**
      Restores the session by calling the torii provider's `fetch` method.
       __Many torii providers do not implement the `fetch` method__. If the
      provider in use does not implement the method simply add it as follows:
       ```js
      // app/providers/facebook.js
      import FacebookOauth2Provider from 'torii/providers/facebook-oauth2';
       export default FacebookOauth2Provider.extend({
        fetch(data) {
          return data;
        }
      });
      ```
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
      @public
    */
    restore: function restore(data) {
      var _this = this;

      this._assertToriiIsPresent();

      data = data || {};
      return new RSVP.Promise(function (resolve, reject) {
        if (!isEmpty(data.provider)) {
          (function () {
            var _data = data;
            var provider = _data.provider;

            _this.get('torii').fetch(data.provider, data).then(function (data) {
              _this._resolveWith(provider, data, resolve);
            }, function () {
              delete _this._provider;
              reject();
            });
          })();
        } else {
          delete _this._provider;
          reject();
        }
      });
    },

    /**
      Authenticates the session by opening the torii provider. For more
      documentation on torii, see the
      [project's README](https://github.com/Vestorly/torii#readme).
       @method authenticate
      @param {String} provider The torii provider to authenticate the session with
      @param {Object} options The options to pass to the torii provider
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
      @public
    */
    authenticate: function authenticate(provider, options) {
      var _this2 = this;

      this._assertToriiIsPresent();

      return new RSVP.Promise(function (resolve, reject) {
        _this2.get('torii').open(provider, options || {}).then(function (data) {
          _this2._resolveWith(provider, data, resolve);
        }, reject);
      });
    },

    /**
      Closes the torii provider. If the provider is successfully closed, this
      method returns a resolving promise, otherwise it will return a rejecting
      promise, thus intercepting session invalidation.
       @method invalidate
      @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      @public
    */
    invalidate: function invalidate() {
      var _this3 = this;

      return new RSVP.Promise(function (resolve, reject) {
        _this3.get('torii').close(_this3._provider).then(function () {
          delete _this3._provider;
          resolve();
        }, reject);
      });
    },

    _resolveWith: function _resolveWith(provider, data, resolve) {
      data.provider = provider;
      this._provider = data.provider;
      resolve(data);
    },

    _assertToriiIsPresent: function _assertToriiIsPresent() {
      var torii = this.get('torii');
      Ember['default'].assert('You are trying to use the torii authenticator but torii is not available. Inject torii into the authenticator with "torii: Ember.inject.service()".', Ember['default'].isPresent(torii));
    }
  });

});
define('ember-simple-auth/authorizers/base', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    /**
      Authorizes a block of code. This method will be invoked by the session
      service's {{#crossLink "SessionService/authorize:method"}}{{/crossLink}}
      method which will pass the current authenticated session data (see
      {{#crossLink "SessionService/data:property"}}{{/crossLink}}) and a block.
      Depending on the mechanism it implements, the authorizer transforms the
      session data into authorization data and invokes the block with that data.
       `BaseAuthorizer`'s implementation does nothing. __This method must be
      overridden in custom authorizers.__
       @method authorize
      @param {Object} data The current authenticated session data
      @param {Function} block The callback to call with the authorization data
      @public
    */
    authorize: function authorize() {}
  });

});
define('ember-simple-auth/authorizers/devise', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, Ember, BaseAuthorizer) {

  'use strict';

  var isEmpty = Ember['default'].isEmpty;

  /**
    Authorizer that works with the Ruby gem
    [devise](https://github.com/plataformatec/devise); includes the user's token
    and identification from the session data in the `Authorization` HTTP header,
    e.g.:

    ```
    Authorization: token="234rtgjneroigne4" email="user@domain.tld"
    ```

    __As token authentication is not actually part of devise anymore, the server
    needs to implement some customizations__ to work with this authenticator -
    see [this gist](https://gist.github.com/josevalim/fb706b1e933ef01e4fb6).

    @class DeviseAuthorizer
    @module ember-simple-auth/authorizers/devise
    @extends BaseAuthorizer
    @public
  */
  exports['default'] = BaseAuthorizer['default'].extend({
    /**
      The token attribute name.
       @property tokenAttributeName
      @type String
      @default 'token'
      @public
    */
    tokenAttributeName: 'token',

    /**
      The identification attribute name.
       @property identificationAttributeName
      @type String
      @default 'email'
      @public
    */
    identificationAttributeName: 'email',

    /**
      Includes the user's token (see
      {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}{{/crossLink}})
      and identification (see
      {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}{{/crossLink}})
      in the `Authorization` header.
       @method authorize
      @param {Object} data The data that the session currently holds
      @param {Function} block(headerName,headerContent) The callback to call with the authorization data; will receive the header name and header content as arguments
      @public
    */
    authorize: function authorize(data, block) {
      var _getProperties = this.getProperties('tokenAttributeName', 'identificationAttributeName');

      var tokenAttributeName = _getProperties.tokenAttributeName;
      var identificationAttributeName = _getProperties.identificationAttributeName;

      var userToken = data[tokenAttributeName];
      var userIdentification = data[identificationAttributeName];
      if (!isEmpty(userToken) && !isEmpty(userIdentification)) {
        var authData = tokenAttributeName + '="' + userToken + '", ' + identificationAttributeName + '="' + userIdentification + '"';
        block('Authorization', 'Token ' + authData);
      }
    }
  });

});
define('ember-simple-auth/authorizers/oauth2-bearer', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, Ember, Base) {

  'use strict';

  /* jscs:disable requireDotNotation */
  var isEmpty = Ember['default'].isEmpty;

  /**
    Authorizer that conforms to OAuth 2
    ([RFC 6749](http://tools.ietf.org/html/rfc6749)); includes the access token
    from the session data as a bearer token
    ([RFC 6750](http://tools.ietf.org/html/rfc6750)) in the `Authorization`
    header, e.g.:

    ```
    Authorization: Bearer 234rtgjneroigne4
    ```

    @class OAuth2BearerAuthorizer
    @module ember-simple-auth/authorizers/oauth2-bearer
    @extends BaseAuthorizer
    @public
  */
  exports['default'] = Base['default'].extend({
    /**
      Includes the access token from the session data into the `Authorization`
      header as a Bearer token, e.g.:
       ```
      Authorization: Bearer 234rtgjneroigne4
      ```
       @method authorize
      @param {Object} data The data that the session currently holds
      @param {Function} block(headerName,headerContent) The callback to call with the authorization data; will receive the header name and header content as arguments
      @public
    */
    authorize: function authorize(data, block) {
      var accessToken = data['access_token'];
      if (!isEmpty(accessToken)) {
        block('Authorization', 'Bearer ' + accessToken);
      }
    }
  });

});
define('ember-simple-auth/configuration', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var DEFAULTS = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index'
  };

  /**
    Ember Simple Auth's configuration object.

    To change any of these values, set them on the application's environment
    object, e.g.:

    ```js
    // config/environment.js
    ENV['ember-simple-auth'] = {
      authenticationRoute: 'sign-in'
    };
    ```

    @class Configuration
    @extends Object
    @module ember-simple-auth/configuration
    @public
  */
  exports['default'] = {
    /**
      The base URL of the application as configured in `config/environment.js`.
       @property baseURL
      @readOnly
      @static
      @type String
      @default '/'
      @public
    */
    baseURL: null,

    /**
      The route to transition to for authentication. The
      {{#crossLink "AuthenticatedRouteMixin"}}{{/crossLink}} will transition to
      this route when a route that implements the mixin is accessed when the
      route is not authenticated.
       @property authenticationRoute
      @readOnly
      @static
      @type String
      @default 'login'
      @public
    */
    authenticationRoute: DEFAULTS.authenticationRoute,

    /**
      The route to transition to after successful authentication.
       @property routeAfterAuthentication
      @readOnly
      @static
      @type String
      @default 'index'
      @public
    */
    routeAfterAuthentication: DEFAULTS.routeAfterAuthentication,

    /**
      The route to transition to if a route that implements the
      {{#crossLink "UnauthenticatedRouteMixin"}}{{/crossLink}} is accessed when
      the session is authenticated.
       @property routeIfAlreadyAuthenticated
      @readOnly
      @static
      @type String
      @default 'index'
      @public
    */
    routeIfAlreadyAuthenticated: DEFAULTS.routeIfAlreadyAuthenticated,

    load: function load(config) {
      var wrappedConfig = Ember['default'].Object.create(config);
      for (var property in this) {
        if (this.hasOwnProperty(property) && Ember['default'].typeOf(this[property]) !== 'function') {
          this[property] = wrappedConfig.getWithDefault(property, DEFAULTS[property]);
        }
      }
    }
  };

});
define('ember-simple-auth/initializers/setup-session-service', ['exports', 'ember-simple-auth/utils/inject'], function (exports, inject) {

  'use strict';



  exports['default'] = setupSessionStore;
  function setupSessionStore(registry) {
    inject['default'](registry, 'service:session', 'session', 'session:main');
  }

});
define('ember-simple-auth/initializers/setup-session', ['exports', 'ember', 'ember-simple-auth/internal-session', 'ember-simple-auth/session-stores/ephemeral', 'ember-simple-auth/utils/inject'], function (exports, Ember, InternalSession, Ephemeral, inject) {

  'use strict';



  exports['default'] = setupSession;
  function setupSession(registry) {
    registry.register('session:main', InternalSession['default']);

    var store = 'session-store:application';
    if (Ember['default'].testing) {
      store = 'session-store:test';
      registry.register(store, Ephemeral['default']);
    }
    inject['default'](registry, 'session:main', 'store', store);
  }

});
define('ember-simple-auth/instance-initializers/setup-session-restoration', ['exports', 'ember-simple-auth/utils/lookup'], function (exports, lookup) {

  'use strict';



  exports['default'] = setupSessionRestoration;
  function setupSessionRestoration(instance) {
    var applicationRoute = lookup['default'](instance, 'route:application');
    var session = lookup['default'](instance, 'session:main');
    var originalBeforeModel = applicationRoute.beforeModel;
    var applyOriginalBeforeModel = function applyOriginalBeforeModel() {
      return originalBeforeModel.apply(applicationRoute, arguments);
    };
    applicationRoute.reopen({
      beforeModel: function beforeModel() {
        var _arguments = arguments;

        return session.restore().then(function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        }, function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        });
      }
    });
  }

});
define('ember-simple-auth/internal-session', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var on = Ember['default'].on;

  exports['default'] = Ember['default'].ObjectProxy.extend(Ember['default'].Evented, {
    authenticator: null,
    store: null,
    container: null,
    isAuthenticated: false,
    attemptedTransition: null,
    content: { authenticated: {} },

    authenticate: function authenticate() {
      var _this = this;

      var args = Array.prototype.slice.call(arguments);
      var authenticator = args.shift();
      Ember['default'].assert('Session#authenticate requires the authenticator to be specified, was "' + authenticator + '"!', !Ember['default'].isEmpty(authenticator));
      var theAuthenticator = this.container.lookup(authenticator);
      Ember['default'].assert('No authenticator for factory "' + authenticator + '" could be found!', !Ember['default'].isNone(theAuthenticator));
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        theAuthenticator.authenticate.apply(theAuthenticator, args).then(function (content) {
          _this._setup(authenticator, content, true);
          resolve();
        }, function (error) {
          _this._clear();
          reject(error);
        });
      });
    },

    invalidate: function invalidate() {
      var _this2 = this;

      Ember['default'].assert('Session#invalidate requires the session to be authenticated!', this.get('isAuthenticated'));
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        var authenticator = _this2.container.lookup(_this2.authenticator);
        authenticator.invalidate(_this2.content.authenticated).then(function () {
          authenticator.off('sessionDataUpdated');
          _this2._clear(true);
          resolve();
        }, function (error) {
          _this2.trigger('sessionInvalidationFailed', error);
          reject(error);
        });
      });
    },

    restore: function restore() {
      var _this3 = this;

      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        var restoredContent = _this3.store.restore();

        var _ref = restoredContent.authenticated || {};

        var authenticator = _ref.authenticator;

        if (!!authenticator) {
          delete restoredContent.authenticated.authenticator;
          _this3.container.lookup(authenticator).restore(restoredContent.authenticated).then(function (content) {
            _this3.set('content', restoredContent);
            _this3._setup(authenticator, content);
            resolve();
          }, function () {
            Ember['default'].Logger.debug('The authenticator "' + authenticator + '" rejected to restore the session - invalidating…');
            _this3.set('content', restoredContent);
            _this3._clear();
            reject();
          });
        } else {
          delete (restoredContent || {}).authenticated;
          _this3.set('content', restoredContent);
          _this3._clear();
          reject();
        }
      });
    },

    _setup: function _setup(authenticator, authenticatedContend, trigger) {
      trigger = !!trigger && !this.get('isAuthenticated');
      this.beginPropertyChanges();
      this.setProperties({
        isAuthenticated: true,
        authenticator: authenticator
      });
      Ember['default'].set(this.content, 'authenticated', authenticatedContend);
      this._bindToAuthenticatorEvents();
      this._updateStore();
      this.endPropertyChanges();
      if (trigger) {
        this.trigger('authenticationSucceeded');
      }
    },

    _clear: function _clear(trigger) {
      trigger = !!trigger && this.get('isAuthenticated');
      this.beginPropertyChanges();
      this.setProperties({
        isAuthenticated: false,
        authenticator: null
      });
      Ember['default'].set(this.content, 'authenticated', {});
      this._updateStore();
      this.endPropertyChanges();
      if (trigger) {
        this.trigger('invalidationSucceeded');
      }
    },

    setUnknownProperty: function setUnknownProperty(key, value) {
      Ember['default'].assert('"authenticated" is a reserved key used by Ember Simple Auth!', key !== 'authenticated');
      var result = this._super(key, value);
      this._updateStore();
      return result;
    },

    _updateStore: function _updateStore() {
      var data = this.content;
      if (!Ember['default'].isEmpty(this.authenticator)) {
        Ember['default'].set(data, 'authenticated', Ember['default'].merge({ authenticator: this.authenticator }, data.authenticated || {}));
      }
      this.store.persist(data);
    },

    _bindToAuthenticatorEvents: function _bindToAuthenticatorEvents() {
      var _this4 = this;

      var authenticator = this.container.lookup(this.authenticator);
      authenticator.off('sessionDataUpdated');
      authenticator.off('sessionDataInvalidated');
      authenticator.on('sessionDataUpdated', function (content) {
        _this4._setup(_this4.authenticator, content);
      });
      authenticator.on('sessionDataInvalidated', function () {
        _this4._clear(true);
      });
    },

    _bindToStoreEvents: on('init', function () {
      var _this5 = this;

      this.store.on('sessionDataUpdated', function (content) {
        var _ref2 = content.authenticated || {};

        var authenticator = _ref2.authenticator;

        if (!!authenticator) {
          delete content.authenticated.authenticator;
          _this5.container.lookup(authenticator).restore(content.authenticated).then(function (authenticatedContent) {
            _this5.set('content', content);
            _this5._setup(authenticator, authenticatedContent, true);
          }, function () {
            Ember['default'].Logger.debug('The authenticator "' + authenticator + '" rejected to restore the session - invalidating…');
            _this5.set('content', content);
            _this5._clear(true);
          });
        } else {
          _this5.set('content', content);
          _this5._clear(true);
        }
      });
    })
  });

});
define('ember-simple-auth/mixins/application-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, Ember, Configuration) {

  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  var inject = Ember['default'].inject;
  var on = Ember['default'].on;

  /**
    The mixin for the application route; __defines methods that are called when
    the session was successfully authenticated (see
    {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}})
    or invalidated__ (see
    {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}).

    Using this mixin is optional. The session events can also be handled
    manually, e.g. in an instance initializer:

    ```js
    // app/instance-initializers/session-events.js
    Ember.Application.initializer({
      name:       'session-events',
      after:      'ember-simple-auth',
      initialize: function(container, application) {
        var applicationRoute = container.lookup('route:application');
        var session          = container.lookup('service:session');
        session.on('authenticationSucceeded', function() {
          applicationRoute.transitionTo('index');
        });
        session.on('invalidationSucceeded', function() {
          window.location.reload();
        });
      }
    });
    ```

    __When using the `ApplicationRouteMixin` you need to specify
    `needs: ['service:session']` in the application route's unit test.__

    @class ApplicationRouteMixin
    @module ember-simple-auth/mixins/application-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = Ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: inject.service('session'),

    _subscribeToSessionEvents: on('init', function () {
      var _this = this,
          _arguments = arguments;

      Ember['default'].A([['authenticationSucceeded', 'sessionAuthenticated'], ['invalidationSucceeded', 'sessionInvalidated']]).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var event = _ref2[0];
        var method = _ref2[1];

        _this.get('session').on(event, Ember['default'].run.bind(_this, function () {
          _this[method].apply(_this, _arguments);
        }));
      });
    }),

    /**
      This method handles the session's
      {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}}
      event. If there is a transition that was previously intercepted by
      {{#crossLink "AuthenticatedRouteMixin/beforeModel:method"}}the
      AuthenticatedRouteMixin's `beforeModel` method{{/crossLink}} it will retry
      it. If there is no such transition, this action transitions to the
      {{#crossLink "Configuration/routeAfterAuthentication:property"}}{{/crossLink}}.
       @method sessionAuthenticated
      @public
    */
    sessionAuthenticated: function sessionAuthenticated() {
      var attemptedTransition = this.get('session.attemptedTransition');
      if (attemptedTransition) {
        attemptedTransition.retry();
        this.set('session.attemptedTransition', null);
      } else {
        this.transitionTo(Configuration['default'].routeAfterAuthentication);
      }
    },

    /**
      This method handles the session's
      {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}
      event. __It reloads the Ember.js application__ by redirecting the browser
      to the application's root URL so that all in-memory data (such as Ember
      Data stores etc.) gets cleared.
       If the Ember.js application will be used in an environment where the users
      don't have direct access to any data stored on the client (e.g.
      [cordova](http://cordova.apache.org)) this action can be overridden to e.g.
      simply transition to the index route.
       @method sessionInvalidated
      @public
    */
    sessionInvalidated: function sessionInvalidated() {
      if (!Ember['default'].testing) {
        window.location.replace(Configuration['default'].baseURL);
      }
    }
  });

});
define('ember-simple-auth/mixins/authenticated-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, Ember, Configuration) {

  'use strict';

  var service = Ember['default'].inject.service;

  /**
    __This mixin is used to make routes accessible only if the session is
    authenticated.__ It defines a `beforeModel` method that aborts the current
    transition and instead transitions to the
    {{#crossLink "Configuration/authenticationRoute:property"}}{{/crossLink}} if
    the session is not authenticated.

    ```js
    // app/routes/protected.js
    import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

    export default Ember.Route.extend(AuthenticatedRouteMixin);
    ```

    @class AuthenticatedRouteMixin
    @module ember-simple-auth/mixins/authenticated-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = Ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      Checks whether the session is authenticated and if it is not aborts the
      current transition and instead transitions to the
      {{#crossLink "Configuration/authenticationRoute:property"}}{{/crossLink}}.
      If the current transition is aborted, this method will save it in the
      session service's
      {{#crossLink "SessionService/attemptedTransition:property"}}{{/crossLink}}
      property so that  it can be retried after the session was authenticated
      (see
      {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}.
       __If `beforeModel` is overridden in a route that uses this mixin, the route's
     implementation must call `this._super(...arguments)`__ so that the mixin's
     `beforeModel` method is actually executed.
       @method beforeModel
      @param {Transition} transition The transition that lead to this route
      @public
    */
    beforeModel: function beforeModel(transition) {
      if (!this.get('session.isAuthenticated')) {
        transition.abort();
        this.get('session').set('attemptedTransition', transition);
        Ember['default'].assert('The route configured as Configuration.authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== Configuration['default'].authenticationRoute);
        this.transitionTo(Configuration['default'].authenticationRoute);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });

});
define('ember-simple-auth/mixins/data-adapter-mixin', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var service = Ember['default'].inject.service;

  /**
    __This mixin can be used to make Ember Data adapters authorize all outgoing
    API requests by injecting a header.__ It works with all authorizers that call
    the authorization callback (see
    {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) with header
    name and header content arguments.

    __The `DataAdapterMixin` will also invalidate the session whenever it
    receives a 401 response for an API request.__

    ```js
    // app/adapters/application.js
    import DS from 'ember-data';
    import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

    export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
      authorizer: 'authorizer:application'
    });
    ```

    @class DataAdapterMixin
    @module ember-simple-auth/mixins/data-adapter-mixin
    @extends Ember.Mixin
    @public
  */

  exports['default'] = Ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      The authorizer that is used to authorize API requests. The authorizer has
      to call the authorization callback (see
      {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) with header
      name and header content arguments. __This property must be overridden in
      adapters using this mixin.__
       @property authorizer
      @type String
      @default null
      @public
    */
    authorizer: null,

    /**
      Defines a `beforeSend` hook (see http://api.jquery.com/jQuery.ajax/) that
      injects a request header containing the authorization data as constructed
      by the {{#crossLink "DataAdapterMixin/authorizer:property"}}{{/crossLink}}
      (see
      {{#crossLink "SessionService/authorize:method"}}{{/crossLink}}). The
      specific header name and contents depend on the actual auhorizer that is
      used.
       @method ajaxOptions
      @protected
    */
    ajaxOptions: function ajaxOptions() {
      var _this = this;

      var authorizer = this.get('authorizer');
      Ember['default'].assert("You're using the DataAdapterMixin without specifying an authorizer. Please add `authorizer: 'authorizer:application'` to your adapter.", Ember['default'].isPresent(authorizer));

      var hash = this._super.apply(this, arguments);
      var beforeSend = hash.beforeSend;

      hash.beforeSend = function (xhr) {
        _this.get('session').authorize(authorizer, function (headerName, headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        });
        if (beforeSend) {
          beforeSend(xhr);
        }
      };
      return hash;
    },

    /**
      This method is called for every response that the adapter receives from the
      API. If the response has a 401 status code it invalidates the session (see
      {{#crossLink "SessionService/invalidate:method"}}{{/crossLink}}).
       @method handleResponse
      @param {Number} status The response status as received from the API
      @protected
    */
    handleResponse: function handleResponse(status) {
      if (status === 401) {
        if (this.get('session.isAuthenticated')) {
          this.get('session').invalidate();
        }
        return true;
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });

});
define('ember-simple-auth/mixins/unauthenticated-route-mixin', ['exports', 'ember', 'ember-simple-auth/configuration'], function (exports, Ember, Configuration) {

  'use strict';

  var service = Ember['default'].inject.service;

  /**
    __This mixin is used to make routes accessible only if the session is
    not authenticated__ (e.g. login and registration routes). It defines a
    `beforeModel` method that aborts the current transition and instead
    transitions to the
    {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}
    if the session is authenticated.

    ```js
    // app/routes/login.js
    import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

    export default Ember.Route.extend(UnauthenticatedRouteMixin);
    ```

    @class UnauthenticatedRouteMixin
    @module ember-simple-auth/mixins/unauthenticated-route-mixin
    @extends Ember.Mixin
    @public
  */
  exports['default'] = Ember['default'].Mixin.create({
    /**
      The session service.
       @property session
      @readOnly
      @type SessionService
      @public
    */
    session: service('session'),

    /**
      Checks whether the session is authenticated and if it is aborts the current
      transition and instead transitions to the
      {{#crossLink "Configuration/routeIfAlreadyAuthenticated:property"}}{{/crossLink}}.
       __If `beforeModel` is overridden in a route that uses this mixin, the route's
     implementation must call `this._super(...arguments)`__ so that the mixin's
     `beforeModel` method is actually executed.
       @method beforeModel
      @param {Transition} transition The transition that lead to this route
      @public
    */
    beforeModel: function beforeModel(transition) {
      if (this.get('session').get('isAuthenticated')) {
        transition.abort();
        Ember['default'].assert('The route configured as Configuration.routeIfAlreadyAuthenticated cannot implement the UnauthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== Configuration['default'].routeIfAlreadyAuthenticated);
        this.transitionTo(Configuration['default'].routeIfAlreadyAuthenticated);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });

});
define('ember-simple-auth/services/session', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var _slice = Array.prototype.slice;
  var SESSION_DATA_KEY_PREFIX = /^data\./;

  var computed = Ember['default'].computed;
  var on = Ember['default'].on;

  /**
    __The session service provides access to the current session as well as
    methods to authenticate and invalidate it__ etc. It is the main interface for
    the application to Ember Simple Auth's functionality. It can be injected via

    ```js
    // app/components/login-form.js
    import Ember from 'ember';

    export default Ember.Component.extend({
      session: Ember.inject.service('session')
    });
    ```

    @class SessionService
    @module ember-simple-auth/services/session
    @extends Ember.Service
    @uses Ember.Evented
    @public
  */
  exports['default'] = Ember['default'].Service.extend(Ember['default'].Evented, {
    /**
      Triggered whenever the session is successfully authenticated. This happens
      when the session gets authenticated via
      {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}} but also
      when the session is authenticated in another tab or window of the same
      application and the session state gets synchronized across tabs or windows
      via the store (see
      {{#crossLink "BaseStore/sessionDataUpdated:event"}}{{/crossLink}}).
       When using the {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} this
      event will automatically get handled (see
      {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}).
       @event authenticationSucceeded
      @public
    */

    /**
      Triggered whenever the session is successfully invalidated. This happens
      when the session gets invalidated via
      {{#crossLink "SessionService/invalidate:method"}}{{/crossLink}} but also
      when the session is invalidated in another tab or window of the same
      application and the session state gets synchronized across tabs or windows
      via the store (see
      {{#crossLink "BaseStore/sessionDataUpdated:event"}}{{/crossLink}}).
       When using the {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} this
      event will automatically get handled (see
      {{#crossLink "ApplicationRouteMixin/sessionInvalidated:method"}}{{/crossLink}}).
       @event invalidationSucceeded
      @public
    */

    /**
      Returns whether the session is currently authenticated.
       @property isAuthenticated
      @type Boolean
      @readOnly
      @default false
      @public
    */
    isAuthenticated: computed.oneWay('session.isAuthenticated'),

    /**
      The current session data as a plain object. The
      `authenticated` key holds the session data that the authenticator resolved
      with when the session was authenticated (see
      {{#crossLink "BaseAuthenticator/authenticate:method"}}{{/crossLink}}) and
      that will be cleared when the session is invalidated. This data cannot be
      written. All other session data is writable and will not be cleared when
      the session is invalidated.
       @property data
      @type Object
      @readOnly
      @default { authenticated: {} }
      @public
    */
    data: computed.oneWay('session.content'),

    /**
      The session store.
       @property store
      @type BaseStore
      @readOnly
      @default null
      @public
    */
    store: computed.oneWay('session.store'),

    /**
      A previously attempted but intercepted transition (e.g. by the
      {{#crossLink "AuthenticatedRouteMixin"}}{{/crossLink}}). If an attempted
      transition is present, the
      {{#crossLink "ApplicationRouteMixin"}}{{/crossLink}} will retry it when the
      session becomes authenticated (see
      {{#crossLink "ApplicationRouteMixin/sessionAuthenticated:method"}}{{/crossLink}}).
       @property attemptedTransition
      @type Transition
      @default null
      @public
    */
    attemptedTransition: computed.alias('session.attemptedTransition'),

    set: function set(key, value) {
      var setsSessionData = SESSION_DATA_KEY_PREFIX.test(key);
      if (setsSessionData) {
        var sessionDataKey = 'session.' + key.replace(SESSION_DATA_KEY_PREFIX, '');
        return this._super(sessionDataKey, value);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    _forwardSessionEvents: on('init', function () {
      var _this = this,
          _arguments = arguments;

      Ember['default'].A(['authenticationSucceeded', 'invalidationSucceeded']).forEach(function (event) {
        // the internal session won't be available in route unit tests
        var session = _this.get('session');
        if (session) {
          session.on(event, function () {
            _this.trigger.apply(_this, [event].concat(_slice.call(_arguments)));
          });
        }
      });
    }),

    /**
      __Authenticates the session with an `authenticator`__ and appropriate
      arguments. The authenticator implements the actual steps necessary to
      authenticate the session (see
      {{#crossLink "BaseAuthenticator/authenticate:method"}}{{/crossLink}}) and
      returns a promise after doing so. The session handles the returned promise
      and when it resolves becomes authenticated, otherwise remains
      unauthenticated. All data the authenticator resolves with will be
      accessible via the
      {{#crossLink "SessionService/data:property"}}session data's{{/crossLink}}
      `authenticated` property.
       __This method returns a promise. A resolving promise indicates that the
      session was successfully authenticated__ while a rejecting promise
      indicates that authentication failed and the session remains
      unauthenticated. The promise does not resolve with a value; instead, the
      data returned from the authenticator is available via the
      {{#crossLink "SessionService/data:property"}}{{/crossLink}} property.
       When authentication succeeds this will trigger the
      {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}}
      event.
       @method authenticate
      @param {String} authenticator The authenticator to use to authenticate the session
      @param {Any} [...args] The arguments to pass to the authenticator; depending on the type of authenticator these might be a set of credentials, a Facebook OAuth Token, etc.
      @return {Ember.RSVP.Promise} A promise that resolves when the session was authenticated successfully and rejects otherwise
      @public
    */
    authenticate: function authenticate() {
      var session = this.get('session');
      return session.authenticate.apply(session, arguments);
    },

    /**
      __Invalidates the session with the authenticator it is currently
      authenticated with__ (see
      {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}}). This
      invokes the authenticator's
      {{#crossLink "BaseAuthenticator/invalidate:method"}}{{/crossLink}} method
      and handles the returned promise accordingly.
       This method returns a promise. A resolving promise indicates that the
      session was successfully invalidated while a rejecting promise indicates
      that invalidation failed and the session remains authenticated. Once the
      session is successfully invalidated it clears all of its authenticated data
      (see {{#crossLink "SessionService/data:property"}}{{/crossLink}}).
       When invalidation succeeds this will trigger the
      {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}
      event.
       @method invalidate
      @return {Ember.RSVP.Promise} A promise that resolves when the session was invalidated successfully and rejects otherwise
      @public
    */
    invalidate: function invalidate() {
      var session = this.get('session');
      return session.invalidate.apply(session, arguments);
    },

    /**
      Authorizes a block of code with an authorizer (see
      {{#crossLink "BaseAuthorizer/authorize:method"}}{{/crossLink}}) if the
      session is authenticated. If the session is not currently authenticated
      this method does nothing.
       ```js
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        xhr.setRequestHeader(headerName, headerValue);
      });
      ```
       @method authorize
      @param {String} authorizer The authorizer to authorize the block with
      @param {Function} block The block of code to call with the authorization data generated by the authorizer
      @public
    */
    authorize: function authorize(authorizerFactory, block) {
      if (this.get('isAuthenticated')) {
        var authorizer = this.container.lookup(authorizerFactory);
        var sessionData = this.get('data.authenticated');
        authorizer.authorize(sessionData, block);
      }
    }
  });

});
define('ember-simple-auth/session-stores/adaptive', ['exports', 'ember', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/session-stores/local-storage', 'ember-simple-auth/session-stores/cookie'], function (exports, Ember, Base, LocalStorage, Cookie) {

  'use strict';

  /* global localStorage */
  var computed = Ember['default'].computed;
  var on = Ember['default'].on;

  var LOCAL_STORAGE_TEST_KEY = '_ember_simple_auth_test_key';

  /**
    Session store that persists data in the browser's `localStorage` (see
    {{#crossLink "LocalStorageStore"}}{{/crossLink}}) if that is available or in
    a cookie (see {{#crossLink "CookieStore"}}{{/crossLink}}) if it is not.

    __This is the default store that Ember Simple Auth will use when the
    application doesn't define a custom store.__

    @class AdaptiveStore
    @module ember-simple-auth/session-stores/adaptive
    @extends BaseStore
    @public
  */
  exports['default'] = Base['default'].extend({
    /**
      The `localStorage` key the store persists data in if `localStorage` is
      available.
       @property localStorageKey
      @type String
      @default 'ember_simple_auth:session'
      @public
    */
    localStorageKey: 'ember_simple_auth:session',

    /**
      The domain to use for the cookie if `localStorage` is not available, e.g.,
      "example.com", ".example.com" (which includes all subdomains) or
      "subdomain.example.com". If not explicitly set, the cookie domain defaults
      to the domain the session was authneticated on.
       @property cookieDomain
      @type String
      @default null
      @public
    */
    cookieDomain: null,

    /**
      The name of the cookie to use if `localStorage` is not available.
       @property cookieName
      @type String
      @default ember_simple_auth:session
      @public
    */
    cookieName: 'ember_simple_auth:session',

    /**
      The expiration time for the cookie in seconds if `localStorage` is not
      available. A value of `null` will make the cookie a session cookie that
      expires and gets deleted when the browser is closed.
       @property cookieExpirationTime
      @default null
      @type Integer
      @public
    */
    cookieExpirationTime: null,

    _isLocalStorageAvailable: computed(function () {
      try {
        localStorage.setItem(LOCAL_STORAGE_TEST_KEY, true);
        localStorage.removeItem(LOCAL_STORAGE_TEST_KEY);
        return true;
      } catch (e) {
        return false;
      }
    }),

    _createStore: function _createStore(storeType, options) {
      var _this = this;

      var store = storeType.create(options);
      store.on('sessionDataUpdated', function (data) {
        _this.trigger('sessionDataUpdated', data);
      });
      return store;
    },

    _setupStore: on('init', function () {
      var store = undefined;
      if (this.get('_isLocalStorageAvailable')) {
        var options = { key: this.get('localStorageKey') };
        store = this._createStore(LocalStorage['default'], options);
      } else {
        var options = this.getProperties('cookieDomain', 'cookieName', 'cookieExpirationTime');
        store = this._createStore(Cookie['default'], options);
      }
      this.set('_store', store);
    }),

    /**
      Persists the `data` in the `localStorage` if it is available or in a cookie
      if it is not.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist() {
      var _get;

      (_get = this.get('_store')).persist.apply(_get, arguments);
    },

    /**
      Returns all data currently stored in the `localStorage` if that is
      available - or if it is not, in the cookie - as a plain object.
       @method restore
      @return {Object} The data currently persisted in the `localStorage`.
      @public
    */
    restore: function restore() {
      return this.get('_store').restore();
    },

    /**
      Clears the store by deleting the
      {{#crossLink "LocalStorageStore/key:property"}}{{/crossLink}} from
      `localStorage` if that is available or by deleting the cookie if it is not.
       @method clear
      @public
    */
    clear: function clear() {
      this.get('_store').clear();
    }
  });

});
define('ember-simple-auth/session-stores/base', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend(Ember['default'].Evented, {
    /**
      Triggered when the session store's data changes due to an external event,
      e.g. from another tab or window of the same application. The session
      handles that event, passes the updated data to its authenticator's
      {{#crossLink "BaseAuthenticator/restore:method"}}{{/crossLink}} method and
      handles the result of that invocation accordingly.
       @event sessionDataUpdated
      @param {Object} data The updated session data
      @public
    */

    /**
      Persists the `data`. This replaces all currently stored data.
       `BaseStores`'s implementation does nothing. __This method must be
      overridden in subclasses__.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist() {},

    /**
      Returns all data currently stored as a plain object.
       `BaseStores`'s implementation returns an empty object. __This method must
      be overridden in subclasses__.
       @method restore
      @return {Object} The data currently persisted in the store.
      @public
    */
    restore: function restore() {
      return {};
    },

    /**
      Clears the store.
       `BaseStores`'s implementation does nothing. __This method must be
      overridden in subclasses__.
       @method clear
      @public
    */
    clear: function clear() {}
  });

});
define('ember-simple-auth/session-stores/cookie', ['exports', 'ember', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/utils/objects-are-equal'], function (exports, Ember, BaseStore, objectsAreEqual) {

  'use strict';

  var computed = Ember['default'].computed;
  var on = Ember['default'].on;

  /**
    Session store that persists data in a cookie.

    By default the cookie session store uses a session cookie that expires and is
    deleted when the browser is closed. The cookie expiration period can be
    configured by setting the
    {{#crossLink "CookieStore/cookieExpirationTime:property"}}{{/crossLink}}
    property. This can be used to implement "remember me" functionality that will
    either store the session persistently or in a session cookie depending on
    whether the user opted in or not:

    ```js
    // app/controllers/login.js
    export default Ember.Controller.extend({
      rememberMe: false,

      _rememberMeChanged: Ember.observer('rememberMe', function() {
        const expirationTime = this.get('rememberMe') ? (14 * 24 * 60 * 60) : null;
        this.set('session.store.cookieExpirationTime', expirationTime);
      }
    });
    ```

    __In order to keep multiple tabs/windows of an application in sync, this
    store has to periodically (every 500ms) check the cookie for changes__ as
    there are no events for cookie changes that the store could subscribe to. If
    the application does not need to make sure all session data is deleted when
    the browser is closed, the
    {{#crossLink "LocalStorageStore"}}`localStorage` session store{{/crossLink}}
    should be used.

    @class CookieStore
    @module ember-simple-auth/session-stores/cookie
    @extends BaseStore
    @public
  */
  exports['default'] = BaseStore['default'].extend({
    /**
      The domain to use for the cookie, e.g., "example.com", ".example.com"
      (which includes all subdomains) or "subdomain.example.com". If not
      explicitly set, the cookie domain defaults to the domain the session was
      authneticated on.
       @property cookieDomain
      @type String
      @default null
      @public
    */
    cookieDomain: null,

    /**
      The name of the cookie.
       @property cookieName
      @type String
      @default ember_simple_auth:session
      @public
    */
    cookieName: 'ember_simple_auth:session',

    /**
      The expiration time for the cookie in seconds. A value of `null` will make
      the cookie a session cookie that expires and gets deleted when the browser
      is closed.
       @property cookieExpirationTime
      @default null
      @type Integer
      @public
    */
    cookieExpirationTime: null,

    _secureCookies: window.location.protocol === 'https:',

    _syncDataTimeout: null,

    _renewExpirationTimeout: null,

    _isPageVisible: computed(function () {
      var visibilityState = document.visibilityState || 'visible';
      return visibilityState === 'visible';
    }).volatile(),

    _setup: on('init', function () {
      this._syncData();
      this._renewExpiration();
    }),

    /**
      Persists the `data` in the cookie.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist(data) {
      data = JSON.stringify(data || {});
      var expiration = this._calculateExpirationTime();
      this._write(data, expiration);
      this._lastData = this.restore();
    },

    /**
      Returns all data currently stored in the cookie as a plain object.
       @method restore
      @return {Object} The data currently persisted in the cookie.
      @public
    */
    restore: function restore() {
      var data = this._read(this.cookieName);
      if (Ember['default'].isEmpty(data)) {
        return {};
      } else {
        return JSON.parse(data);
      }
    },

    /**
      Clears the store by deleting the cookie.
       @method clear
      @public
    */
    clear: function clear() {
      this._write(null, 0);
      this._lastData = {};
    },

    _read: function _read(name) {
      var value = document.cookie.match(new RegExp(name + '=([^;]+)')) || [];
      return decodeURIComponent(value[1] || '');
    },

    _calculateExpirationTime: function _calculateExpirationTime() {
      var cachedExpirationTime = this._read(this.cookieName + ':expiration_time');
      cachedExpirationTime = !!cachedExpirationTime ? new Date().getTime() + cachedExpirationTime * 1000 : null;
      return !!this.cookieExpirationTime ? new Date().getTime() + this.cookieExpirationTime * 1000 : cachedExpirationTime;
    },

    _write: function _write(value, expiration) {
      var path = '; path=/';
      var domain = Ember['default'].isEmpty(this.cookieDomain) ? '' : '; domain=' + this.cookieDomain;
      var expires = Ember['default'].isEmpty(expiration) ? '' : '; expires=' + new Date(expiration).toUTCString();
      var secure = !!this._secureCookies ? ';secure' : '';
      document.cookie = this.cookieName + '=' + encodeURIComponent(value) + domain + path + expires + secure;
      if (expiration !== null) {
        var cachedExpirationTime = this._read(this.cookieName + ':expiration_time');
        document.cookie = this.cookieName + ':expiration_time=' + encodeURIComponent(this.cookieExpirationTime || cachedExpirationTime) + domain + path + expires + secure;
      }
    },

    _syncData: function _syncData() {
      var data = this.restore();
      if (!objectsAreEqual['default'](data, this._lastData)) {
        this._lastData = data;
        this.trigger('sessionDataUpdated', data);
      }
      if (!Ember['default'].testing) {
        Ember['default'].run.cancel(this._syncDataTimeout);
        this._syncDataTimeout = Ember['default'].run.later(this, this._syncData, 500);
      }
    },

    _renew: function _renew() {
      var data = this.restore();
      if (!Ember['default'].isEmpty(data) && data !== {}) {
        data = Ember['default'].typeOf(data) === 'string' ? data : JSON.stringify(data || {});
        var expiration = this._calculateExpirationTime();
        this._write(data, expiration);
      }
    },

    _renewExpiration: function _renewExpiration() {
      if (this.get('_isPageVisible')) {
        this._renew();
      }
      if (!Ember['default'].testing) {
        Ember['default'].run.cancel(this._renewExpirationTimeout);
        this._renewExpirationTimeout = Ember['default'].run.later(this, this._renewExpiration, 60000);
      }
    }
  });

});
define('ember-simple-auth/session-stores/ephemeral', ['exports', 'ember', 'ember-simple-auth/session-stores/base'], function (exports, Ember, BaseStore) {

  'use strict';

  var on = Ember['default'].on;

  /**
    Session store that __persists data in memory and thus is not actually
    persistent__. It does also not synchronize the session's state across
    multiple tabs or windows as those cannot share memory. __This store is mainly
    useful for testing and will automatically be used when running tests.__

    @class EphemeralStore
    @module ember-simple-auth/session-stores/ephemeral
    @extends BaseStore
    @public
  */
  exports['default'] = BaseStore['default'].extend({
    _setup: on('init', function () {
      this.clear();
    }),

    /**
      Persists the `data`. This replaces all currently stored data.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist(data) {
      this._data = JSON.stringify(data || {});
    },

    /**
      Returns all data currently stored as a plain object.
       @method restore
      @return {Object} The data currently persisted in the store.
      @public
    */
    restore: function restore() {
      return JSON.parse(this._data) || {};
    },

    /**
      Clears the store.
       @method clear
      @public
    */
    clear: function clear() {
      delete this._data;
      this._data = '{}';
    }
  });

});
define('ember-simple-auth/session-stores/local-storage', ['exports', 'ember', 'ember-simple-auth/session-stores/base', 'ember-simple-auth/utils/objects-are-equal'], function (exports, Ember, BaseStore, objectsAreEqual) {

  'use strict';

  /* global localStorage */
  var on = Ember['default'].on;

  /**
    Session store that persists data in the browser's `localStorage`.

    __`localStorage` is not available in Safari when running in private mode. In
    general it is better to use the
    {{#crossLink "AdaptiveStore"}}{{/crossLink}} that automatically falls back to
    the {{#crossLink "CookieStore"}}{{/crossLink}} when `localStorage` is not
    available.__

    @class LocalStorageStore
    @module ember-simple-auth/session-stores/local-storage
    @extends BaseStore
    @public
  */
  exports['default'] = BaseStore['default'].extend({
    /**
      The `localStorage` key the store persists data in.
       @property key
      @type String
      @default 'ember_simple_auth:session'
      @public
    */
    key: 'ember_simple_auth:session',

    _setup: on('init', function () {
      this._bindToStorageEvents();
    }),

    /**
      Persists the `data` in the `localStorage`.
       @method persist
      @param {Object} data The data to persist
      @public
    */
    persist: function persist(data) {
      data = JSON.stringify(data || {});
      localStorage.setItem(this.key, data);
      this._lastData = this.restore();
    },

    /**
      Returns all data currently stored in the `localStorage` as a plain object.
       @method restore
      @return {Object} The data currently persisted in the `localStorage`.
      @public
    */
    restore: function restore() {
      var data = localStorage.getItem(this.key);
      return JSON.parse(data) || {};
    },

    /**
      Clears the store by deleting the
      {{#crossLink "LocalStorageStore/key:property"}}{{/crossLink}} from
      `localStorage`.
       @method clear
      @public
    */
    clear: function clear() {
      localStorage.removeItem(this.key);
      this._lastData = {};
    },

    _bindToStorageEvents: function _bindToStorageEvents() {
      var _this = this;

      Ember['default'].$(window).bind('storage', function () {
        var data = _this.restore();
        if (!objectsAreEqual['default'](data, _this._lastData)) {
          _this._lastData = data;
          _this.trigger('sessionDataUpdated', data);
        }
      });
    }
  });

});
define('ember-simple-auth/utils/inject', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function (registry, factoryNameOrType, property, injectionName) {
    var inject = registry.inject || registry.injection;
    inject.call(registry, factoryNameOrType, property, injectionName);
  }

});
define('ember-simple-auth/utils/lookup', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function (instance, factoryName) {
    if (instance.lookup) {
      return instance.lookup(factoryName);
    } else {
      return instance.container.lookup(factoryName);
    }
  }

});
define('ember-simple-auth/utils/objects-are-equal', ['exports'], function (exports) {

  'use strict';

  exports['default'] = objectsAreEqual;

  function objectsAreEqual(a, b) {
    function compare(x, y) {
      var property = undefined;
      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
        return true;
      }

      if (x === y) {
        return true;
      }

      if (!(x instanceof Object && y instanceof Object)) {
        return false;
      }

      for (property in y) {
        if (y.hasOwnProperty(property) !== x.hasOwnProperty(property)) {
          return false;
        } else if (typeof y[property] !== typeof x[property]) {
          return false;
        }
      }

      for (property in x) {
        if (y.hasOwnProperty(property) !== x.hasOwnProperty(property)) {
          return false;
        } else if (typeof y[property] !== typeof x[property]) {
          return false;
        }

        switch (typeof x[property]) {
          case 'object':
            if (!compare(x[property], y[property])) {
              return false;
            }
            break;
          default:
            if (x[property] !== y[property]) {
              return false;
            }
            break;
        }
      }

      return true;
    }

    return compare(a, b);
  }

});
define('ember-version-is', ['ember-version-is/index', 'ember', 'exports'], function(__index__, __Ember__, __exports__) {
  'use strict';
  var keys = Object.keys || __Ember__['default'].keys;
  var forEach = Array.prototype.forEach && function(array, cb) {
    array.forEach(cb);
  } || __Ember__['default'].EnumerableUtils.forEach;

  forEach(keys(__index__), (function(key) {
    __exports__[key] = __index__[key];
  }));
});

define('ember-version-is/index', ['exports', 'ember', 'ember-data'], function (exports, Ember, DS) {

  'use strict';

  /*global semver*/
  var is = function is(value, operation, version) {
    if (arguments.length === 2 || Ember['default'].isNone(version)) {
      Ember['default'].assert('range must be a valid semver range', semver.validRange(operation));
      return semver.satisfies(value, operation);
    }

    switch (operation) {
      case 'equalTo':
        return semver.eq(value, version);
      case 'greaterThan':
        return semver.gt(value, version);
      case 'greaterThanOrEqualTo':
        return semver.gte(value, version);
      case 'lessThan':
        return semver.lt(value, version);
      case 'lessThanOrEqualTo':
        return semver.lte(value, version);
      default:
        throw new Error("Ember Version Is: Please pass either 'equalTo', 'lessThan', 'lessThanOrEqualTo', 'greaterThan' or 'greatThanOrEqualTo' as the operation argument.");
    }
  };

  var emberVersionIs = function emberVersionIs(operation, value) {
    return is(Ember['default'].VERSION, operation, value);
  };

  var emberDataVersionIs = function emberDataVersionIs(operation, value) {
    return is(DS['default'].VERSION, operation, value);
  };

  exports['default'] = emberVersionIs;

  exports.is = is;
  exports.emberVersionIs = emberVersionIs;
  exports.emberDataVersionIs = emberDataVersionIs;

});//# sourceMappingURL=addons.map