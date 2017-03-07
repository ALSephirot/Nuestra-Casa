(function() {
	'use strict';

	angular
		.module('realestate.Inicio')
		.controller('InicioController', InicioController);

	InicioController.$inject = ['InmueblesService','$state','ionicToast','$rootScope','$ionicHistory'];

	/* @ngInject */
	function InicioController(InmueblesService,$state,ionicToast, $rootScope,$ionicHistory) {
		if(localStorage["usuario"] == undefined || localStorage["usuario"] == "" || localStorage["usuario"] == 'undefined'){
			var usuario = {
				email:""
			}
		} 
		else{
			var usuario = JSON.parse(localStorage["usuario"]);
		}

		var vm = angular.extend(this, {
			
			model:{  
				tipoInmueble:"",
				tipoAnuncio:"",
				ciudad:""
			},
			data:{
				tipoInmueble:[],
				tipoAnuncio:[],
				departamentos:[],
				ciudades:[]
			},
			LoadCiudades: LoadCiudades,
			Buscar: Buscar
		});

		(function activate() {
			LoadTipoInmueble();
			LoadTipoAnuncio();
			LoadEstadoInmueble();
			LoadDepartamentos();
			LoadZonas();
		})();
			
			function LoadTipoInmueble(){
				InmueblesService.getTipoInmuebles().then(function (Respuesta) {
					vm.data.tipoInmueble = Respuesta.Objeto;
				})
			}
			
			function LoadTipoAnuncio(){
				InmueblesService.getTipoAnuncio().then(function (Respuesta) {
					vm.data.tipoAnuncio = Respuesta.Objeto;
				})
			}
			
			function LoadEstadoInmueble(){
				InmueblesService.getEstadoInmuebles().then(function (Respuesta) {
					vm.data.estadoInmueble = Respuesta.Objeto;
				})
			}
			
			function LoadDepartamentos(){
				InmueblesService.getDepartamentos().then(function (Respuesta) {
					vm.data.departamentos = Respuesta.Objeto;
				});
			}
			
			function LoadCiudades(){
				InmueblesService.getMunicipios(vm.model.departamento).then(function (Respuesta) {
					vm.data.ciudades = Respuesta.Objeto;
				})
			}
			
			function LoadZonas(){
				InmueblesService.getZonas().then(function (Respuesta) {
					vm.data.zona = Respuesta.Objeto;
				})
			}
			
			function Buscar(){
                var tipoauncio = (vm.model.tipoAnuncio == "" || vm.model.tipoAnuncio == undefined || vm.model.tipoAnuncio == null)?"all":vm.model.tipoAnuncio;
                $rootScope.Filtros.model.tipoInmueble = (vm.model.tipoInmueble == "")?"all":vm.model.tipoInmueble;
                $rootScope.Filtros.model.idMunicipio = (vm.model.ciudad == "")?"all":vm.model.ciudad;
                $rootScope.Filtros.filtrar = true;

				var statego = (tipoauncio == '1')?'sale':(tipoauncio == '2')?'rent':(tipoauncio == '3')?'remate':(tipoauncio == '4')?'permute':'all';

				$ionicHistory.clearCache().then(function(){ 
					$state.go('app.inmuebles.'+statego); 
				});
			}
	}
})();
