`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`
`import ResetScrollMixin from '../mixins/reset-scroll'`

RootRoute = Ember.Route.extend InfinityRoute, ResetScrollMixin,

  queryParams:
    category:
      refreshModel: true

  model: (params) ->
    @infinityModel("article", { perPage: 10, startingPage: 1, category: params["category"]})

  setupController: (controller, model) ->
    controller.set 'model', model

`export default RootRoute`
