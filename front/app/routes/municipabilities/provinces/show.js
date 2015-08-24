import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "../../../mixins/infinity-route";

export default Ember.Route.extend(InfinityRoute, AuthenticatedRouteMixin, {

	model: function (params) {
      return Ember.RSVP.hash({
      	  province: this.store.find('province', params.province_id),
          renovation: this.get('store').find('renovation', 'province-' + params.province_id ),
          towns: this.get('store').find('town', {province: params.province_id}),
          nationalElections: this.get('store').find('electoral-election', {sort: 'date DESC', national: 1}),
          elections: this.get('store').find('electoral-election', {sort: 'date DESC', province: params.province_id})
      });
	},

	setupController: function (controller, model) {
		this._super(controller, model);
		var _this = this;

		model.nationalElections.forEach(function (electoraElection) {
			electoraElection.set('electoralList', []);
			electoraElection.set('electoralList', _this.get('store').find('electoral-list', {electoralElection: electoraElection.get('id'), province: model.province.get('id')}));
		});

		model.elections.forEach(function (electoraElection) {
			electoraElection.set('electoralList', []);
			electoraElection.set('electoralList', _this.get('store').find('electoral-list', {electoralElection: electoraElection.get('id'), province: model.province.get('id')}));
		});

		controller.modelChanged();
		controller.renovationChanged();
		controller.townsChanged();

		controller.get('controllers.municipabilities').set('isExpandSearch', false);
		controller.get('controllers.municipabilities').set('minZoomLevel', 4);	
	},
});
