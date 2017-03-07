(function() {
	'use strict';

	angular
		.module('realestate.Inicio', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.Inicio', {
					url: '/Inicio',
					views: {
						'menuContent': {
							templateUrl: 'scripts/Inicio/inicio.html',
                            controller: 'InicioController as vm'
						}
					}
				})
			;
		});
})();