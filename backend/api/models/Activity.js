/**
* Activity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'pgIrreversible',
  autoCreatedAt: false,
  autoUpdatedAt: false,  
  tableName: 'actividad',  
  attributes: {
  	line: {
  		model: 'electoralLine',
  	},
	lineNumber: {
	    type: 'string'

	},
  }
};

	