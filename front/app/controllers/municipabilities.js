import Ember from 'ember';

export default Ember.ArrayController.extend({
	provinces: [],
	towns: [],
	town: null,
	layerSelected: [],
	isExpandPanel: false,
	isExpandSearch: false,
	isShowMoreRenovation: false,
	groupLayer: null,
	hasLayers: false,

	lat: -34.603723200000000000,
	long: -58.381593100000030000,
	zoom: 4,
	minZoomLevel: 3,

	init: function () {
		this._super();
		var fg = L.featureGroup();
		this.set('groupLayer', fg);
	},

	actions:{
		toggleExpand: function () {
			this.toggleProperty('isExpandPanel');
		},

		toggleExpandSearch: function () {
			this.toggleProperty('isExpandSearch');
		},

		toggleRenovation: function () {
			this.toggleProperty('isShowMoreRenovation');
		},		
	},

	styleBackground: function () {
		return "background-color: " + this.get('color') + ";";
	}.property('color'),	

	towChanged: function () {
		if (this.get('town')) {
			this.get('groupLayer').clearLayers();
			this.set('hasLayers', false);
			//this.set('layers', []);
			if (this.get('town').get('kml')) {
				var layer = omnivore.kml.parse(this.get('town').get('kml'));
				//this.get('layers').pushObject(layer);
				this.get('groupLayer').addLayer(layer);
				this.set('hasLayers', true);
				this.get('groupLayer._map').fitBounds(this.get('groupLayer').getBounds());
				//this.get('groupLayer._map').setMaxBounds(this.get('groupLayer').getBounds(), {reset: true});
			}
		}
	}.observes('town.id'),

	townsChanged: function  () {
		if (this.get('towns')) {
			this.set('hasLayers', false);
			this.get('groupLayer').clearLayers();
			this.get('towns').forEach(function (m) {
				if (m.get('kml')) {
					var layer = omnivore.kml.parse(m.get('kml'));
		         	layer.on("click", function (e) {
		                this.get('target.router').transitionTo('municipabilities.towns.show', m.get('id'));
		                this.get('groupLayer._map').fitBounds(layer.getBounds())
		            }, this);
		            if (m.get('color')) {
		            	layer.setStyle({fillColor: m.get('color'), opacity: 1});
		            }			            
					//this.get('layers').pushObject(layer);
					this.get('groupLayer').addLayer(layer);
				}
			}, this);
			if (this.get('groupLayer').getLayers().length > 0) {
				this.set('hasLayers', true);
				this.get('groupLayer._map').fitBounds(this.get('groupLayer').getBounds());
				//this.get('groupLayer._map').setMaxBounds(this.get('groupLayer').getBounds(), {reset: true});

			}
		}
		this.set('town', null);
		this.set('provinces', null);
	}.observes('towns.@each'),

	provincesChanged: function  () {

		if (this.get('provinces')) {
			this.get('groupLayer').clearLayers();
			this.set('hasLayers', false);
			this.get('provinces').forEach(function (m) {
				if (m.get('kml')) {
					var layer = omnivore.kml.parse(m.get('kml'));
					var popup;
		         	layer.on("click", function (e) {
		                this.get('target.router').transitionTo('municipabilities.provinces.show', m.get('id'));
		                this.get('groupLayer._map').fitBounds(layer.getBounds())
		            }, this);
			            
		            if (m.get('color')) {
		            	layer.setStyle({fillColor: m.get('color'), opacity: 1});
		            }
					//this.get('layers').pushObject(layer);
					this.get('groupLayer').addLayer(layer);
				}
			}, this);
			this.set('hasLayers', true);
			this.get('groupLayer._map').fitBounds(this.get('groupLayer').getBounds());
			//this.get('groupLayer._map').setMaxBounds(this.get('groupLayer').getBounds(), {reset: true});


			//this.set('groupLayer._map.center', this.get('groupLayer').getBounds().getCenter());
		}
		this.set('town', null);
		this.set('towns', null);
	}.observes('provinces'),
});
