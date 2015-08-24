/**
* Candidate.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    
    list: {
      model: 'electoralList',
    },

    order: {
      type: 'integer',
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


  	person: {
  		model: 'person',
  	},

  	politicalParty: {
  		model: 'politicalParty',
  	},

    politicalSpace: {
      model: 'politicalSpace',
    },

  	result: {
  		type: 'float',
  	},

    charge: {
      model: 'charge',
    },

    comment: {
      type: 'string'
    }
  }
};

