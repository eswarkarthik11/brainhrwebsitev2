'use strict';

angular.module('homePageApp.login', ['ngResource','ngCookies'])


    .controller('loginController',function($scope,jsonService,check,base64) {
        $scope.homeVisibilityToggle="hidden";
        $scope.signin = function () {

            jsonService.letData(function(data){
                //console.log(data.password);
                // console.log($scope.password)
                check.validate(base64.encode(data.password),base64.encode($scope.password))
            });
        }
    })

    // To get data form json file ( uname and password)

    .factory('jsonService', function($resource) {
        return $resource('package.json',{ }, {
            letData: {method:'GET', isArray: false}
        });
    })


        // service to check for passwords and store cookie.

    .service('check', function($window,$cookieStore){
        this.validate = function(a,b){
            $cookieStore.put('passCookie',b);
            if(a === $cookieStore.get('passCookie'))
            {
                console.log($cookieStore.get('passCookie'));
                var url = "http://" + $window.location.host + "/BrainHr/app/#!admin";
                $window.location.href= url;
            }
            else
            {
                alert("login failed");
            }
        }
    })


        // service for encrypting the password.

    .service('base64',function(){

        /*this.encode = function (input) {
            input = input + '1234';

            return input;
        }*/
        this.encode = function (input) {
            var  keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        }


    })
