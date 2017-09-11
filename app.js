'use strict';

// Declare app level module which depends on views, and components
angular.module('homePageApp', [
    'ngRoute','homePageApp.login'])
.controller('homeController',function ($scope) {
    //Initializing login button class
    //$scope.loginStatus=""

    //Initializing Index page main div element visibility
    $scope.homeVisibility="show";

    //Inializing quotes classes
    $scope.quote1Class="shownQuote";
    $scope.quote2Class="hiddenQuote";
    $scope.quote3Class="hiddenQuote";

    $scope.homeVisibilityHide = function () {
        $scope.homeVisibility="hidden";
        //$scope.loginStatus='active';
    }
    $scope.homeVisibilityShow = function () {
        $scope.homeVisibility="show";
    }
    $scope.moveQuote = function(){
        $("#quote1").animate({
            left: '-100',
            opacity: '0'
        });
        $("#quote2").animate({
            left: '0',
            opacity: '1'
        });
    }
})
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/login',{
        template: "<loginpage></loginpage>"
    })}])
.component('loginpage', {
    templateUrl: "login/login.html",
    controller:"loginController"
});