import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "../../../mixins/infinity-route";

export default Ember.Route.extend(InfinityRoute, AuthenticatedRouteMixin, {
	model: function(params) {
		return this.store.find('person', params.person_id);
	},

	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('functionaryHistory', this.get('store').find('functionary', { person: model.get('id'), sort:'endDate DESC'}));
		controller.set('candidateHistory', this.get('store').find('candidate', { person: model.get('id')}));
		controller.get('controllers.municipabilities').set('renovation', null);
		controller.get('controllers.municipabilities').set('isExpandSearch', false);
	},
});
