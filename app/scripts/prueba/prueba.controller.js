(function() {
	'use strict';

	angular
		.module('realestate.prueba')
		.controller('pruebaController', pruebaController);

	pruebaController.$inject = ['InmueblesService','$state','ionicToast','$rootScope','$ionicHistory'];

	/* @ngInject */
	function pruebaController(InmueblesService,$state,ionicToast, $rootScope,$ionicHistory) {
		
		var vm = angular.extend(this, {
			contador:0,
			SumarContador: SumarContador
		});

		(function activate() {
		})();
			
		function SumarContador(){
			vm.contador++;
		}
	}
})();
