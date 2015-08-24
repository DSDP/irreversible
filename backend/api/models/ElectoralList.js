/**
* ElectoralList.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },

    description: {
      type: 'string'
    },

    province: {
      model: 'province',
    },

    town: {
      model: 'town',
    },

    electoralSection: {
      model: 'electoralSection',
    }, 

    electoralElection: {
      model: 'electoralElection',
    }, 

  	line: {
  		model: 'electoralLine',
      via: 'list'
  	},
	
    candidates: {
      collection: 'candidate',
      via: 'list'
    },

  	name: {
  		type: 'string'
  	},

    politicalParty: {
      model: 'politicalParty',
    },    
  }
};

