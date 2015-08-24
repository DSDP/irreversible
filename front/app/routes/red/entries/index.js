import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    },
  },
  model: function() {
    var entriesController = this.controllerFor('entries');
    entriesController.set('model', this.store.find('entry', {sort: 'createdAt DESC'}));    
    return entriesController;
  },
});
