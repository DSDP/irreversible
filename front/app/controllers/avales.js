import Ember from 'ember';

export default Ember.ArrayController.extend({
	electoralSections: [],
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

	layerMap: [],

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

	currentLineChanged: function () {
		this.get('layerMap').forEach(function (tem) {
			tem.layer.setStyle({fillColor: "#ddd", opacity: 0.2, fillOpacity: 0.2});
		});	
		if (this.get('currentLine')) {
			this.get('currentLine.avalStatuses').forEach(function (avalStatus) {
				var _this = this;
				this.get('store').find('aval-status', avalStatus.id).then(function (status) {
					status.get('town').then(function (t) {
						if (t) {

							if (_this.get('layerMap').findBy('id', t.id)) {
								var townObject = _this.get('layerMap').findBy('id', t.id);
								var layer = _this.get('layerMap').findBy('id', t.id).layer;
								var opacity = status.get('percent') *  5  / 100;
								opacity = Math.min(opacity, 5.5);
								opacity += 3;
								opacity = opacity / 10;
								if (layer) {
									var stringData = '';

									if (status.get('completed')) {
										stringData = '<p class="completed">Carga completa</p>';
										layer.setStyle({fillColor: "#00b4e1", opacity: opacity, fillOpacity: opacity});
									}
									else {
										stringData = '<p>Cargados<span>' + status.get('avalesEntry') + '</span></p><p>Necesarios<span>' + status.get('avalesNeed') + ' </span></p>';
										layer.setStyle({fillColor: "#00b4e1", opacity: opacity, fillOpacity: opacity});
									}
									
									layer.bindPopup('<h4>' + townObject.name + '</h4>' + stringData);

									layer.on('mouseover', function(e) {
									    layer.openPopup(e.latlng);
									});									
								}
							}
						}
					});
				})
			}, this);
		}
	}.observes('currentLine.avalStatuses.@each', 'layerMap'),

	townsChanged: function  () {
		if (this.get('towns')) {
			this.set('hasLayers', false);
			this.get('groupLayer').clearLayers();
			this.set('layerMap', []);
			this.get('towns').forEach(function (m) {
				if (m.get('kml')) {
					var layer = omnivore.kml.parse(m.get('kml'));
		         	/*
		         	layer.on("click", function (e) {
		                this.get('target.router').transitionTo('avales.towns.show', m);
		                this.get('groupLayer._map').fitBounds(layer.getBounds())
		            }, this);
		            if (m.get('color')) {
		            	layer.setStyle({fillColor: m.get('color'), opacity: 1});
		            }*/
		            this.get('layerMap').pushObject({
		            	id: m.get('id'),
		            	layer: layer,
		            	name: m.get('name')
		            });
					//this.get('layers').pushObject(layer);
					this.get('groupLayer').addLayer(layer);
				}
			}, this);
			if (this.get('groupLayer').getLayers().length > 0) {
				this.set('hasLayers', true);
				this.get('groupLayer._map').fitBounds(this.get('groupLayer').getBounds());
			}
		}
		this.set('town', null);
		this.set('electoralSections', null);
	}.observes('towns.@each'),

	electoralSectionChanged: function  () {

		if (this.get('electoralSections')) {
			this.get('groupLayer').clearLayers();
			this.set('hasLayers', false);
			this.get('electoralSections').forEach(function (m) {
				if (m.get('kml')) {
					var layer = omnivore.kml.parse(m.get('kml'));
		         	layer.on("click", function (e) {
		                this.get('target.router').transitionTo('avales.electoral-sections.show', m);
		                this.get('groupLayer._map').fitBounds(layer.getBounds())
		            }, this);
					this.get('groupLayer').addLayer(layer);
				}
			}, this);
			this.set('hasLayers', true);
			this.get('groupLayer._map').fitBounds(this.get('groupLayer').getBounds());

		}
		this.set('town', null);
		this.set('towns', null);
	}.observes('electoralSections'),
});
