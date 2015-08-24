import Ember from 'ember';
import layout from '../templates/components/add-user';

export default Ember.Component.extend({
  layout: layout,
  query: '',
  queryContent: null,
  list: null,

  queryChanged: function () {
  	if (this.get('query').length >= 3)
  		this.set('queryContent', this.get('store').find('user', {query: this.get('query')}));
  	else
  		this.set('queryContent', []);
  }.observes('query'),


  actions: {
  	add: function (user) {
  		if (this.get('list')) {
  			this.get('list').pushObject(user);
  		}
  		this.set('queryContent', []);
  	}
  }

});
