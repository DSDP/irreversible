import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
      return Ember.RSVP.hash({
          lines: this.get('store').find('electoral-line')
      });
	},

	setupController: function (controller, model) {
		this._super(controller, model);
	},	
});
