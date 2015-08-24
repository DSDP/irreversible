/**
 * RenovationController
 *
 * @description :: Server-side logic for managing renovations
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
  findOne: function (req, res) {
  	var pk = actionUtil.requirePk( req );
	var province;
	var town;

	if (RegExp('province').test(pk)) {
		province = pk.replace('province-', '');
	} 

	if (RegExp('town').test(pk)) {

		town = pk.replace('town-', '');
	}

	var where = {};

	if (province)
		where.province = province;
	if (town)
		where.town = town;
	where.like = {position: 'Presidente de la Nación%'};
	Renovation.find().where(where).exec(function (err, presidents) {
			if (err)
		  		return res.serverError( err );
		  	if (presidents.length > 0)
		 		president = presidents[0].id;
		 	else
		 		president = null;
		 	where.like = {position: '%vicepre%'};
			Renovation.find().where(where).exec(function (err, vicepresidents) {
			if (err)
		  		return res.serverError( err );
			if (vicepresidents.length > 0)
		 		vicepresident = vicepresidents[0].id;
		 	else
		 		vicepresident = null;		  	
		 	where.like = {position: '%Diputado%'};
			Renovation.find().where(where).exec(function (err, diputies) {
				if (err)
			  		return res.serverError( err );
			 	diputies = diputies.map(function(diputy){ 
					return diputy.id;
			 	});
			 	where.like = {position: '%Senador%'};
			 	Renovation.find().where(where).exec(function (err, senators) { 
					if (err)
						return res.serverError( err );
					senators = senators.map(function(senator){ 
						return senator.id; 
					});
					where.like = {position: '%gober%'};
				 	Renovation.find().where(where).exec(function (err, governors) { 
						if (err)
							return res.serverError( err );
						governors = governors.map(function(governor){ 
							return governor.id; 
						});
						where.like = {position: '%intende%'};
					 	Renovation.find().where(where).exec(function (err, intendents) { 
							if (err)
								return res.serverError( err );
							intendents = intendents.map(function(intendent){ 
								return intendent.id; 
							});
							where.like = {position: '%consej%'};
						 	Renovation.find().where(where).exec(function (err, consejals) { 
								if (err)
									return res.serverError( err );
								consejals = consejals.map(function(consejal){ 
									return consejals.id; 
								});
								
								res.ok({renovation: {id: pk, vicepresident: vicepresident, president: president, deputies: diputies, senators: senators, governors: governors, intendents: intendents, consejals: consejals}});							
							});
						});
					});
				});
			});
		 });		 	
	});
  },
};

