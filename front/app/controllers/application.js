import Ember from 'ember';

export default Ember.Controller.extend({
	wall: null,
	canPublish: false,
	entryControllerName: null,
	isShowMenu: false,
	isShowPublish: false,
	isHiddenPublish: true,
	isShowClick: false,
	isShowApps: false,
	isRed: false,
	isData: false,
	isCalendar: false,
	isDataEntry: false,
	isAvales: false,
	isBalancer: false,
	newEntry: null,
	files: [],
	saved: false,
	showNovedades: false,

	init: function () {
		this._super();
		this.subscribe();
	},

	publishChanged: function () {

		if (this.get('isShowPublish')) {
			
		} else {
		    if (this.get('files') && this.get('saved')) {
		     	this.get('files').forEach(function (file) {
		        	file.destroyRecord();
		      	});
		    }    
		}
	}.observes('isShowPublish'),

	getCurrentURL: function () {
		this.set('wall', null);
		this.set('entryControllerName', null);
		this.set('canPublish', false);
		this.set('isRed', false);
		this.set('isCalendar', false);
		this.set('isData', false);		
		this.set('isAdmin', false);
		this.set('isDataEntry', false);
		this.set('isAvales', false);
		this.set('isBalancer', false);
		this.set('isHome', false);

		if (RegExp('index').test(this.get('currentPath')) || RegExp('festa').test(this.get('currentPath'))) {
			this.set('isHome', true);
		}
		
		if (RegExp('red').test(this.get('currentPath'))) {
			this.set('isRed', true);
			this.set('isHome', false);
		}
		if (RegExp('red.index').test(this.get('currentPath'))) {
			this.set('showNovedades', true);
			this.set('isHome', false);
		}
		if (RegExp('calendar').test(this.get('currentPath'))) {
			this.set('isCalendar', true);
			this.set('isHome', false);
		}
		if (RegExp('municipabilities').test(this.get('currentPath')) && !RegExp('data-entry').test(this.get('currentPath'))) {
			this.set('isData', true);
			this.set('isHome', false);
		}
		if (RegExp('avales').test(this.get('currentPath')) && !RegExp('data-entry').test(this.get('currentPath'))) {
			this.set('isAvales', true);
			this.set('isHome', false);
		}
		if (RegExp('balancer').test(this.get('currentPath'))) {
			this.set('isBalancer', true);
			this.set('isHome', false);
		}
		if (RegExp('admin').test(this.get('currentPath'))) {
			this.set('isAdmin', true);
			this.set('isHome', false);
		}		
		if (RegExp('data-entry').test(this.get('currentPath'))) {
			this.set('isDataEntry', true);
			this.set('isHome', false);
		}		

	}.observes('currentPath'),
	
	addEntry: function (entry) {
  		if (this.get('entryControllerName')) {
  			if (this.get('currentPathEntryName')) {
				this.get('entryControllerName').get(this.get('currentPathEntryName')).pushObject(entry);
  			} else {
  				this.get('entryControllerName').pushObject(entry);
  			}
  		}
	},

	subscribe: function () {
		var store = this.store;
		var _self = this;
		if (this.get('session.user_id')) {
			this.get('session.user').then(function (user) {
				_self.sailsSocket.request('get', '/socket/subscribe', {user: _self.get('session.user_id')}).then(function(response) { console.log(response); }, function(reason) {
					console.log(reason);
				});				
				_self.sailsSocket.request('get', '/socket/subscribePoliticalData', {user: _self.get('session.user_id')}).then(function(response) { console.log(response); }, function(reason) {
					console.log(reason);
				});
				
				_self.sailsSocket.listenFor('wall');
				_self.sailsSocket.listenFor('user');
				_self.sailsSocket.listenFor('candidate');
				_self.sailsSocket.listenFor('aval');
				_self.sailsSocket.listenFor('activity');

				_self.sailsSocket.on('activity.created', function newMessageFromSails ( message ) { 
					Ember.run.next(this, function () {
						if (message.verb === 'created') {
							if (message.id) {
								store.find('electoral-line', message.data.line).then(function (electoralLine) { 
									if (electoralLine) {
										electoralLine.reload();
									}										
								});
							}
						}
					});					
				});

				_self.sailsSocket.on('aval.created', function newMessageFromSails ( message ) { 
					Ember.run.next(this, function () {
						if (message.verb === 'created') {
							if (message.id) {
								store.find('aval-operator', message.data.operator).then(function (operator) { 
									if (!operator.get('isSaving')){
										operator.reload();
									}
								});
							}
						}
					});
				});



				_self.sailsSocket.on('candidate.updated', function newMessageFromSails ( message ) { 
					Ember.run.next(this, function () {
						if (message.verb === 'updated') {
							if (message.id) {
								store.find('candidate', message.id).then(function (candidate) { 
									if (!candidate.get('isSaving')) {
										candidate.reload();
									}
								});
							}
						}
					});
				});

				_self.sailsSocket.on('candidate.created', function newMessageFromSails ( message ) { 
					
					Ember.run.next(this, function () {
						if (message.verb === 'created') {
							if (message.id) {
								store.find('candidate', message.id).then(function (candidate) { 
									if (!candidate.get('isSaving')) {
										candidate.reload();
									}
								});
							}
							if (message.data.list) {
								store.find('electoral-list', message.data.list).then(function (list) { 
									Ember.run.next(function () {
										if (!list.get('isSaving')) {
											list.reload();
										}
									});
								});							
							}
						}
					});
				});				
								


				_self.sailsSocket.on('user.updated', function newMessageFromSails ( message ) {
					_self.get('session.user').then(function (newUser) {
						newUser.reload();
					});

					if (message.data.action === "friend-request-accepted") {
						var request_to_user = message.data.request.request_to_user;		
						store.find('user', request_to_user).then(function (userFriend) { 
							userFriend.reload();
							console.log(userFriend.get('fullName') + " acepto tu solicitud de amistad!!");
						});
					}
				});
				

				_self.sailsSocket.on('wall.updated', function newMessageFromSails ( message ) {
					if (message.data.entries) {
						store.find('wall', message.id).then(function (wall) {
							store.find('entry', message.data.entries).then(function (entry) {
								if (_self.get('wall') == message.id || _self.get('showNovedades')) {
									_self.addEntry(entry);
								}
								store.find('user', entry.get('owner').get('id')).then(function (owner) {
									if (wall.get('user.id')) {
										store.find('user', wall.get('user.id')).then(function (userWall) {
											if (owner.get('id') != user.get('id')) {
												if (owner.get('id') != userWall.get('id')) {
													console.log(owner.get('fullName') + " Publico en el muro de "  + userWall.get('fullName') + " " + entry.get('message'));
												} else {
													console.log(owner.get('fullName') + " Publico " + entry.get('message'));
												}
											}
										});									
									}
									if (wall.get('group.id')) {
										store.find('group', wall.get('group.id')).then(function (group) {
											if (owner.get('id') != user.get('id')) 
												console.log(owner.get('fullName') + " Publico en el grupo "  + group.get('name') + " " + entry.get('message'));
										});
									}									

									if (wall.get('event.id')) { 
										store.find('event', wall.get('event.id')).then(function (event) {
											if (owner.get('id') != user.get('id')) 
												console.log(owner.get('fullName') + " Publico en el evento "  + event.get('name') + " " + entry.get('message'));
										});
									}
								});
							});
						});
					}
				});
			})
		}			
	}.observes('session.user_id'),

	actions: {
		createNewEntry: function (entry) {
			this.addEntry(entry);
      		this.set('isShowPublish', false);
    	},  
	}
});
