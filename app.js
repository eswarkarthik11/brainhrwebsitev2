'use strict';

// Declare app level module which depends on views, and components
angular.module('homePageApp', [
    'ngRoute','homePageApp.login'])
.controller('homeController',function ($scope) {
    //Initializing login button class
    $scope.loginStatus="";

    //Initializing Index page main div element visibility
    $scope.homeVisibility="show";
    $scope.loginPageVisibility="hidden";

    //Inializing quotes classes
    $scope.quote1Class="shownQuote";
    $scope.quote2Class="hiddenQuote";
    $scope.quote3Class="hiddenQuote";

    $scope.homeVisibilityHide = function () {
        $scope.homeVisibility="hidden";
        $scope.loginPageVisibility="show";
        $scope.loginStatus="active";
    }
    $scope.homeVisibilityShow = function () {
        $scope.homeVisibility="show";
        $scope.loginPageVisibility="hidden";
        $scope.loginStatus="";
    }
    $scope.moveQuote = function(){
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

/*Smooth scroll effect*/
$(document).ready(function(){
    $('a[href^="#nav"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});
