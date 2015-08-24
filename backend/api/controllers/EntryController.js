/**
 * EntryController
 *
 * @description :: Server-side logic for managing entries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/**
 * Module dependencies
 */
var util = require( 'util' ),
  actionUtil = require( '../blueprints/_util/actionUtil' );

/**
 * Enable sideloading. Edit config/blueprints.js and add:
 *   ember: {
 *     sideload: true
 *   }
 * Defaults to false.
 *
 * @type {Boolean}
 */
var performSideload = (sails.config.blueprints.ember && sails.config.blueprints.ember.sideload);

module.exports = {


	/**
	 * Find One Record
	 *
	 * get /:modelIdentity/:id
	 *
	 * An API call to find and return a single model instance from the data adapter
	 * using the specified id.
	 *
	 * Required:
	 * @param {Integer|String} id  - the unique id of the particular instance you'd like to look up *
	 *
	 * Optional:
	 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
	 */

	findOne: function findOneRecord( req, res ) {

	  var Model = actionUtil.parseModel( req );
	  var pk = actionUtil.requirePk( req );

	  var query = Model.findOne( pk );
	  query = actionUtil.populateEach( query, req );
	  query.exec( function found( err, matchingRecord ) {
	    if ( err ) return res.serverError( err );
	    if ( !matchingRecord ) return res.notFound( 'No record found with the specified `id`.' );

		 if ( req.session.user.role != "admin") {
		  	var walls = [req.session.user.wall];
		  	var self = this;
		  	var noPermission = false;
		  	User.findOne(req.session.user.id).populate('friends').populate("groups").populate('events').exec( function find(err, instance) {
		  		_.each(instance.events, function (event) {
		  			walls.push(event.wall);
		  		});				  		
		  		_.each(instance.friends, function (friend) {
		  			walls.push(friend.wall);
		  		});				
		  		_.each(instance.groups, function (group) {
		  			walls.push(group.wall);
		  		});

	  			if (walls.indexOf(matchingRecord.wall.id) < 0) {
	  				noPermission = true;
	  			}
		  		if (noPermission) {
					return res.forbidden('You are not permitted to perform this action.');
		  		} else {
		  		 	if ( sails.hooks.pubsub && req.isSocket ) {
	      				Model.subscribe( req, matchingRecord );
	      				actionUtil.subscribeDeep( req, matchingRecord );
	    			}
				    res.ok( actionUtil.emberizeJSON( Model, matchingRecord, req.options.associations, performSideload ) );
		  		}
	      	});
		  }
	  });
	},	

	/**
	 * Find Records
	 *
	 *  get   /:modelIdentity
	 *   *    /:modelIdentity/find
	 *
	 * An API call to find and return model instances from the data adapter
	 * using the specified criteria.  If an id was specified, just the instance
	 * with that unique id will be returned.
	 *
	 * Optional:
	 * @param {Object} where       - the find criteria (passed directly to the ORM)
	 * @param {Integer} limit      - the maximum number of records to send back (useful for pagination)
	 * @param {Integer} skip       - the number of records to skip (useful for pagination)
	 * @param {String} sort        - the order of returned records, e.g. `name ASC` or `age DESC`
	 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
	 */

	find: function findRecords( req, res ) {

	  var where = actionUtil.parseCriteria( req );
	  if ( req.session.user.role != "admin" && Object.keys(where).length === 0) {
	  	var walls = [req.session.user.wall];
	  	var self = this;
	  	User.findOne(req.session.user.id).populate('friends').populate("groups").populate('events').exec( function find(err, instance) {
	  		_.each(instance.events, function (event) {
	  			walls.push(event.wall);
	  		});				  
	  		_.each(instance.friends, function (friend) {
	  			walls.push(friend.wall);
	  		});
	  		_.each(instance.groups, function (group) {
	  			walls.push(group.wall);
	  		});	  		
		  	where['wall'] = walls;
		  	self.findQuery(req, res, where);
      	});
	  } else {
	  	if (where['wall']) {
	  		var walls = [req.session.user.wall];
	  		var noPermission = false;
	  		var self = this;
			User.findOne(req.session.user.id).populate('friends').populate("groups").populate('events').exec( function find(err, instance) {
		  		_.each(instance.events, function (event) {
		  			walls.push(event.wall);
		  		});					
		  		_.each(instance.friends, function (friend) {
		  			walls.push(friend.wall);
		  		});				
		  		_.each(instance.groups, function (group) {
		  			walls.push(group.wall);
		  		});
				if (Array.isArray(where['wall'])) {
			  		_.each(where['wall'], function (wall) {
			  			if (walls.indexOf(wall) < 0) {
			  				noPermission = true;
			  			}
			  		});	  		
				} else {
		  			if (walls.indexOf(parseInt(where['wall'])) < 0) {
		  				noPermission = true;
		  			}
				}
		  		if (noPermission) {
					return res.forbidden('You are not permitted to perform this action.');
		  		} else {
		  			self.findQuery(req, res, where);
		  		}
	      	});	  		
	  		
	  	} else {
	  		this.findQuery(req, res, where);
	  	}
	  	
	  }
	},

	findQuery: function (req, res, where) {
	  // Look up the model
	  var Model = actionUtil.parseModel( req );		
	  var query = Model.find()
	    .where( where )
	    .limit( actionUtil.parseLimit( req ) )
	    .skip( actionUtil.parseSkip( req ) )
	    .sort( actionUtil.parseSort( req ) );


	  query = actionUtil.populateEach( query, req );


	  query.exec( function found( err, matchingRecords ) {
	    if ( err ) return res.serverError( err );

	    // Only `.watch()` for new instances of the model if
	    // `autoWatch` is enabled.
	    if ( req._sails.hooks.pubsub && req.isSocket ) {
	      Model.subscribe( req, matchingRecords );
	      if ( req.options.autoWatch ) {
	        Model.watch( req );
	      }
	      // Also subscribe to instances of all associated models
	      _.each( matchingRecords, function ( record ) {
	        actionUtil.subscribeDeep( req, record );
	      } );
	    }

	    //res.ok( actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload ) );
		Model.find().where( where ).exec( function count( err, numberOfRecords ) {
		      // This is not super important, so on error just ignore.
		      if ( err ) {
		        return res.ok( actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload ) );
		      }

		      var records = numberOfRecords.length;
		      var emberize = actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload );
		      res.ok( actionUtil.insertMeta( emberize, { total: records, pages: Math.ceil(records /  actionUtil.parseLimit( req ))} ) );
		    } );	    
	  } );
	}
};

