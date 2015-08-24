import DS from 'ember-data';
import Attachable from '../mixins/attachable';

export default DS.Model.extend(Attachable, {
  	name: DS.attr('string'),
  	lastName: DS.attr('string'),
    password: DS.attr('string'),
  	createdAt: DS.attr('string'),
  	updatedAt: DS.attr('string'),
  	email: DS.attr('string'),
  	roles: DS.hasMany('role', {async: true}),
    wall: DS.attr('number'),
    groups: DS.hasMany('group', { async: true, inverse: 'members'}),
    events: DS.hasMany('events', { async: true, inverse: 'members'}),
    friends: DS.hasMany('user', { async: true }),
    avatar: DS.belongsTo('asset', {async: true}),
    files: DS.hasMany('asset', {async: true, inverse: 'owner'}),
    favorites: DS.hasMany('entry', {async: true, inverse: 'favoriters'}),
    requestFriendsSend: DS.hasMany('friend-request', {async: true, inverse: 'user_request'}),
    requestFriendsRecibe: DS.hasMany('friend-request', {async: true, inverse: 'request_to_user'}),

  	fullName: function () {
  		return this.get('name') + " " + this.get('lastName');
  	}.property('name', 'lastName'),

    isAdmin: function () {
      return this.get('roles').findBy('name', 'admin') !== undefined;
    }.property('roles.@each.name'),  	

    canViewCalendar: function () {
      return this.get('roles').findBy('name', 'calendar') !== undefined;
    }.property('roles.@each.name'),

    canViewMunicipabilities: function () {
      return this.get('roles').findBy('name', 'municipability') !== undefined;
  	}.property('roles.@each.name'),

    canViewDataEntry: function () {
      return this.get('roles').findBy('name', 'data-entry') !== undefined;
    }.property('roles.@each.name'),
    
    canViewAvales: function () {
      return this.get('roles').findBy('name', 'aval-coordinator') !== undefined;
    }.property('roles.@each.name'),        

    canViewRed: function () {
      return this.get('roles').findBy('name', 'red') !== undefined;
    }.property('roles.@each.name'),    
});
