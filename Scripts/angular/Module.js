/// <reference path="../angular.min.js" />
var app = angular.module("Emp", ['ngRoute', 'ngStorage']);
app.config(function ($routeProvider) {
    $routeProvider
    .when('/welcome', {
        templateUrl: "Login.html"
    })
    .when('/home', {
        templateUrl: "home.html"
    })
    .when("/login", {
        templateUrl: "Login.html"
    })
    .when("/add", {
        templateUrl: "add.htm1"
    })
    .otherwise({ redirectTo: "/welcome" });
});
