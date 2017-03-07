(function() {
	'use strict';

	var inmuebleResolve = {
		Inmueble: function($stateParams, InmueblesService) {
			return InmueblesService.getInmueble($stateParams.inmuebleId).then(function(data){
				return data.Objeto;
			})
		}
	};

	var inmuebleView = {
		templateUrl: 'scripts/Inmuebles/inmueble.html',
		controller: 'InmuebleController as vm',
		resolve: inmuebleResolve
	};

	var inmueblesView = {
		templateUrl: 'scripts/Inmuebles/inmuebles-list.html',
		controller: 'InmueblesListController as vm'
	};

	var ContactinmueblesView = {
		templateUrl: 'scripts/Inmuebles/inmueble-contact.html',
		controller: 'ContactInmueblesController as vm'
	};

	angular
		.module('realestate.inmuebles', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.inmuebles', {
					url: '/inmuebles',
					abstract: true,
					views: {
						'menuContent': {
							templateUrl: 'scripts/Inmuebles/inmuebles.html'
						}
					},
					resolve: {
						filterModal: function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('scripts/Inmuebles/inmuebles-filter.html', {
								scope: $rootScope,
								animation: 'slide-in-up'
							});
						}
					}
				})
                .state('app.inmuebles.all', {
					url: '/all',
					views: { 'tab-todos': inmueblesView }
				})
				.state('app.inmuebles.rent', {
					url: '/rent',
					views: { 'tab-arriendo': inmueblesView }
				})
				.state('app.inmuebles.sale', {
					url: '/sale',
					views: { 'tab-venta': inmueblesView }
				})
				.state('app.inmuebles.remate', {
					url: '/remate',
					views: { 'tab-remate': inmueblesView }
				})
				.state('app.inmuebles.permute', {
					url: '/permute',
					views: { 'tab-permuta': inmueblesView }
				})
				.state('app.inmuebles.inmueble-rent', {
					url: '/rent/:inmuebleId',
					views: { 'tab-arriendo': inmuebleView }
				})
				.state('app.inmuebles.inmueble-sale', {
					url: '/sale/:inmuebleId',
					views: { 'tab-venta': inmuebleView }
				})
				.state('app.inmuebles.inmueble-remate', {
					url: '/remate/:inmuebleId',
					views: { 'tab-remate': inmuebleView }
				})
				.state('app.inmuebles.inmueble-permuta', {
					url: '/permuta/:inmuebleId',
					views: { 'tab-permuta': inmuebleView }
				})
				.state('app.inmueble', {
					url: '/inmuebles/:inmuebleId',
					views: { 'menuContent': inmuebleView }
				});
			;
		});
})();