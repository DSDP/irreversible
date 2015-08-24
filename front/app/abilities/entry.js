import { Ability } from 'ember-can';

export default Ability.extend({
  canDelete: function() {
  	if (!this.get('session.user_id')) {
  		return false;
    } else {
      return this.get('session.user_id').toString() === this.get('model').get('owner').get('id');
    }
  }.property('session.user_id', 'model.owner'),

  canEdit: function() {
  	if (!this.get('session.user_id')) {
  		return false;  	
    } else {
      return this.get('session.user_id').toString() === this.get('model').get('owner').get('id');
    }
  }.property('session.user_id', 'model.owner'),

  canFavorite: function () {
    if (!this.get('session.user_id')) {
      return false;   
    } else {
      if (this.get('session.user.favorites')) {
        var _self = this;
        var result = true;
        this.get('session.user.favorites').forEach(function (favorite) {
          if (_self.get('model.id') == favorite.get('id'))  {
            result = false;
          }
        });
        return result;
      } else {
        return true;
      }
    }
  }.property('session.user.favorites.@each'),
});