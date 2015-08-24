import DS from 'ember-data';

export default DS.Model.extend({
  electoralSeccion: DS.belongsTo('electoral-section', {async: true}),
  province: DS.belongsTo('province', {async: true}),
  town: DS.belongsTo('town', {async: true}),
  politicalParty: DS.belongsTo('political-party', {async: true}),
  politicalSpace: DS.belongsTo('political-space', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  charge: DS.belongsTo('charge', {async: true}),
  comment: DS.attr('string'),
  list: DS.belongsTo('electoral-list', {async: true}),
  order: DS.attr('number')
});
