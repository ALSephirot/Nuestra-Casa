(function() {
	'use strict';

	angular
		.module('realestate.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['_','loginService','$rootScope','$location'];

	/* @ngInject */
	function LoginController(_,loginService,$rootScope,$location) {
		var vm = angular.extend(this, {
			datos:{
				email:"",
				password:""
			},
			enviar: Enviar
		});
		
		var usuario = localStorage["usuario"];
		if(usuario == undefined || usuario == null || usuario == "" || usuario == 'undefined'){
			$rootScope.Logeado = false;
		}
		else{
			$location.path('/app/inmuebles/all');
		}

		// ******************************************************************
		function Enviar() {
			loginService.Login(vm.datos).then(function (data) {
				var hola = data;
				if(data.Objeto.Logeado){
					$rootScope.Logeado = true;
					localStorage["usuario"] = JSON.stringify(data.Objeto.usuario);
					$rootScope.usuario = data.Objeto.usuario.email;
					 $location.path('/app/inmuebles/all');
				}
			})
		}
	}
})();
