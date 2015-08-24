import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['avales'],
	currentLine: null,

	townsChanged: function  () {
		this.get('controllers.avales').set('towns', this.get('model.towns'));
	}.observes('towns'),	

	currentLineChanged: function () {
		this.get('controllers.avales').set('currentLine', this.get('currentLine'));
	}.observes('currentLine'),
});
