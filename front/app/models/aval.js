import DS from 'ember-data';

export default DS.Model.extend({
	line: DS.belongsTo('electoral-line', {async: true}),
	operator: DS.belongsTo('aval-operator', {async: true}),
	operatorNumber: DS.attr('string'),
	lineNumber: DS.attr('string'),
	ip: DS.attr('string'),
	dni: DS.attr('string'),
	fullName: DS.attr('string'),
	sex: DS.attr('string')
});
