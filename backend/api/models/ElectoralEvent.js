/**
* ElectoralEvent.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	title: 'string',
  	description: 'string',
  	date: 'datetime',

  	province: {
  		model: 'province',
  	},

  	town: {
  		model: 'town',
  	},
  }
};

