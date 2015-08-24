import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		approbe: function (fr) {
			fr.set('status', "1");
			fr.save().then(function (frs) {
				frs.destroyRecord();
			});
		},

		cancelRequest: function (fr) {
			if(confirm('Are you sure?')) {
				fr.destroyRecord();
			}
		}
	}
});
