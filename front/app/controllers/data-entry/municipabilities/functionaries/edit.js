import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		selectedPerson: function (person) {
			this.get('model').set('person', person);
		},

		deletePerson: function () {
			this.get('model').set('person', null);
		},

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

		selectedPoliticalParty: function (politicalParty) {
			this.get('model').set('politicalParty', politicalParty);
		},

		deletePoliticalParty: function () {
			this.get('model').set('politicalParty', null);
		},
	}
});
