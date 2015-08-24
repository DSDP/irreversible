import { Ability } from 'ember-can';

export default Ability.extend({
  canDelete: function() {
    if (!this.get('session.user_id')){
      return false;    
    } else {
      return this.get('session.user_id').toString() === this.get('model').get('owner').get('id');
    }
  }.property('session.user_id', 'model.owner'),

  canEdit: function() {
    if (!this.get('session.user_id')) {
      return false;    
    }
    return this.get('session.user_id').toString() === this.get('model').get('owner').get('id');
  }.property('session.user_id', 'model.owner'),

  canViewEntries: function () {
    if (!this.get('session.user_id')) {
      return false;    
    } else {
      if (this.get('session.user_id') && this.get('session.user_id').toString() === this.get('model.id')){
        return true;
      } else {
        var user = this.get('model').get('members').findBy('id', this.get('session.user_id').toString());
        return user !== undefined;
      }
    }
  }.property('session.user_id', 'model.members.@each'),

  canAddMember: function () {
    if (!this.get('session.user_id')) {
      return false;    
    } else {
      return this.get('session.user_id').toString() === this.get('model').get('owner').get('id');
    }
  }.property('session.user_id', 'model.owner'),
});