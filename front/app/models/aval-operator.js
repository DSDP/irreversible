import DS from 'ember-data';

export default DS.Model.extend({
	number: DS.attr('string'),
	description: DS.attr('string'),
	avales: DS.hasMany('aval', {inverse: 'operator', async: true}),
	status: DS.attr('string'),
	todayCharge: DS.attr('number'),
	totalCharge: DS.attr('number')
});
