import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		deleteFriend: function (friend) {
			this.get('model.friends').removeObject(friend);
		},

	}
});
