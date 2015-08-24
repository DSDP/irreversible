import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['avales'],
	
	provincesChanged: function  () {
		this.get('controllers.avales').set('town', this.get('model'));
	}.observes('model.kml'),

});
