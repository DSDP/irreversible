import Ember from 'ember';
import layout from '../templates/components/asset-preview';

export default Ember.Component.extend({
  layout: layout,
  isNew: false,
  actions: {
  	delete: function (fileId) {
  		this.sendAction('delete', fileId);
  	},
  }
});
