import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	referent: DS.belongsTo('referent', {async: true}),
	festaPoints: DS.attr('string'),
	westPoints: DS.attr('string'),

	isFestaFriendly: Ember.computed('festaPoints', 'westPoints', function () {
		return parseInt(this.get('festaPoints')) > parseInt(this.get('westPoints'));
	}),	

	totalPoints: Ember.computed('festaPoints', 'westPoints', function () {
		return parseInt(this.get('festaPoints')) + parseInt(this.get('westPoints'));		
	})
	
});
