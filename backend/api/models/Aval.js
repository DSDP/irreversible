/**
* Aval.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		line: {
			model: 'electoralLine',
		},
		operator:{
			model: 'avalOperator',
		},
		lineNumber:{
			type: 'string',
		},
		operatorNumber:{
			type: 'string',
		},		
		fullName: {
			type: 'string',
		},
		dni: {
			type: 'string',
		},
		sex: {
			type: 'string',
		},
	}
};


