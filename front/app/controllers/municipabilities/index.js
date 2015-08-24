import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['municipabilities'],

	modelChanged: function () {
		this.get('controllers.municipabilities').set('title', 'Argentina');
		this.get('controllers.municipabilities').set('color', '#fffcc00');
		this.get('controllers.municipabilities').set('gobernorName', 'CRISTINA');
		this.get('controllers.municipabilities').set('gobernorLastName', 'FERNANDEZ DE KIRCHNER');
		this.get('controllers.municipabilities').set('politicalPartyName', 'Frente para la victoria - FPV');
	}.observes('model'),

	renovationChanged: function  () {
		this.get('controllers.municipabilities').set('renovation', this.get('renovation'));
	}.observes('renovation'),

	provincesChanged: function  () {
		this.get('controllers.municipabilities').set('provinces', this.get('provinces'));
	}.observes('provinces'),
});
