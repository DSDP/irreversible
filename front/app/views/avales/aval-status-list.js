import Ember from 'ember';

export default Ember.View.extend({
	model: null,
	filterText: '',
	groupList: [],

	groups: Ember.computed('model.avalStatuses', function () {
		var groupList = this.get('groupList');

		groupList.forEach(function (group) {
			if (group.get('statuses')) {
				group.set('statuses', []);
				group.set('completeds', 0);
				group.set('incompleteds', 0);
			}
		});

		this.get('model.avalStatuses').forEach(function (avalStatus) {
			var electoralSection = avalStatus.get('electoralSection');
			var g = groupList.findBy('id', electoralSection.get('id'));
			if (!g) {
				g = Ember.Object.create({id: avalStatus.get('electoralSection').get('id'), statuses: [], electoralSection: electoralSection, completeds: 0, incompleteds: 0});
				groupList.pushObject(g);
			}
			if (avalStatus.get('completed')) {
				g.set('completeds', g.get('completeds') + 1);
			} else {
				g.set('incompleteds', g.get('incompleteds') + 1)
			}
			g.get('statuses').pushObject(avalStatus);
		}, this);
		return groupList;
	}),

	statuses: Ember.computed('model.avalStatuses', 'filterText', function () {
		if (this.get('filterText')) {
			var regex = new RegExp(this.get('filterText').toLowerCase());
			var filtered = this.get('model.avalStatuses').filter(function(status) {
			  return regex.test(status.get('townName').toLowerCase());
			});		
			return filtered;
		} else {
			return [];
		}
	}),	

	actions: {
		clear: function () {
			this.set('filterText', '');
		},
	}	
});
