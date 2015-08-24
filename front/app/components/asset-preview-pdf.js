import Ember from 'ember';
import layout from '../templates/components/asset-preview-pdf';

export default Ember.Component.extend({
  layout: layout,
	click: function() {
		if (this.get('isNew'))
			this.sendAction('delete', this.get('id'));
	}   
  
});
