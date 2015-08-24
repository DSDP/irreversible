/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: 'string',
  	description: 'string',
    owner: {
      model:'user'
    },
        
  	wall: {
  		model: 'wall',
  		via: 'group'
  	},

    members: {
      collection: 'user',
      via: 'events'
    },

    avatar: {
      model: 'asset',
    },    

    location: {
    	model: 'location'
    }, 

    address: 'string',
    date: 'datetime',
    hours: 'string',
  },


  afterCreate: function (args, next) {
  	Wall.create({event: args.id}).exec( function created( err, newInstance ) { 
  		Event.findOne(args.id).exec( function updated(err, instance) {
	  		instance.wall = newInstance.id;
      		instance.members.add(args.owner);
	  		instance.save(function () {
	  			next();
	  		})
  		});
  	});
  }
};

