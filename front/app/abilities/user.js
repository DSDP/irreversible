import { Ability } from 'ember-can';

export default Ability.extend({
  canAdmin: function() {
    if (!this.get('session.user_id')) {
  		return false;  	
    } else {
      return this.get('session.user.isAdmin');
    }
  }.property('session.user.isAdmin', 'session.user'),

  canViewEntries: function () {
  	if (!this.get('session.user_id')) {
  		return false;  	
    } else {
    	if (this.get('session.user_id') && this.get('session.user_id').toString() === this.get('model.id')) {
    		return true;
      } else {
        var user = this.get('model').get('friends').findBy('id', this.get('session.user_id').toString());
        return user !== undefined;
      }
    }
  }.property('session.user_id', 'model.friends.@each'),  

  canFriendRequest: function () {
    if (!this.get('session.user_id')) {
      return false;   
    } else {
      if (this.get('session.user')) {
        var _self = this;
        var result = true;
        this.get('session.user.requestFriendsSend').forEach(function (rf) {
          if (_self.get('model.id') == rf.get('request_to_user.id'))  {
            result = false;
          }
        });
        this.get('session.user.requestFriendsRecibe').forEach(function (rf) {
          if (_self.get('model.id') == rf.get('user_request.id'))  {
            result = false;
          }
        });
        return result;
      } else {
        return false;
      }
    }
  }.property('session.user_id', 'session.user', 'session.user.requestFriendsSend.@each'), 
});