import DS from 'ember-data';

export default DS.Model.extend({
  	user: DS.belongsTo('user', { async: true }),
  	group: DS.belongsTo('group', { async: true }),
  	event: DS.belongsTo('group', { async: true }),
});
