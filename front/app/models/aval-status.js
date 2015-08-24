import DS from 'ember-data';

export default DS.Model.extend({
  line: DS.belongsTo('electoral-line', {async: true}),
  town: DS.belongsTo('town', {async: true}),

  politicalParty: DS.belongsTo('political-party', {async: true}),	
  electoralSection: DS.belongsTo('electoral-section', {async: true}),
  avalesNeed: DS.attr('number'),
  avalesEntry: DS.attr('number'),
  townName: DS.attr('string'),

  completed: Ember.computed('avalesNeed', 'avalesEntry', function() {
    return this.get('avalesEntry') >= this.get('avalesNeed');
  }),

  percent: Ember.computed('avalesNeed', 'avalesEntry', function () {
    return Math.ceil(this.get('avalesEntry') * 100 / this.get('avalesNeed'));
  }),

  remain: Ember.computed('avalesNeed', 'avalesEntry', function () {
    var minus = Math.ceil(this.get('avalesNeed') - this.get('avalesEntry'));
    return  minus > 0 ? minus : 0;
  }),

});


