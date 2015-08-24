import Ember from 'ember';
import layout from '../templates/components/asset-preview-video';

export default Ember.Component.extend({
  	layout: layout,
  	play: false,
  	isNew: false,
	click: function() {
		if (!this.get('isNew'))
			this.toggleProperty(this.get('play'));
		else
			this.sendAction('delete', this.get('id'));
	}   
});
