/**
* Municipio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'pgIrreversible',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'municipio_view',
  
  attributes: {
    name: {
      type: 'string',
      columnName: 'nombre',
    },
    slug: {
      type: 'string',
      columnName: 'departamento',
    },
  	map: {
      type: 'text',
      columnName: 'mapa'
    },

    province: {
      model: 'province',
      columnName: 'id_provincia',
    },    

    electoralSection: {
      model: 'electoralSection',
      columnName: 'id_seccion',
    },     

    lat: 'double',
    long: 'double',
    
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

