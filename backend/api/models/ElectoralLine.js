/**
* ElectoralLine.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		number: {
			type: 'string',
		},

	    electoralSection: {
	      	model: 'electoralSection'
	    },

	  	town: {
	  		model: 'town',
	  	},

		list: {
			model: 'electoralList'
		},

		province: {
			model: 'province',
		},

		avalesEntry: {
			type: 'string',
		},

		avalesNeed: {
			type: 'string',
		},

		avalStatuses: {
	      	collection: 'avalStatus',
	      	via: 'line'			
		},		
	}
};

