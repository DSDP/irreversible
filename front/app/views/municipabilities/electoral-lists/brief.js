import Ember from 'ember';

export default Ember.View.extend({
	politicalForceGraphicDataPie: [],

	candidatesGrouped: Ember.computed('model.candidates.@each.order' , function() {
		var groups = [];

		var ar = Ember.ArrayController.create({
		  model: this.get('model').get('candidates'),
		  sortProperties: ['order'],
		  sortAscending: true
		});

		ar.forEach(function (candidate) {
			if (candidate.get('charge').get('id')) {
				var group = groups.findProperty('id', candidate.get('charge').get('id'));
				if (!group) {
					group = {id: candidate.get('charge').get('id'), candidates: [], charge: this.get('controller.store').find('charge', candidate.get('charge').get('id'))};
					groups.pushObject(group);
				} 
				group.candidates.pushObject(candidate);
			}
		}, this);

		var ar2 = Ember.ArrayController.create({
		  model: groups,
		  sortProperties: ['id'],
		  sortAscending: true
		});
		
		return ar2;
	}),

	politicalForceDataChanged: function() {
		var groups = [];

		var ar = Ember.ArrayController.create({
		  model: this.get('model').get('candidates'),
		  sortProperties: ['charge'],
		  sortAscending: true
		});

		ar.forEach(function (candidate) {
			if (candidate.get('politicalSpace').get('id')) {
				var group = groups.findProperty('id', candidate.get('politicalSpace').get('id'));
				if (!group) {
					group = {id: candidate.get('politicalSpace').get('id'), candidates: [], politicalSpace: this.get('controller.store').find('political-space', candidate.get('politicalSpace').get('id'))};
					groups.pushObject(group);
				} 
				group.candidates.pushObject(candidate);
			}
		}, this);

		this.set('politicalForceData', groups);
	}.observes('model.candidates.@each.politicalSpace.name'),	

	politicalForceGraphicData: function() { 
		var _this = this;
		var promises = [];
		_this.get('politicalForceData').forEach(function (group) {
			promises.pushObject(_this.get('controller.store').find('political-space', group.id));
		});

		Promise.all(promises).then(function(values){
		 values.forEach(function (politicalSpace) {
		 	var group = _this.get('politicalForceData').findProperty('id', politicalSpace.get('id'));
		 	group.name = politicalSpace.get('name');
		 	group.color = politicalSpace.get('color');
		 });
		 var _data = [];
		 _this.get('politicalForceData').forEach(function (group) {
			_data.pushObject({
		        value: group.candidates.get('length'),
		        color: group.color,
		        highlight: "#FFC870",
		        label: group.name
			})			 	
		 });			 
		 _this.set('politicalForceGraphicDataPie', _data);
		});			
	}.observes('politicalForceData'),

	destinationId: function () {
		return 'destionation-' + this.get('model').get('id');
	}.property('model.id')
});