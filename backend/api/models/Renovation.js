/**
* Renovation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'pgIrreversible',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'renovacion_view',

  attributes: {
  	position: {
  		type: 'string',
  		columnName: 'cargo'
  	},
  	
  	province: {
  		model: 'province',
  		columnName: 'id_provincia',
  	},

  	town: {
  		model: 'town',
  		columnName: 'id_municipio',
  	},

  	person: {
  		model: 'person',
  		columnName: 'id_persona',
  	},

  	politicalParty: {
  		model: 'politicalParty',
  		columnName: 'id_partido'
  	},
  }
};

