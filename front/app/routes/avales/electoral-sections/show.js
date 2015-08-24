import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('electoral-section', params.section_id);
	},

	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('towns', this.get('store').find('town', {electoralSection: model.get('id')}));
	},

});
