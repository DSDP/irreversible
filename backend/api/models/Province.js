/**
* Provincia.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'pgIrreversible',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'provincia_view',
  
  attributes: {
    long: 'double',    
    lat: 'double',

    name: {
      type: 'string',
      columnName: 'nombre',
    },
    map: {
      type: 'text',
      columnName: 'mapa'
    },
    color: {
      type: 'string',
      columnName: 'partido_color'
    },
    politicalPartyName: {
      type: 'string',
      columnName: 'partido_nombre',
    },
    gobernorName: {
      type: 'string',
      columnName: 'gob_nombre',
    },
    gobernorLastName: {
      type: 'string',
      columnName: 'gob_apellido',
    }


  }  
};

