import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "../../../mixins/infinity-route";

export default Ember.Route.extend(AuthenticatedRouteMixin, InfinityRoute, {
	setupController: function (controller, model) {
		this._super(controller, model);
		controller.get('controllers.avales').set('isExpandSearch', false);
		controller.get('controllers.avales').set('minZoomLevel', 4);
	},	
});
