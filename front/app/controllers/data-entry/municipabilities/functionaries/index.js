import Ember from 'ember';

export default Ember.ArrayController.extend({
	person: null,
	electoralElection: null,
	province: null,
	town: null,
	politicalParty: null,
	
	actions: {
		selectedPerson: function (person) {
			this.set('person', person);
		},

		deletePerson: function () {
			this.set('person', null);
		},

		selectedProvince: function (province) {
			this.set('province', province);
		},

		deleteProvince: function () {
			this.set('province', null);
		},

		selectedTown: function (town) {
			this.set('town', town);
		},

		deleteTown: function () {
			this.set('town', null);
		},

		selectedPoliticalParty: function (politicalParty) {
			this.set('politicalParty', politicalParty);
		},

		deletePoliticalParty: function () {
			this.set('politicalParty', null);
		},
		selectedElectoralElection: function (electoralElection) {
			this.set('electoralElection', electoralElection);
		},

		deleteElectoralElection: function () {
			this.set('electoralElection', null);
		},			
	}
});
