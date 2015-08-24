import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    if (this.get('session.isAuthenticated')) {
      var eventsController = this.controllerFor('data-entry.municipabilities.electoral-events');
      eventsController.set('model', this.store.find('electoral-event', {sort: 'date'}));
      return eventsController;
    } else {
      return null;
    }
  },	
});
