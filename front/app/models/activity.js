import DS from 'ember-data';

export default DS.Model.extend({
	line: DS.belongsTo('electoral-line', {async: true}),
});
