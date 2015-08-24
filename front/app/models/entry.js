import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.belongsTo('user', {async: true}),
  favoriters: DS.hasMany('user', {async: true, inverse: 'favorites'}),
  message: DS.attr('string'),
  createdAt: DS.attr('string'),
  updatedAt: DS.attr('string'),
  wall: DS.belongsTo('wall', {async: true}),
  files: DS.hasMany('asset', {async: true}),
  type: DS.attr('string'),
  
  proprerties: function () {
  	return {entry: this};
  }.property('type'),

  componentName: function () {
  	return 'entry-view-' + this.get('type');
  }.property('type'),
});
