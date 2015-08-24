import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['avales'],

	townsChanged: function  () {
		this.set('layers', []);
		this.get('controllers.avales').set('towns', this.get('towns'));
	}.observes('towns'),
});
