import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
      return Ember.RSVP.hash({
          renovation: this.get('store').find('renovation', 'nationals'),
          provinces: this.get('store').find('province'),
          elections: this.get('store').find('electoral-election', {sort: 'date DESC', national: 1}),
      });
	},

	setupController: function (controller, model) {
		this._super(controller, model);
		var _this = this;

		model.elections.forEach(function (electoraElection) {
			electoraElection.set('electoralList', _this.get('store').find('electoral-list', {electoralElection: electoraElection.get('id')}))
		});
		controller.get('controllers.municipabilities').set('minZoomLevel', 4);
	},

	actions: {
		reorderItems: function (items) {
			items.forEach(function (item, index) {
				item.set('order', index + 1);
				item.save();
			})
		},
	}	
});
