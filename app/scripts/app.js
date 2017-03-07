// angular.module is a global place for creating, registering and retrieving Angular modules
// 'realestate' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'realestate.controllers' is found in controllers.js
angular.module('realestate', [
	'ionic',
	'ionic.service.core',
	'ionic.service.push',
	'ngCordova',
	'firebase',

	'config',
	'gMaps',

	'realestate.login',
	'realestate.map',
	'realestate.properties',
	'realestate.inmuebles',
	'realestate.CrearInmuebles',
	'realestate.SubirImagen',
	'realestate.ContactInmuebles',
	'realestate.favorite-properties',
	'realestate.push',
	'realestate.menu',
	'realestate.contact-us',
	'realestate.Inicio',
	'realestate.prueba'
])
//.constant("Api","http://localhost:81/api/")
.constant("Api","https://nuestracasa.com.co/service/")
.value('_', window._)

.run(function($ionicPlatform,$rootScope) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)

		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
	$rootScope.$on('$stateChangeStart', function()
	{
		var usuario = localStorage["usuario"];
		if(usuario == undefined || usuario == null || usuario == "" || usuario == 'undefined'){
			$rootScope.Logeado = false;
		}
		else{
			$rootScope.Logeado = true;
			var datauser = JSON.parse(usuario);
			$rootScope.usuario = datauser.email;
		}
	});

	$rootScope.Filtros = {
		model:{
		idMunicipio:"all",
		tipoauncio: "all",
		tipoInmueble:"all",
		estadoInmueble:"all",
		zona:"all",
		barrio:"all",
		valorDesde:"all",
		valorHasta:"all",
		banos:"all",
		habitaciones:"all",
		tiempoConstruido:"all",
		fechaDesde:"all",
		fechaHasta:"all"},
		filtrar: false
	};
})

.config(function($urlRouterProvider) {
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/Inicio');
});
