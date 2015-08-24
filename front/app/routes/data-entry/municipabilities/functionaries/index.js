import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "../../../../mixins/infinity-route";


export default Ember.Route.extend(InfinityRoute, AuthenticatedRouteMixin, {
  _listName: 'model',

  model: function() {
      return this.infinityModel("functionary", { perPage: 10, startingPage: 1, sort: 'startDate DESC'});
  },

  actions: {
  	search: function () {
  		this.set('_listName', 'model.content');
  		var filter = { perPage: 10, startingPage: 1, sort: 'startDate DESC'};
  		if (this.get('controller.person'))
  			filter.person = this.get('controller.person.id');
		if (this.get('controller.province'))
  			filter.province = this.get('controller.province.id');  		
		if (this.get('controller.town'))
  			filter.town = this.get('controller.town.id');  		
		if (this.get('controller.politicalParty'))
  			filter.politicalParty = this.get('controller.politicalParty.id');   

  		this.get('controller').set('model', this.infinityModel("functionary", filter))
  	},
  }
});

