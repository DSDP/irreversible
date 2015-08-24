import DS from 'ember-data';

export default DS.Model.extend({
	line: DS.belongsTo('electoral-line', {async: true, inverse: 'list'}),
  	name: DS.attr('string'),
  	description: DS.attr('string'),
  	province: DS.belongsTo('province', {async: true}),
    electoralSection: DS.belongsTo('electoral-section', {async: true}),
    electoralElection: DS.belongsTo('electoral-election', {async: true}),
	town: DS.belongsTo('town', {async: true}),
	politicalParty: DS.belongsTo('political-party', {async: true}),
	candidates: DS.hasMany('candidate', {async: true, inverse: 'list'}),
});
