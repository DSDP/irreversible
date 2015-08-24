import Ember from 'ember';
import layout from '../templates/components/address-finder';

export default Ember.Component.extend({
	layout: layout,
	_map: null,

	_config: {
	    country: '',
	    searchLabel: 'Buscar una direccion ...',
	    notFoundMessage: 'No se ha encontrado la direccion',
	    messageHideDelay: 3000,
	    zoomLevel: 18,
	    provider: new L.GeoSearch.Provider.Google()
	},

	sendRequest: function (provider, url) {
	    var that = this;

	    window.parseLocation = function (response) {
	        var results = provider.ParseJSON(response);
	        that._processResults(results);

	        document.body.removeChild(document.getElementById('getJsonP'));
	        delete window.parseLocation;
	    };

	    function getJsonP (url) {
	        url = url + '&callback=parseLocation'
	        var script = document.createElement('script');
	        script.id = 'getJsonP';
	        script.src = url;
	        script.async = true;
	        document.body.appendChild(script);
	    }

	    if (XMLHttpRequest) {
	        var xhr = new XMLHttpRequest();

	        if ('withCredentials' in xhr) {
	            var xhr = new XMLHttpRequest();

	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4) {
	                    if (xhr.status == 200) {
	                        var response = JSON.parse(xhr.responseText),
	                            results = provider.ParseJSON(response);

	                        that._processResults(results);
	                    } else if (xhr.status == 0 || xhr.status == 400) {
	                        getJsonP(url);
	                    } else {
	                        that._printError(xhr.responseText);
	                    }
	                }
	            };

	            xhr.open('GET', url, true);
	            xhr.send();
	        } else if (XDomainRequest) {
	            var xdr = new XDomainRequest();

	            xdr.onerror = function (err) {
	                that._printError(err);
	            };

	            xdr.onload = function () {
	                var response = JSON.parse(xdr.responseText),
	                    results = provider.ParseJSON(response);

	                that._processResults(results);
	            };

	            xdr.open('GET', url);
	            xdr.send();
	        } else {
	            getJsonP(url);
	        }
	    }
	},

	_processResults: function(results) {
	    if (results.length > 0) {
	        this._showLocation(results[0]);
	    } else {
	        this._printError(this._config.notFoundMessage);
	    }
	},

	_showLocation: function (location) {
		this.sendAction('locationChanged', location);
	},

	didInsertElement: function () {
		this.set('_map', this.get('_childViews.lastObject._layer'))
	},

	actions : {
		geosearch: function () {
			var qry = this.get('address');
		    try {
		        var provider = this._config.provider;

		        if(typeof provider.GetLocations == 'function') {
		            var results = provider.GetLocations(qry, function(results) {
		                this._processResults(results);
		            }.bind(this));
		        }
		        else {
		            var url = provider.GetServiceUrl(qry);
		            this.sendRequest(provider, url);
		        }
		    }
		    catch (error) {
		        this._printError(error);
		    }
		},		
	}
});