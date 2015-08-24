import Ember from 'ember';
import SaveModelMixin from '../../../../mixins/events/save-model-mixin';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, SaveModelMixin, {
  model: function() {
    return this.store.createRecord('electoral-event');
  }
});
