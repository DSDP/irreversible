import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  date: DS.attr('string'),
  province: DS.belongsTo('province', {async: true}),
  town: DS.belongsTo('town', {async: true})  
});
