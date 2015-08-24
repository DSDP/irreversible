/**
 * Friend-requestController
 *
 * @description :: Server-side logic for managing friend-requests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var util = require( 'util' ),
  actionUtil = require( '../blueprints/_util/actionUtil' );
var cloneDeep   = require('lodash/lang/cloneDeep');

var performSideload = (sails.config.blueprints.ember && sails.config.blueprints.ember.sideload);

module.exports = {
	create: function createRecord( req, res ) {

	  var Model = actionUtil.parseModel( req );
	  var data = actionUtil.parseValues( req, Model );

	  /* if ( req.user && req.user.id ) {
	    sails.log.debug( 'Injecting req.user into blueprint create -> data.' );
	    data.user = req.user.id;
	  } else {
	    // exception for creating new users, otherwise any creative act needs a logged in user
	    if ( Model.identity !== 'user' ) return res.forbidden( "Create blueprint needs an authenticated user!" );
	  } */

	  // Create new instance of model using data from params
	  Model.create( data ).exec( function created( err, newInstance ) {

	    // Differentiate between waterline-originated validation errors
	    // and serious underlying issues. Respond with badRequest if a
	    // validation error is encountered, w/ validation info.
	    if ( err ) return res.negotiate( err );

	    // If we have the pubsub hook, use the model class's publish method
	    // to notify all subscribers about the created item
	    
	    if ( req._sails.hooks.pubsub ) {
	      if ( req.isSocket ) {
	        Model.subscribe( req, newInstance );
	        Model.introduce( newInstance );
	      }
	      Model.publishCreate( newInstance, !req.options.mirror && req );
	      User.publishUpdate(newInstance.request_to_user, {action: 'friend-request', request: newInstance.id});
	    }

	    // Do a final query to populate the associations of the record.
	    var Q = Model.findOne( newInstance[ Model.primaryKey ] );
	    Q = actionUtil.populateEach( Q, req );
	    Q.exec( function foundAgain( err, populatedRecord ) {
	      if ( err ) return res.serverError( err );
	      if ( !populatedRecord ) return res.serverError( 'Could not find record after updating!' );

	      // Send JSONP-friendly response if it's supported
	      // (HTTP 201: Created)
	      res.status( 201 );
	      res.ok( actionUtil.emberizeJSON( Model, populatedRecord, req.options.associations, false ) );

	    } );
	  } );
	},

	update: function (req, res) {
	// Look up the model
	  var Model = actionUtil.parseModel( req );

	  // Locate and validate the required `id` parameter.
	  var pk = actionUtil.requirePk( req );

	  // Create `values` object (monolithic combination of all parameters)
	  // But omit the blacklisted params (like JSONP callback param, etc.)
	  var values = actionUtil.parseValues( req, Model );

	  // Omit the path parameter `id` from values, unless it was explicitly defined
	  // elsewhere (body/query):
	  //var idParamExplicitlyIncluded = ( ( req.body && req.body.id ) || req.query.id );
	  //if ( !idParamExplicitlyIncluded ) delete values.id;

	  // Find and update the targeted record.
	  //
	  // (Note: this could be achieved in a single query, but a separate `findOne`
	  //  is used first to provide a better experience for front-end developers
	  //  integrating with the blueprint API.)
	  Model.findOne( pk ).exec( function found( err, matchingRecord ) {

	    if ( err ) return res.serverError( err );
	    if ( !matchingRecord ) return res.notFound();

	    Model.update( pk, values ).exec( function updated( err, records ) {

	      // Differentiate between waterline-originated validation errors
	      // and serious underlying issues. Respond with badRequest if a
	      // validation error is encountered, w/ validation info.
	      if ( err ) return res.negotiate( err );

	      // Because this should only update a single record and update
	      // returns an array, just use the first item.  If more than one
	      // record was returned, something is amiss.
	      if ( !records || !records.length || records.length > 1 ) {
	        req._sails.log.warn(
	          util.format( 'Unexpected output from `%s.update`.', Model.globalId )
	        );
	      }

	      var updatedRecord = records[ 0 ];

	      // If we have the pubsub hook, use the Model's publish method
	      // to notify all subscribers about the update.
	      if ( req._sails.hooks.pubsub ) {
	        if ( req.isSocket ) {
	          Model.subscribe( req, records );
	        }
	        Model.publishUpdate( pk, cloneDeep( values ), !req.options.mirror && req, {
	          previous: matchingRecord.toJSON()
	        } );
	        if (updatedRecord.status == "1") {
	      		User.publishUpdate(updatedRecord.user_request, {action: 'friend-request-accepted', request: updatedRecord});
	        }
	      }
	      if (updatedRecord.status == "1") {
	      	User.findOne(updatedRecord.request_to_user).populate('friends').exec(function (err, user) {
	      		_.each(user.friends, function (friend) {
		  			console.log(friend);
		  		});
	      		user.friends.add(updatedRecord.user_request);
	      		user.save(function (err) {
		      		User.findOne(updatedRecord.user_request).populate('friends').exec(function (err, user2) {
		      			user2.friends.add(updatedRecord.request_to_user);
		   				user2.save();
		      		});
	      		});
	      	});
	      }

	      // Do a final query to populate the associations of the record.
	      //
	      // (Note: again, this extra query could be eliminated, but it is
	      //  included by default to provide a better interface for integrating
	      //  front-end developers.)
	      var Q = Model.findOne( updatedRecord[ Model.primaryKey ] );
	      Q = actionUtil.populateEach( Q, req );
	      Q.exec( function foundAgain( err, populatedRecord ) {
	        if ( err ) return res.serverError( err );
	        if ( !populatedRecord ) return res.serverError( 'Could not find record after updating!' );
	        res.ok( actionUtil.emberizeJSON( Model, populatedRecord, req.options.associations, performSideload ) );
	      } ); // </foundAgain>
	    } ); // </updated>
	  } ); // </found>	
	}
};

