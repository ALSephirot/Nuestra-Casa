(function() {
	'use strict';

	angular
		.module('realestate.CrearInmuebles')
		.controller('CrearInmuebleController', CrearInmuebleController);

	CrearInmuebleController.$inject = ['InmueblesService','$state','ionicToast'];

	/* @ngInject */
	function CrearInmuebleController(InmueblesService,$state,ionicToast) {
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
				tituloAnuncio:"", 
				descripcionInmueble:"",  
				tipoInmueble:"",
				tipoAnuncio:"",         
				valorInmueble:"",            
				areaTotal:"",
				tiempoConstruido:"",
				habitaciones:"",
				banos:"",         
				estadoConservacion:"",
				departamento:"",
				ciudad:"",
				zona:"",
				longitud:"",
				latitud:"",
				email:usuario.email,
				ruta:""
			},
			data:{
				tipoInmueble:[],
				tipoAnuncio:[],
				estadoInmueble:[],
				departamentos:[],
				ciudades:[],
				zona:[]
			},
			LoadCiudades: LoadCiudades,
			SaveInmueble: SaveInmueble
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
			
			function SaveInmueble(){
				InmueblesService.postSaveInmueble(vm.model).then(function(data){
					var hola = data;
					$state.go('app.SubirImagen',{inmuebleId:data.Objeto})
					ionicToast.show('Inmueble creado correctamente', 'bottom', false, 2000);
				})
			}
	}
})();
