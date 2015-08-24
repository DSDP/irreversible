import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "../../../../mixins/infinity-route";


export default Ember.Route.extend(InfinityRoute, AuthenticatedRouteMixin, {
  _listName: 'model',

  model: function() {
      return this.infinityModel("candidate", { perPage: 10, startingPage: 1});
  },
  actions: {
  	search: function () {
  		this.set('_listName', 'model.content');
  		var filter = { perPage: 10, startingPage: 1};
  		if (this.get('controller.person'))
  			filter.person = this.get('controller.person.id');
		if (this.get('controller.province'))
  			filter.province = this.get('controller.province.id');  		
		if (this.get('controller.town'))
  			filter.town = this.get('controller.town.id');  		
		if (this.get('controller.politicalParty'))
  			filter.politicalParty = this.get('controller.politicalParty.id');  
		if (this.get('controller.electoralElection'))
  			filter.electoralElection = this.get('controller.electoralElection.id');   

  		this.get('controller').set('model', this.infinityModel("candidate", filter))
  	},
  }  
});

