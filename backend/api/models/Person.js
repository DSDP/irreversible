/**
* Person.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'pgIrreversible',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'persona',
  
  attributes: {
  	name: {
      type: 'string',
      columnName: 'nombre',
    },

  	lastName: {  
      type: 'string',
      columnName: 'apellido',
    },

    fullName: {
      type: 'string',
      columnName: 'nomape',
    },
        
    avatar: {
      model: 'asset',
    },    
  }
};

