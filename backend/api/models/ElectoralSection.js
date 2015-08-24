/**
* Seccion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'pgIrreversible',
  autoCreatedAt: false,
  autoUpdatedAt: false,  
  tableName: 'seccion',

  attributes: {
    name: {
      type: 'string',
      columnName: 'nombre',
    },
    number: {
      type: 'string',
      columnName: 'numero',
    },

    totalTowns: {
      type: 'string',
      columnName: 'distritosCount',
    },

    map: {
      type: 'text',
      columnName: 'geometria'
    },
  	province: {
  		model: 'province',
      columnName: 'id_provincia',
  	},
  }
};

