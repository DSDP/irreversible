import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  map: DS.attr('string'),
  province: DS.belongsTo('province', {async: true}),
  totalTowns: DS.attr('string'),


  shortName: function () {
    if (this.get('name')) {
      return this.get('name').replace('SECCIÓN ', '');
    } else {
      return "";
    }
  }.property('name'),

  kml: function () {
  	if (this.get('map')) {
  		return '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Placemark>' + this.get('map') + '</Placemark></kml>';
  	} else {
  		return null;
  	}
  }.property('map'),  
});
