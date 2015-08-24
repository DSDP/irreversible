import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['municipabilities'],

	modelChanged: function () {
		if (this.get('model.province')) {
			this.get('controllers.municipabilities').set('title', this.get('model.province').get('name'));
			this.get('controllers.municipabilities').set('color', this.get('model.province').get('color'));
			this.get('controllers.municipabilities').set('gobernorName', this.get('model.province').get('gobernorName'));
			this.get('controllers.municipabilities').set('gobernorLastName', this.get('model.province').get('gobernorLastName'));
			this.get('controllers.municipabilities').set('politicalPartyName', this.get('model.province').get('politicalPartyName'));
		}
	}.observes('model.province'),

	renovationChanged: function  () {
		this.get('controllers.municipabilities').set('renovation', this.get('renovation'));
	}.observes('renovation'),

	townsChanged: function  () {
		this.set('layers', []);
		this.get('controllers.municipabilities').set('towns', this.get('towns'));
	}.observes('towns'),
});
