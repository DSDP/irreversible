/**
* Entry.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	message: 'string',
    type: 'string',
    
  	owner: {
  		model:'user'
  	},
  	wall: {
  		model: 'wall'
  	},
  	favoriters: {
  		collection: 'user',
  		via: 'favorites'
  	},
    
    files: {
      collection: 'asset',
    },
  },

  beforeDestroy: function (args, next) {
    Entry.findOne(args.id).populate('files').exec( function created( err, entry ) { 
        _.each(entry.files, function (file) {
            Asset.destroy(file.id).exec(function (err) {
              if (err)
                console.log(err);
            });
        }); 
        next();
    });    
  }
};

