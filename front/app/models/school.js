import DS from 'ember-data';

export default DS.Model.extend({
	town: DS.belongsTo('town', {async: true}),
	name: DS.attr('string'),
	referent: DS.belongsTo('referent', {async: true}),
	boards: DS.hasMany('board'),
	lat: DS.attr('string'),
	lg: DS.attr('string'),

	festaTotalPoints: Ember.computed('boards.@each.festaPoints', function () {
		var t = 0;
		this.get('boards').forEach(function (board) {
			t += parseInt(board.get('festaPoints'));
		});
		return t;
	}),

	westTotalPoints: Ember.computed('boards.@each.westPoints', function () {
		var t = 0;
		this.get('boards').forEach(function (board) {
			t += parseInt(board.get('westPoints'));
		});
		return t;
	}),

	isFestaFriendly: Ember.computed('boards.@each.festaPoints', function () {
		return this.get('boards').filterBy('isFestaFriendly', true).length > this.get('boards').filterBy('isFestaFriendly', false).length;
	}),

	totalPoints: Ember.computed('westTotalPoints', function () {
		return parseInt(this.get('festaTotalPoints')) + parseInt(this.get('westTotalPoints'));		
	}),
	
});
