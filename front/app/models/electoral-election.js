import DS from 'ember-data';

export default DS.Model.extend({
  	name: DS.attr('string'),
  	date: DS.attr('string'),
  	enrolled: DS.attr('number'),
  	voters: DS.attr('number'),
  	votersValid: DS.attr('number'),
  	votersNull: DS.attr('number'),
  	votersBlank: DS.attr('number'),
  	province: DS.belongsTo('province', {async: true}),
    electoralSection: DS.belongsTo('electoral-section', {async: true}),
	  town: DS.belongsTo('town', {async: true}),
    electoralLists: DS.hasMany('electoral-list', {async: true}),
    national: DS.attr('boolean', {defaultValue: false}),
});
