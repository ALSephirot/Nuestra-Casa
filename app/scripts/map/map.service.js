(function() {
	'use strict';

	angular
		.module('realestate.map')
		.factory('mapService', mapService);

	mapService.$inject = ['_', 'InmueblesService','$cordovaGeolocation'];

	/* @ngInject */
	function mapService(_, InmueblesService,$cordovaGeolocation) {
		var pins;

		var service = {
			getPins: getPins,
			getCommon: getCommon
		};
		return service;

		// ***************************************************************

		function getPins() {
			return InmueblesService.getInmuebles(1).then(function(properties) {
				pins = [];
				_.each(properties.Objeto, function(property) {
					pins.push({
						title: property.tituloAnuncio,
						lat: property.latitud,
						lon: property.longitud,
						propertyId: property.id_inmueble
					});
				});
				return pins;
			});
		}

		function getCommon() {
			var respuesta = {
				map:{
					origin:{
						latitude:'4.490857',
						longitude:'-73.975986'
					},
					zoomLevel:5
				}
			}

            return respuesta;
			
		}
	}
})();
