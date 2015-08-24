import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['municipabilities'],
	
	modelChanged: function () {
		if (this.get('model.town')) {
			this.get('controllers.municipabilities').set('title', this.get('model.town').get('name'));
			this.get('controllers.municipabilities').set('color', this.get('model.town').get('color'));
			this.get('controllers.municipabilities').set('gobernorName', this.get('model.town').get('gobernorName'));
			this.get('controllers.municipabilities').set('gobernorLastName', this.get('model.town').get('gobernorLastName'));
			this.get('controllers.municipabilities').set('politicalPartyName', this.get('model.town').get('politicalPartyName'));
		}
	}.observes('model.town'),

	renovationChanged: function  () {
		this.get('controllers.municipabilities').set('renovation', this.get('renovation'));
	}.observes('renovation'),

	styleBackground: function () {
		return "background-color: " + this.get('model.town.color') + ";";
	}.property('model.color'),
	
	provincesChanged: function  () {
		this.get('controllers.municipabilities').set('town', this.get('model.town'));
	}.observes('model.kml'),

});
