import Ember from 'ember';
import layout from '../templates/components/municipabilities-search';
import config from '../config/environment';

export default Ember.Component.extend({
  layout: layout,
  results: [],
  query: '',
  loading: false,


  queryChanged: function () {
  	if (this.get('query').length >= 3) {
  		var _self = this;
  		_self.set('loading', true);
		jQuery.getJSON(config.adapter.host + '/municipabilities/search?query=' + this.get('query'), function(json) {
			_self.set('results', json);
			_self.set('loading', false);
		});  		
  	}
  	else
  		this.set('results', []);
  }.observes('query'),  

  noResults: function () {
  	if (this.get('query').length >= 3) {
  		if (!this.get('loading'))
  			if (!this.get('results').length)
  				return true;
  	} 
  	return false;
  }.property('query', 'results', 'loading'),

  actions: {
  	clear: function ( ) {
		this.set('results', []);
		this.set('query', '');
		this.set('loading', false);  		
  	},
  }
});
