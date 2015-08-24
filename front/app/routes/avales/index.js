import Ember from 'ember';

export default Ember.Route.extend({
	
	model: function () {
      return Ember.RSVP.hash({
          lines: this.get('store').find('electoral-line'),
          towns: this.get('store').find('town', {province: 6}),
      });
	},

	setupController: function (controller, model) {
		this._super(controller, model);
		controller.get('controllers.avales').set('minZoomLevel', 4);
	},
});
