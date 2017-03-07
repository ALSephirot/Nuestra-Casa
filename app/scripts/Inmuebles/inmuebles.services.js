(function() {
	'use strict';

	angular
		.module('realestate.inmuebles')
		.factory('InmueblesService', InmueblesService);

	InmueblesService.$inject = ['$http', '$q', '_','Api','$rootScope'];

	/* @ngInject */
	function InmueblesService($http, $q, _, Api,$rootScope) {
		var service = {
			getInmuebles: getInmuebles,
            getTipoAnuncio: getTipoAnuncio,
            getInmueblesFilter: getInmueblesFilter,
            getMunicipios: getMunicipios,
            getDepartamentos: getDepartamentos,
            getTipoInmuebles: getTipoInmuebles,
            getEstadoInmuebles: getEstadoInmuebles,
            getZonas: getZonas,
            getBanos: getBanos,
            getHabitaciones: getHabitaciones,
            getAntiguedad: getAntiguedad,
            getInmueble: getInmueble,
            getPictures: getPictures,
            postSaveInmueble: postSaveInmueble,
            EnviarContacto: EnviarContacto
		};
		return service;

		// ***************************************************************

		function getInmuebles(Pagina) {
			var promesa = new Promise(function (resolve, reject) {
                var data = $rootScope.Filtros.model;

                if($rootScope.Filtros.filtrar){

                    var url = Api + "inmuebles/"+Pagina;

                    $http.post(url,data,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                    .success(function (data, status, headers, config) {
                        resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        reject(data);
                    });
                }
                else{
                    var url = Api + "inmuebles/"+Pagina;

                    $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                    .success(function (data, status, headers, config) {
                        resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        reject(data);
                    });
                }

                $rootScope.Filtros.filtrar = false;
            });

            return promesa;
		};
        
        function getInmueble(Id) {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "inmueble/"+Id;

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    getPictures(Id).then(function(data2){
                        data.Objeto.pictures = data2.Objeto;
                        resolve(data);
                    });
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getPictures(Id) {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "pictures/"+Id;

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getTipoAnuncio() {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "tipoAnuncio";

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getMunicipios(idDepartamento) {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "municipios/"+idDepartamento;

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getDepartamentos() {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "departamentos";

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};

        function getTipoInmuebles() {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "tipoInmueble";

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getEstadoInmuebles() {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "estadoInmueble";

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getZonas() {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "zonas";

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getHabitaciones() {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "habitaciones";

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getAntiguedad() {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "antiguedad";

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getBanos() {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "banos";

                $http.get(url,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
        
        function getInmueblesFilter(Pagina,filtros) {
            var promesa = new Promise(function (resolve, reject) {
                var url = Api + "inmuebles/"+Pagina;

                $http.post(url, filtros,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
        }
        
        function postSaveInmueble(data) {
            var promesa = new Promise(function (resolve, reject) {
                var url = Api + "InsertarInmueble";

                $http.post(url, data,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
        }

        function EnviarContacto(datos){
            var promesa = new Promise(function (resolve, reject) {
                var url = Api + "EnviarContacto";

                $http.post(url, datos,{header : {'Content-Type' : 'application/json; charset=UTF-8'}})

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
        }
	}
})();
