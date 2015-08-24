import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import SaveModelMixin from '../../../../mixins/roles/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, AuthenticatedRouteMixin, {
	actions: {
		save: function () {
			var route = this;	
			var school = this.get('currentModel');
			var promises = Ember.A();
			var promises_formulas = Ember.A();
			

			school.get('boards').forEach(function(item){
				promises.push(item.save());	    
			});

			Ember.RSVP.Promise.all(promises).then(function(resolvedPromises){
				school.save().then(function () {
			    	route.transitionTo('data-entry.festa.schools.index');
				});
			});	 			
		},
	}
});
