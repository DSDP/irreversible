import Ember from 'ember';
import layout from '../templates/components/entry-view-image';

export default Ember.Component.extend({
  layout: layout,
  actions:  {
  	remove: function (model) {
  		this.sendAction('remove', model);
  	},
  	addFavorite: function (model) {
  		this.sendAction('addFavorite', model);
  	},
  	removeFavorite: function (model) {
  		this.sendAction('removeFavorite', model);
  	}
  }  
});
