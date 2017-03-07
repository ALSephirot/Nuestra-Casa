(function() {
	'use strict';

	angular
		.module('realestate.login')
		.factory('loginService', loginService);

	loginService.$inject = ['$http','_','Api'];

	/* @ngInject */
	function loginService($http,_,Api) {
		var service = {
			Login: getLogin
		};
		return service;
		
		function getLogin(datos) {
			var promesa = new Promise(function (resolve, reject) {
                var url = Api + "login";

                $http.post(url,datos)

                .success(function (data, status, headers, config) {
                    resolve(data);
                })
                .error(function (data, status, headers, config) {
                    reject(data);
                });
            });

            return promesa;
		};
	}
})();
