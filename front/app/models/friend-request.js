import DS from 'ember-data';

export default DS.Model.extend({
  	user_request: DS.belongsTo('user', {async: true}),
  	request_to_user: DS.belongsTo('user', {async: true}),
  	status: DS.attr('string')
});
