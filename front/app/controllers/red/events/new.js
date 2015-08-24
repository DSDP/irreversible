import Ember from 'ember';

export default Ember.ObjectController.extend({

	hours: function () {
		var h =[];
		for (var i = 0; i < 24; i++) {
			if (i < 10) {
				h.push("0" + i + ":00");
				h.push("0" + i + ":30");
			}
			else {
				h.push(i + ":00");
				h.push(i + ":30");
			}

		}
		return h;
	}.property('model'),

	actions: {
		deleteMember: function (member) {
			this.get('model.members').removeObject(member);
		},

		locationChanged: function (location) {
			var model = this.get('model');
			var newLocation = this.get('store').createRecord('location', {lat: location.Y, long:location.X, label: location.Label});
			newLocation.save().then(function (loc) {
				model.set('location', loc);
			});
		},
	}
});
