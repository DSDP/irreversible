/**
* Friend-request.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	user_request: {
  		model: 'user',
  		via: 'requestFriendsSend'
  	},
  	request_to_user: {
  		model: 'user',
  		via: 'requestFriendsRecibe'
  	},
  	status: 'string',
  }
};

