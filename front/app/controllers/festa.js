import Ember from 'ember';

export default Ember.Controller.extend({
	electoralSections: [],
	towns: [],
	town: null,
	layerSelected: [],
	isExpandPanel: false,
	isExpandSearch: false,
	isShowMoreRenovation: false,
	groupLayer: null,
	hasLayers: false,
	lat: -34.637235,
	long: -58.775776,
	zoom: 12,
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
	},


	festaTotalPoints: Ember.computed('schools.@each.festaTotalPoints', function () {
		var t = 0;
		this.get('schools').forEach(function (school) {
			t += parseInt(school.get('festaTotalPoints'));
		});
		return t;
	}),

	westTotalPoints: Ember.computed('schools.@each.westTotalPoints', function () {
		var t = 0;
		this.get('schools').forEach(function (school) {
			t += parseInt(school.get('westTotalPoints'));
		});
		return t;
	}),	


	totalPoints: Ember.computed('westTotalPoints', function () {
		return parseInt(this.get('festaTotalPoints')) + parseInt(this.get('westTotalPoints'));		
	}),

	towChanged: function () {
		if (this.get('town')) {
			this.get('groupLayer').clearLayers();
			this.set('hasLayers', false);
			//this.set('layers', []);
			if (this.get('town').get('kml')) {
				var layer = omnivore.kml.parse(this.get('town').get('kml'));
				//this.get('layers').pushObject(layer);
				layer.setStyle({color: "#000000", opacity: 1});
									
				this.get('groupLayer').addLayer(layer);
				this.set('hasLayers', true);
				var _this = this;
				Ember.run.next(function () {
					_this.get('groupLayer._map').fitBounds(_this.get('groupLayer').getBounds());
				});	
				//this.get('groupLayer._map').setMaxBounds(this.get('groupLayer').getBounds(), {reset: true});
			}
		}
	}.observes('town.id'),

	schoolsChanged: function () {
    	var RedIcon = L.Icon.Default.extend({
            options: {
            	iconUrl: 'assets/images/school-marker-off.png',
            	shadowUrl: 'assets/images/map-marker-shadow.png'
            }
         });
         var redIcon = new RedIcon();	
    	 var GreenIcon = L.Icon.Default.extend({
            options: {
            	iconUrl: 'assets/images/school-marker-on.png',
            	shadowUrl: 'assets/images/map-marker-shadow.png'
            }
         });
         var greenIcon = new GreenIcon();	         	
		if (this.get('schools')) {
			this.get('schools').forEach(function (school) {
				if (parseFloat(school.get('lat'))) {
					var str = '';
					var icon = null;
					if (school.get('isFestaFriendly')) {
						str += 'Festa a la cabeza con ' + school.get('festaTotalPoints') + ' y West con ' + school.get('westTotalPoints');
						icon = greenIcon;
					} else {
						str += 'West a la cabeza con ' + school.get('westTotalPoints') + ' y Festa con ' + school.get('festaTotalPoints');
						icon = redIcon;
					}
					var marker = L.marker([parseFloat(school.get('lg')), parseFloat(school.get('lat'))], {icon: icon}).bindPopup('<h4>' + school.get('name') + '</h4><p>' + str + '</p>');
					this.get('groupLayer').addLayer(marker);	
				}
			}, this);
		}
	}.observes('schools.@each')

});
