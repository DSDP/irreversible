import Ember from 'ember';

export default Ember.View.extend({
	listsGrouped: Ember.computed('model.electoralLists.@each.province' , function() {
		var groups = [];

		var ar = Ember.ArrayController.create({
		  model: this.get('model').get('electoralLists'),
		  sortProperties: ['province'],
		  sortAscending: true
		});

		ar.forEach(function (electoralList) {
			if (electoralList.get('province').get('id')) {
				var group = groups.findProperty('id', electoralList.get('province').get('id'));
				if (!group) {
					group = {id: electoralList.get('province').get('id'), electoralLists: [], province: this.get('controller.store').find('province', electoralList.get('province').get('id'))};
					groups.pushObject(group);
				} 
				group.electoralLists.pushObject(electoralList);
			}
		}, this);

		return groups;
	}),

});
