`import Ember from 'ember'`

ArticleRoute = Ember.Route.extend

  model: (params) ->
    @store.find('article', params.id)

  setupController: (controller, model) ->
    controller.set 'article', model


`export default ArticleRoute`
