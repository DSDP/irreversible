import Ember from 'ember';

export default Ember.View.extend({
	filterText: '',
	model: null,

	noCompleteds: Ember.computed('model.electoralSection.townsCount', 'model.completeds', 'model.incompleteds', function () {
		return "";
	}),	

	data: Ember.computed('noStarted', function () {
		return [{
	        value: this.get('model.completeds'),
	        color: "rgba(0, 180, 225, 1)",
	        highlight: "#FFC870",
	        label: "Completos"
		},
		{
	        value: this.get('model.incompleteds'),
	        color: "rgba(0, 180, 225, 0.5)",
	        highlight: "rgba(0, 180, 225, 0.1)",
	        label: "Incompletos"
		}];
	}),
});
