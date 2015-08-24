import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "../../../mixins/infinity-route";

export default Ember.Route.extend(AuthenticatedRouteMixin, InfinityRoute, {
	model: function (params) {
      return Ember.RSVP.hash({
      	  town: this.store.find('town', params.town_id),
          renovation: this.get('store').find('renovation', 'town-' + params.town_id ),
          nationalElections: this.get('store').find('electoral-election', {sort: 'date DESC', national: 1})
      });
	},

	setupController: function (controller, model) {
		this._super(controller, model);
		var _this = this;

		model.nationalElections.forEach(function (electoraElection) {
			electoraElection.set('electoralList', []);
			electoraElection.set('electoralList', _this.get('store').find('electoral-list', {electoralElection: electoraElection.get('id'), town: model.town.get('id')}));
		});

		controller.modelChanged();
		controller.renovationChanged();

		controller.get('controllers.municipabilities').set('isExpandSearch', false);
		controller.get('controllers.municipabilities').set('minZoomLevel', 4);	
	},


	actions: {
		reorderItems: function (items) {
			items.forEach(function (item, index) {
				item.set('order', index + 1);
				item.save();
			})
		},
	}		
});
