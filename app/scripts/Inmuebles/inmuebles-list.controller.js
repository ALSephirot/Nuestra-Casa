(function() {
	'use strict';

	angular
		.module('realestate.inmuebles')
		.controller('InmueblesListController', InmueblesListController);

	InmueblesListController.$inject = ['$state', 'InmueblesService', 'distanceService', 'filterModal', '_','$scope','$rootScope'];

	/* @ngInject */
	function InmueblesListController($state, InmueblesService, distanceService, filterModal, _,$scope,$rootScope) {
		var ppagina = 1;
        var intention = $state.$current.name;
		var tipoanuncio = (intention.indexOf('.rent') > 0)?'2':(intention.indexOf('.sale') > 0)?'1':(intention.indexOf('.remate') > 0)?'3':(intention.indexOf('.permute') > 0)?'4':'all' ;
		var vm = angular.extend(this, {
			inmuebles:[],
            sortBy: 'id_inmueble',
			showFilter: showFilter,
			filters:{
                idMunicipio:($rootScope.Filtros.model.idMunicipio == undefined)?'all':$rootScope.Filtros.model.idMunicipio,
                tipoauncio: tipoanuncio,
                tipoInmueble:($rootScope.Filtros.model.tipoInmueble == undefined)?'all':$rootScope.Filtros.model.tipoInmueble,
                estadoInmueble:"all",
                zona:"all",
                barrio:"all",
                valorDesde:"all",
                valorHasta:"all",
                banos:"all",
                habitaciones:"all",
                tiempoConstruido:"all",
                fechaDesde:"all",
                fechaHasta:"all"
            },
			navigate:navigate,
			CargarMasDatos:CargarMasDatos,
			getInmueblesFilter: getInmueblesFilter,
			moreInfo:false
		});
		
        
        (function activate() {
			var ppagina = 1;
			vm.moreInfo = false;
			getInmueblesFilter(ppagina);
		})();
        
        function getInmuebles(Pagina) {
			if(vm.filters.tipoauncio == "all"){
				InmueblesService.getInmuebles(Pagina).then(function (Respuesta) {
					if(Respuesta.Objeto == undefined || Respuesta.Objeto.length == 0){
						vm.moreInfo = false;
					}
					else{
						vm.moreInfo = true;
					}
					vm.inmuebles = Respuesta.Objeto;
					$scope.$apply();
				})
			}
			else{
				InmueblesService.getInmueblesFilter(Pagina,vm.filters).then(function (Respuesta) {
					if(Respuesta.Objeto == undefined || Respuesta.Objeto.length == 0){
						vm.moreInfo = false;
					}
					else{
						vm.moreInfo = true;
					}
					vm.inmuebles = Respuesta.Objeto;
					$scope.$apply();
				})
			}
			
        }
		
		function getInmueblesFilter(Pagina) {
			InmueblesService.getInmueblesFilter(Pagina,vm.filters).then(function (Respuesta) {
				if(Respuesta.Objeto == undefined || Respuesta.Objeto.length == 0){
					vm.moreInfo = false;
				}
				else{
					vm.moreInfo = true;
				}
				vm.inmuebles = Respuesta.Objeto;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$apply();
			})
        }

		function CargarMasDatos(){
			ppagina = ppagina + 1;
			
			InmueblesService.getInmueblesFilter(ppagina,vm.filters).then(function (Respuesta) {
				if(Respuesta.Objeto == undefined || Respuesta.Objeto.length == 0){
					vm.moreInfo = false;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				else{
					angular.forEach(Respuesta.Objeto, function(value, key) {
						vm.inmuebles.push(value);
					});
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$apply();
				}
			})
		}
		
		function applyFilters() {
			ppagina = 1;
			filterModal.hide();

			var scope = filterModal.scope;
			
			vm.filters.idMunicipio = scope.vm.idMunicipio.Id;
			vm.filters.tipoInmueble = scope.vm.tipoInmueble.Id;
			vm.filters.estadoInmueble = scope.vm.estadoInmueble.Id;
			vm.filters.zona = (scope.vm.zona.Id == "" || scope.vm.zona.Id == undefined)?'all':scope.vm.zona.Id;
			vm.filters.barrio = (scope.vm.barrio.Id == "" || scope.vm.barrio.Id == undefined)?'all':scope.vm.barrio.Id;
			vm.filters.valorDesde = (scope.vm.valorDesde.Id == '0' || scope.vm.valorDesde.Id == 0 || scope.vm.valorDesde.Id == "")?'all':scope.vm.valorDesde.Id;
			vm.filters.valorHasta = (scope.vm.valorHasta.Id == '0' || scope.vm.valorHasta.Id == 0 || scope.vm.valorHasta.Id == "")?'all':scope.vm.valorHasta.Id;
			vm.filters.banos = scope.vm.banos.Id;
			vm.filters.habitaciones = scope.vm.habitaciones.Id;
			vm.filters.tiempoConstruido = scope.vm.tiempoConstruido.Id;
			vm.filters.fechaDesde = scope.vm.fechaDesde.Id;
			vm.filters.fechaHasta = scope.vm.fechaHasta.Id;
            
			getInmueblesFilter(ppagina);
		}

		function showFilter() {
			var scope = filterModal.scope;
			scope.vm = {
				Departamento: {
					Data: [],
					CallbackChange: function (id) {
						scope.vm.idMunicipio.Data = [];
						InmueblesService.getMunicipios(id).then(function (Respuesta) {
							scope.vm.idMunicipio.Data = Respuesta.Objeto;
							scope.vm.idMunicipio.Show = true;
						})
					},
					change: OptionChange,
					Id: "",
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
				idMunicipio: {
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.idMunicipio,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                tipoauncio: {
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.idMunicipio,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                tipoInmueble:{
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.tipoInmueble,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                estadoInmueble:{
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.estadoInmueble,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				}, 
                zona:{
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.zona,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				}, 
                barrio:{
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.barrio,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                valorDesde: {
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.valorDesde,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                valorHasta: {
					Data: [],
					CallbackChange: function () {
						if(scope.vm.valorDesde.Id > this.Id){
							alert('el valor final debe ser superior al valor inicial');
							this.Show = true;
						}
					},
					change: OptionChange,
					Id: vm.filters.valorHasta,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                banos:{
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.banos,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                habitaciones:{
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id:  vm.filters.habitaciones,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                tiempoConstruido:{
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id:   vm.filters.tiempoConstruido,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                fechaDesde:{
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.fechaDesde,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
                fechaHasta:{
					Data: [],
					CallbackChange: undefined,
					change: OptionChange,
					Id: vm.filters.fechaHasta,
					Nombre: "",
					Show: (this.Id == undefined || this.Id == null || this.Id == "" || this.Id == "all")?true:false,
					ShowOptions:ShowOptions
				},
				applyFilters: applyFilters
			};
			
			function OptionChange(nombre, id) {
				this.Id = id;
				this.Nombre = nombre;
				this.Show = false;
				
				if(this.CallbackChange != undefined){
					this.CallbackChange(id);
				}
			}
			
			function ShowOptions() {
				this.Show = true;
			}
			
			InmueblesService.getDepartamentos().then(function (Respuesta) {
			    scope.vm.Departamento.Data = Respuesta.Objeto;
			});
			
			InmueblesService.getTipoInmuebles().then(function (Respuesta) {
			    scope.vm.tipoInmueble.Data = Respuesta.Objeto;
			})
			
			InmueblesService.getEstadoInmuebles().then(function (Respuesta) {
			    scope.vm.estadoInmueble.Data = Respuesta.Objeto;
			})
			
			InmueblesService.getZonas().then(function (Respuesta) {
			    scope.vm.zona.Data = Respuesta.Objeto;
			})
			
			InmueblesService.getBanos().then(function (Respuesta) {
			    scope.vm.banos.Data = Respuesta.Objeto;
			})
			
			InmueblesService.getHabitaciones().then(function (Respuesta) {
			    scope.vm.habitaciones.Data = Respuesta.Objeto;
			})
			
			InmueblesService.getAntiguedad().then(function (Respuesta) {
			    scope.vm.tiempoConstruido.Data = Respuesta.Objeto;
			})
			

			filterModal.show();
		}
		
		function navigate(InmuebleID) {
			var anuncio = (intention.indexOf('.rent') > 0)?'rent':(intention.indexOf('.sale') > 0)?'sale':(intention.indexOf('.remate') > 0)?'remate':(intention.indexOf('.permuta') > 0)?'permuta':'all';
			var state = (anuncio == "all")?'app.inmueble':'app.inmuebles.inmueble-' + anuncio.toLowerCase();
			//$location.path('/app/inmueble/'+InmuebleID);
			$state.go(state, { inmuebleId: InmuebleID });
		}
	}
})();
