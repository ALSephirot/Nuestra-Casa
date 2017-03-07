(function() {
	'use strict';

	angular
		.module('realestate.inmuebles')
		.controller('InmuebleController', InmuebleController);

	InmuebleController.$inject = [
		'Inmueble', 'externalAppsService', 'distanceService', '$state', 'favoritePropertiesService',
		'ionicToast', '$ionicHistory'];

	/* @ngInject */
	function InmuebleController(
		Inmueble, externalAppsService, distanceService, $state, favoritePropertiesService, ionicToast,
		$ionicHistory) {
		var vm = angular.extend(this, {
			currentDateTime: (new Date()).format('dddd HH:MM'),
			inmueble: Inmueble,
			images:[],
			pictures:[],
			showFavorites: showFavorites,
			getDirections: getDirections,
			toggleFavorites: toggleFavorites,
			showContactUs: showContactUs,
			toggleGroup: toggleGroup,
			isGroupShown: isGroupShown,
			shownGroup: null
		});

		(function activate() {
			var hola = Inmueble;
		})();

		// *************************************************************

		function toggleGroup (group) {
			if (vm.isGroupShown(group)) {
			vm.shownGroup = null;
			} else {
			vm.shownGroup = group;
			}
		};

		function isGroupShown (group) {
			return vm.shownGroup === group;
		};

		function toggleFavorites() {
			vm.property.isInFavorites = !vm.property.isInFavorites;
			if (vm.property.isInFavorites) {
				favoritePropertiesService.addToFavorites(property.guid);
				ionicToast.show('\'' + vm.property.title + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				favoritePropertiesService.removeFromFavorites(property.guid);
				ionicToast.show('\'' + vm.property.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}

		function showContactUs() {
			var currentState = $ionicHistory.currentStateName();
			var state = currentState + '-' + 'contact-us';

			$state.go("app.ContactInmuebles", {
				inmuebleId: vm.inmueble.id_inmueble
			});
		}

		function showFavorites() {
			var state = 'app.favorite-properties';
			if ($ionicHistory.currentStateName() !== 'app.property') {
				state = $ionicHistory.currentStateName() + '-' + 'favorites';
			}

			$state.go(state, {
				random: (new Date()).getTime()
			});
		}

		function setDistanceToOrigin() {
			if (vm.hasMapdata) {
				distanceService.getDistanceToOrigin(property.mapdata.annotations[0]).then(function(distance) {
					vm.property.distance = distance;
				});
			}
		}

		function getDirections() {
			externalAppsService.openMapsApp(property.mapdata.annotations[0]);
		}		
	}
})();
