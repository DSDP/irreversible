import Ember from 'ember';

export default Ember.Controller.extend({
	layers: [],
	
	townsChanged: function  () {
		this.get('layers', []);
		this.get('towns').forEach(function (m) {
			if (m.get('kml')) {
				var layer = omnivore.kml.parse(m.get('kml'));
	         	layer.on("click", function (e) {
	                this.get('target.router').transitionTo('municipabilities.towns.show', m);
	            }, this);
	            if (m.get('color')) {
	            	layer.setStyle({fillColor: m.get('color'), opacity: 1});
	            }			            
				this.get('layers').pushObject(layer);
			}
		}, this);
	}.observes('towns.@each'),		
});
