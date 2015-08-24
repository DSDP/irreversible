import Ember from 'ember';
import layout from '../templates/components/asset-preview-audio';

export default Ember.Component.extend({
  	layout: layout,
  	play: false,
	click: function() {
		if (!this.get('isNew'))
			this.toggleProperty(this.get('play'));
		else
			this.sendAction('delete', this.get('id'));
	}    
});
