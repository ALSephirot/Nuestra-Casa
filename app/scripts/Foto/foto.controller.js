(function() {
	'use strict';

	angular
		.module('realestate.SubirImagen')
		.controller('SubirFotoController', SubirFotoController)
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        scope.$apply(function () {
                            scope.fileread = changeEvent.target.files[0];
                            // or all selected files:
                            // scope.fileread = changeEvent.target.files;
                        });
                    });
                }
            }
        }]);

	SubirFotoController.$inject = ['$stateParams','$state','ionicToast','$scope','Api'];

	/* @ngInject */
	function SubirFotoController($stateParams,$state,ionicToast,$scope,Api) {
		if(localStorage["usuario"] == undefined || localStorage["usuario"] == ""){
			var usuario = {
				email:""
			}
		} 
		else{
			var usuario = JSON.parse(localStorage["usuario"]);
		}
        var fileURL = "";
		var vm = angular.extend(this, {
			
			model:{
				FotoCapturada:""
			},
			TomarFoto: TomarFoto,
			ObtenerFoto: ObtenerFoto,
            SubirFoto: SubirFoto
		});

		(function activate() {
		})();
			
			function TomarFoto(){
				navigator.camera.getPicture(onSuccess, onFail, { quality: 50,destinationType: Camera.DestinationType.FILE_URI });
			}

            function ObtenerFoto(){
                navigator.camera.getPicture(onSuccess, onFail, { quality: 50,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM });
            }

			function SubirFoto(){
				var algo = $scope.fileread;
                var win = function (r) {
                    ionicToast.show('Foto subida con exito', 'bottom', false, 2000);
                    console.log("Code = " + r.responseCode);
                    console.log("Response = " + r.response);
                    console.log("Sent = " + r.bytesSent);
                }

                var fail = function (error) {
                    alert("An error has occurred: Code = " + error.code);
                    console.log("upload error source " + error.source);
                    console.log("upload error target " + error.target);
                }

                var options = new FileUploadOptions();
                options.fileKey = "imagenP1";
                options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                options.mimeType = "image/JPG";

                var params = {};
                params.email = usuario.email;

                options.params = params;

                var ft = new FileTransfer();
                ft.upload(fileURL, encodeURI('http://nuestracasa.com.co/service/GuardarFoto.php?id=' + $stateParams.inmuebleId), win, fail, options);
                
			}

            

            function onSuccess(imageURI) {
                vm.model.FotoCapturada = imageURI;
                fileURL = imageURI;
                $scope.$apply();
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
			
	}
})();


