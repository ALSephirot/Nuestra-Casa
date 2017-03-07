

(function() {
	'use strict';

	angular
		.module('realestate.inmuebles')
		.controller('ContactInmueblesController', ContactInmueblesController);

	ContactInmueblesController.$inject = ['InmueblesService','$state','ionicToast','$rootScope','$stateParams'];

	/* @ngInject */
	function ContactInmueblesController(InmueblesService,$state,ionicToast, $rootScope,$stateParams) {
		if(localStorage["usuario"] == undefined || localStorage["usuario"] == ""){
			var usuario = {
				email:""
			}
		} 
		else{
			var usuario = JSON.parse(localStorage["usuario"]);
		}

		var vm = angular.extend(this, {
			model:{
                id_inmueble:"",
                tituloAnuncio:"",
                session_user:usuario.email,
				nombres:"",
				email:"",
				telefono:"",
                mensaje:""
			},
			Enviar: Enviar
		});

		(function activate() {
			LoadInmueble();
		})();
			
			function LoadInmueble(){
				InmueblesService.getInmueble($stateParams.inmuebleId).then(function(data){
                    vm.model.id_inmueble = data.Objeto.id_inmueble;
                    vm.model.tituloAnuncio = data.Objeto.tituloAnuncio;
                })
			}
			
			
			function Enviar(){
                InmueblesService.EnviarContacto(vm.model).then(function(data){
                    ionicToast.show('Mensaje enviado correctamente', 'bottom', false, 2000);
                });
                $state.go('app.inmuebles.all')

			}
	}
})();
