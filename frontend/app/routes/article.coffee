`import Ember from 'ember'`
`import ResetScrollMixin from '../mixins/reset-scroll'`

ArticleRoute = Ember.Route.extend ResetScrollMixin,

  model: (params) ->
    @store.find('article', params.id)

  setupController: (controller, model) ->
    controller.set 'article', model


`export default ArticleRoute`
