(function() {
	'use strict';

	angular
		.module('realestate.map')
		.controller('MapController', MapController);

	MapController.$inject = ['common', 'pins', '_','$cordovaGeolocation'];

	/* @ngInject */
	function MapController(common, pins, _,$cordovaGeolocation) {
		var vm = angular.extend(this, {
			origin: {
				lat: common.map.origin.latitude,
				lon: common.map.origin.longitude
			},
			zoom: common.map.zoomLevel,
			markers: loadPoints()
		});

		(function activate() {
			getCurrentPosition().then(function(position){
				vm.origin.lat = position.coords.latitude;
				vm.origin.lon = position.coords.longitude;
				vm.zoom = 15;
			});
		})();

		// ******************************************************************

		function loadPoints() {
			var markers = [];
			_.each(pins, function(pin) {
				markers.push({
					name: pin.title + getBusinessLink(pin.propertyId),
					lat: pin.lat,
					lon: pin.lon
				});
			});
			return markers;
		}

		function getBusinessLink(propertyId) {
			return '<br> <a href="#/app/inmueble/' + propertyId + '">More details</a>';
		}

		function getCurrentPosition() {
			var promesa = new Promise(function (resolve, reject) {
				var posOptions = {timeout: 10000, enableHighAccuracy: false};
				$cordovaGeolocation
					.getCurrentPosition(posOptions)
					.then(function (position) {
						resolve(position);
					}, function(err) {
					// error
						reject(err);
						alert('No hemos podido detectar tu geolizacion.\nPor favor activa el gps de tu celular y vuelve a abrir la aplicación.')
					});
            });

            return promesa;
			
		}
	}
})();
