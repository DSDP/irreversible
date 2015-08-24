import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['municipabilities'],
	functionary: null,
	candidate: null,

	funcionaryHistoryChanged: function  () {
		if (this.get('functionaryHistory')) {
			var currentPosition = this.get('functionaryHistory').objectAt(0);
			if (currentPosition) {
				this.set('functionary', currentPosition);
			}
		}
	}.observes('functionaryHistory.@each'),

	functionaryChanged: function () {
		var _self = this;
		if (this.get('functionary')) {
			this.get('store').find('political-party', this.get('functionary.politicalParty.id') ).then(function (politicalParty) {
				_self.get('controllers.municipabilities').set('color', _self.get('functionary').get('politicalParty.color'));
				_self.get('controllers.municipabilities').set('politicalPartyName', _self.get('functionary').get('politicalParty.name'));
			});

			if (this.get('functionary.province.id')) {
				this.get('store').find('province', this.get('functionary.province.id') ).then(function (province) {
					_self.get('controllers.municipabilities').set('provinces', [province]);
				});
			} else {
				if (this.get('functionary.town.id')) {
					this.get('store').find('town', this.get('functionary.town.id') ).then(function (town) {
					_self.get('controllers.municipabilities').set('towns', [town]);
					});
				} else {
					_self.get('controllers.municipabilities').set('towns', []);
					_self.get('controllers.municipabilities').set('hasLayers', true);
				}
			}
		}
	}.observes('functionary'),


	functionaryHistoryList: function () {
		if (this.get('functionaryHistory')) {
			return  this.get('functionaryHistory').without(this.get('functionary'));
		} else {
			return [];
		}
	}.property('functionaryHistory.@each', 'functionary'),

	modelChanged: function () {
		if (this.get('model.name')) {
			this.get('controllers.municipabilities').set('title', this.get('model').get('fullNameProperty'));
		} else {
			this.get('controllers.municipabilities').set('title', this.get('model').get('fullName'));
		}
		this.set('functionary', null);
		this.set('candidate', null);
		this.get('controllers.municipabilities').set('color', '#FFF00CCC');
		this.get('controllers.municipabilities').set('gobernorName', '');
		this.get('controllers.municipabilities').set('gobernorLastName', '');
		this.get('controllers.municipabilities').set('politicalPartyName', '');
		this.get('controllers.municipabilities').set('renovation', null);
		this.get('controllers.municipabilities').set('hasLayers', false);
	}.observes('model'),
});
