import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		selectedProvince: function (province) {
			this.get('model').set('province', province);
		},

		deleteProvince: function () {
			this.get('model').set('province', null);
		},

		selectedTown: function (town) {
			this.get('model').set('town', town);
		},

		deleteTown: function () {
			this.get('model').set('town', null);
		},					
	}	
});
