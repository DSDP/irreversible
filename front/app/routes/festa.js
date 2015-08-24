import Ember from 'ember';

export default Ember.Route.extend({
	model: function (argument) {
      return Ember.RSVP.hash({
          town: this.get('store').find('town', 6079),
          schools: this.get('store').find('school', {town: 6079})
      });
	},

	setupController: function (controller, model) {
		controller.set('town', model.town);
		controller.set('schools', model.schools);
	},
}); 
