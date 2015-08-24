import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		friendRequest: function () {
			var fr = this.get('store').createRecord('friend-request', {user_request: this.get('session.user'), request_to_user: this.get('model'), status: "0"});
			fr.save();
			//var fr = 
		},
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
	}	
});
