`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ()->
  @route 'root', path: '/'
  @route 'article', path: 'article/:id'
  @route 'not_found', path: '/*path'
`export default Router`
