(function() {
	'use strict';

	angular
		.module('realestate.ContactInmuebles', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.ContactInmuebles', {
					url: '/ContactInmuebles/:inmuebleId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/Contact/inmueble-contact.html',
                            controller: 'ContactInmueblesController as vm'
						}
					}
				})
			;
		});
})();