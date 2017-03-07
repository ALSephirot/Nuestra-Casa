(function() {
	'use strict';

	angular
		.module('realestate.SubirImagen', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.SubirImagen', {
					url: '/SubirImagen/:inmuebleId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/Foto/foto.html',
                            controller: 'SubirFotoController as vm'
						}
					}
				})
			;
		});
})();