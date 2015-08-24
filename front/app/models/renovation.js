import DS from 'ember-data';

export default DS.Model.extend({
  president: DS.belongsTo('functionary', {async: true}),
  vicepresident: DS.belongsTo('functionary', {async: true}),
  deputies: DS.hasMany('functionary', {async: true}),
  senators: DS.hasMany('functionary', {async: true}),
  governors: DS.hasMany('functionary', {async: true}),
  intendents: DS.hasMany('functionary', {async: true}),
  consejals: DS.hasMany('functionary', {async: true}),
});
