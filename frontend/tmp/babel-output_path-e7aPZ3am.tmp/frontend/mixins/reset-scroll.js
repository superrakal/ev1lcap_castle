import Ember from 'ember';
var ResetScrollMixin;

ResetScrollMixin = Ember.Mixin.create({
  activate: function activate() {
    this._super();
    return window.scrollTo(0, 0);
  }
});

export default ResetScrollMixin;