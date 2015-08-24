var moment = require ('moment');

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

/**
 * UserController.js 
 * 
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *                 
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({
  /* e.g.
    action: function(req, res){
  
    }
  */
  findOne: function findOneRecord( req, res ) {

	var Model = actionUtil.parseModel( req );
	var pk = actionUtil.requirePk( req );

	var query = Model.findOne( pk );
	query = actionUtil.populateEach( query, req );


	query.exec( function found( err, matchingRecord ) {
		if ( err ) return res.serverError( err );
		if ( !matchingRecord ) return res.notFound( 'No record found with the specified `id`.' );
		Aval.count({operator: matchingRecord.id}).exec(function countCB(err, found){
			matchingRecord.totalCharge = found;  
			Aval.count({operator: matchingRecord.id, createdAt: {'>=' : moment(moment().format('YYYY-MM-DD')).toISOString()}}).exec(function countCB(err, found){
				if (found) {
					matchingRecord.todayCharge = found;  
				}
				else {
					matchingRecord.todayCharge = 0;  
				}
				res.ok( actionUtil.emberizeJSON( Model, matchingRecord, req.options.associations, performSideload ) );
			});			
		});

		if ( sails.hooks.pubsub && req.isSocket ) {
		  Model.subscribe( req, matchingRecord );
		  actionUtil.subscribeDeep( req, matchingRecord );
		}

		
	} );

 },

  find: function findRecords(req, res) {
	  // Look up the model
	  var Model = actionUtil.parseModel( req );

	  /* ENABLE if needed ( see https://github.com/mphasize/sails-ember-blueprints/issues/3 )
	   * ----------------
	   * If an `id` param was specified, use the findOne blueprint action
	   * to grab the particular instance with its primary key === the value
	   * of the `id` param.   (mainly here for compatibility for 0.9, where
	   * there was no separate `findOne` action)
	   */
	  // if ( actionUtil.parsePk( req ) ) {
	  //  return require( './findone' )( req, res );
	  // }
	  var where = actionUtil.parseCriteria( req );

	  // Lookup for records that match the specified criteria
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

      	_.each( matchingRecords, function ( record ) {
        	Aval.count({operator: record.id}).exec(function countCB(err, found){
				record.totalCharge = found;  
			});
			Aval.count({operator: record.id, createdAt: {'>=' : moment(moment().format('YYYY-MM-DD')).toISOString()}}).exec(function countCB(err, found){
				if (found) {
					record.todayCharge = found;  
				}
				else {
					record.todayCharge = 0;  
				}
			});
      	} );


	    //res.ok( actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload ) );
	    //res.ok( actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload ) );
	    Model.find().where( where ).exec( function count( err, numberOfRecords ) {
	      // This is not super important, so on error just ignore.
	      if ( err ) {
	        return res.ok( actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload ) );
	      }

	      var records = numberOfRecords.length;
	      var emberize = actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload );
	      res.ok( actionUtil.insertMeta( emberize, { total: records, pages: Math.ceil(records / actionUtil.parseLimit( req )) } ) );
	    } ); 	    
	  } );  	
  }
});
