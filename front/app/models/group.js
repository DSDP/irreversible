import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.belongsTo('user', {async: true}),
  name: DS.attr('string'),
  description: DS.attr('string'),
  wall: DS.attr('number'),
  members: DS.hasMany('user', { async: true}),
  avatar: DS.belongsTo('asset', {async: true}),
});
