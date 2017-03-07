(function() {
	'use strict';

	angular
		.module('realestate.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['$rootScope','$location'];

	/* @ngInject */
	function MenuController($rootScope,$location) {
		var vm = angular.extend(this, {
			CerrarSesion: CerrarSesion
		});
		function CerrarSesion(){
			$rootScope.Logeado = false;
			localStorage["usuario"] = undefined;
			$rootScope.usuario = undefined;
			$location.path('/app/inicio');
		}

		var usuario = localStorage["usuario"];
		if(usuario == undefined || usuario == null || usuario == "" || usuario == 'undefined'){
			$rootScope.Logeado = false;
		}
		else{
			var user = JSON.parse(usuario);
			$rootScope.usuario = user.email;
		}
	}
})();