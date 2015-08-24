/**
* Governor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'pgIrreversible',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'conf_politica',

  attributes: {
  	province: {
  		model: 'province',
  		columnName: 'id_provincia',
  		via: 'functionaries'
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

  	startDate: {
  		type: 'datetime',
  		columnName: 'fecha_desde',
  	},

  	endDate: {
  		type: 'datetime',
  		columnName: 'fecha_hasta',
  	},

  	level: {
  		type: 'string',
  		columnName: 'nivel'
  	},

  	position: {
  		type: 'string',
  		columnName: 'cargo'
  	}

  }
};

