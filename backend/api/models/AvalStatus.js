/**
* AvalStatus.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		line: {
			model: 'electoralLine',
		},
		
		electoralSection:{
			model: 'electoralSection',
		},

		town:{
			model: 'town',
		},

		lineNumber:{
			type: 'string',
		},	

		sectionNumber: {
			type: 'string',
		},

		townName: {
			type: 'string',
		},		

		avalesEntry: {
			type: 'string',
		},

		avalesNeed: {
			type: 'string',
		},
	},
};

