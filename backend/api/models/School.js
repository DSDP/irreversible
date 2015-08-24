/**
* School.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  migrate: 'alter',

  attributes: {
    town: {
    	model: 'town',
    },
    boards: {
	     collection: 'board',
    },
    referent: {
    	model: 'referent',
    },
    name: 'string',
    lat: 'string',
    lg: 'string',
  }
};

