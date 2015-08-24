import DS from 'ember-data';

export default DS.Model.extend({
  province: DS.belongsTo('province', {async: true}),
  town: DS.belongsTo('town', {async: true}),
  politicalParty: DS.belongsTo('political-party', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  level: DS.attr('string'),
  position: DS.attr('string'),
  startDate: DS.attr('string'),
  endDate: DS.attr('string')
});
