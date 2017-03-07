(function() {
	'use strict';

	angular
		.module('realestate.CrearInmuebles', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.CrearInmuebles', {
					url: '/CrearInmuebles',
					views: {
						'menuContent': {
							templateUrl: 'scripts/CrearInmuebles/CrearInmueble.html',
                            controller: 'CrearInmuebleController as vm'
						}
					}
				})
			;
		});
})();