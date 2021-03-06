var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);
weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
        
    })
    .when('/forecast',{
        templateUrl : 'pages/forecast.htm',
        controller : 'forecastController'
    })
        .when('/forecast/:days',{
        templateUrl : 'pages/forecast.htm',
        controller : 'forecastController'
    })
    
    
});

weatherApp.service('cityService',function(){
                  this.city="New York,NY";
                   
                   });
 weatherApp.controller('homeController',['$scope','cityService',function($scope, cityService){
     
     $scope.city = cityService.city;
     $scope.$watch('city', function(){
         
         cityService.city= $scope.city;
     });
 }]);
weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService',function($scope,$resource,$routeParams, cityService){
     
    
     $scope.city= cityService.city;
        $scope.days = $routeParams.days || 2;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback : "JSON_CALLBACK"}, {get : { method : "JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q:$scope.city, cnt: $scope.days, appid: "0178dc4c3506656331c9d6e475ee9686", units: "metric"});
    $scope.convertToDate=function(dt)
    {
        return new Date(dt*1000);
    };
    console.log($scope.weatherResult);
    
    
    
 }]);

