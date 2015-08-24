import Ember from 'ember';

export default Ember.ObjectController.extend({
	markers: [],

	actions: {
		addFavorite: function (entry) {
			this.get('session.user').then(function (user) {
				user.get('favorites').addObject(entry);
				user.save();
			})
		},
		removeFavorite: function (entry) {
			this.get('session.user').then(function (user) {
				user.get('favorites').removeObject(entry);
				user.save();
			})
		},		
	},

	marker: function () {
		if (this.get('model.location.lat')) {
			var m = L.marker([this.get('model.location.long'), this.get('model.location.lat')], {title: this.get('model.location.label')});
			this.get('markers').pushObject(m);
		}
	}.observes('model.location.lat'),
});
