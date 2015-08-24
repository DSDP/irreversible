/**
* ElectoralElection.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },

    date: {
    	type: 'datetime'
    },

    voters: {
      type: 'number'
    },

    votersBlank: {
      type: 'number'
    },

    votersNull: {
      type: 'number'
    },
   
    votersValid: {
      type: 'number'
    },

    enrolled: {
      type: 'number'
    },    
    
    province: {
      model: 'province',
    },

    town: {
      model: 'town',
    },
    
    national: {
      type: 'boolean',
    },

    electoralSection: {
      model: 'electoralSection',
    },     
  }
};

