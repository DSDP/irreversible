import Ember from 'ember';
import { CanMixin } from 'ember-can';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "../../../mixins/infinity-route";

export default Ember.Route.extend(InfinityRoute, CanMixin, AuthenticatedRouteMixin, {
	_listName: 'entries.model.content',

	model: function (params) {
		return this.store.find('user', params.profile_id);
	},	

	setupController: function (controller, model) {
		this._super(controller, model);
		if (this.can('viewEntries user', model)) {
			var entriesController = this.controllerFor('red.entries');
			entriesController.set('model', this.infinityModel("entry", {perPage: 5, startingPage: 1, wall: model.get('wall'), sort: 'createdAt DESC'}));
			controller.set('entries', entriesController);
			var _self = this;
		    this.get('session.user').then(function (user) {
		      _self.controllerFor('application').set('canPublish', true);
		      _self.controllerFor('application').set('wall', model.get('wall'));
		      _self.controllerFor('application').set('entryControllerName', controller.get('entries'));
		      _self.controllerFor('application').set('currentPathEntryName', 'model.content');
		    });				
		}
	},	

	actions: {
		remove: function(model) {
	      if(confirm('Are you sure?')) {
	        model.destroyRecord();
	      }
	    },
	}
	
});
