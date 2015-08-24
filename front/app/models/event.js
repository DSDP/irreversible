import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.belongsTo('user', {async: true}),
  name: DS.attr('string'),
  description: DS.attr('string'),
  wall: DS.attr('number'),
  members: DS.hasMany('user', { async: true}),
  location: DS.belongsTo('location', {async: true}),
  address: DS.attr('string'),
  date: DS.attr('string'),
  hours: DS.attr('string'),
  avatar: DS.belongsTo('asset', {async: true}),
});
