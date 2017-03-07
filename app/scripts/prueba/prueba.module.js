(function() {
	'use strict';

	angular
		.module('realestate.prueba', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.prueba', {
					url: '/prueba',
					views: {
						'menuContent': {
							templateUrl: 'scripts/prueba/prueba.html',
                            controller: 'pruebaController as vm'
						}
					}
				})
			;
		});
})();