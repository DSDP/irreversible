import DS from 'ember-data';

export default DS.Model.extend({
  	lat: DS.attr('number'),
  	long: DS.attr('number'),
  	label: DS.attr('string'),
});
