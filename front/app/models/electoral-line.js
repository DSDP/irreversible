import DS from 'ember-data';

export default DS.Model.extend({
	list: DS.belongsTo('electoral-list', {async: true}),
  	number: DS.attr('string'),
  	province: DS.belongsTo('province', {async: true}),
    electoralSection: DS.belongsTo('electoral-section', {async: true}),
	town: DS.belongsTo('town', {async: true}),
  	avalesNeed: DS.attr('number'),
  	avales: DS.hasMany('aval', {inverse: 'line', async: true}),
  	avalesEntry: DS.attr('number'),
  	avalStatuses: DS.hasMany('aval-status', {inverse: 'line', async: true}),

  	townsCompletedCount: Ember.computed('avalStatuses', function () {
  		var l = this.get('avalStatuses').filterProperty('completed', true);
  		return l.length;
  	})
});
