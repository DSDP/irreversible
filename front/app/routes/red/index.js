import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "../../mixins/infinity-route";

export default Ember.Route.extend(AuthenticatedRouteMixin, InfinityRoute,{
  _listName: 'model',

  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    },
    addFavorite: function (entry) {
      this.get('session.user').then(function (user) {
        user.get('favorites').addObject(entry);
        user.save();
      })
    },
    removeFavorite: function (entry) {
      this.get('session.user').then(function (user) {
        user.get('favorites').removeObject(entry);
        user.save();
      })
    },
    createNewEntry: function (entry) {
      var controller = this.get('controller');
      controller.get('model').pushObject(entry);
    },    
  },

  model: function() {
    if (this.get('session.isAuthenticated')) {
      return this.infinityModel("entry", { perPage: 5, startingPage: 1, sort: 'createdAt DESC'});
    } else {
      return null;
    }
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    var _self = this;

    this.get('session.user').then(function (user) {
      _self.controllerFor('application').set('canPublish', true);
      _self.controllerFor('application').set('wall', user.get('wall'));
      _self.controllerFor('application').set('entryControllerName', model);
      _self.controllerFor('application').set('currentPathEntryName', null);
    });
  }

});
