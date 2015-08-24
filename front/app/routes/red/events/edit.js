import Ember from 'ember';
import SaveModelMixin from '../../../mixins/groups/save-model-mixin';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, SaveModelMixin, {
});
