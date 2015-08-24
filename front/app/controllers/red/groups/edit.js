import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		deleteMember: function (member) {
			this.get('model.members').removeObject(member);
		},
	}
});
