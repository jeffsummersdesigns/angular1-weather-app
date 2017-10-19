(function () {
    'use strict';
    var app = angular.module('myApp', []);

    app.controller('GetWeatherController', function ($scope, $http) {

        $scope.location = '';

        $scope.initial = function () {
            $http.jsonp('http://ipinfo.io/json?callback=JSON_CALLBACK')
            .then(function (location) {
                var lat = location.data.loc.split(',')[0]; // We get the coordinates in a string,
                var lon = location.data.loc.split(',')[1];  // so we split it and return them separately.
            

            //navigator.geolocation.getCurrentPosition(function (position) {
            //    var lat = position.coords.latitude;
            //    var lon = position.coords.longitude;

                $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=696c4bf61adb5cf64f21f54b46d6a2ef&units=imperial")
                .then(function (response) {
                    $scope.details = response.data;
                    
                }).
                error(function () {
                    $('.error').show().html("Sorry there has been an error connecting to the API");
                });

            });
        };

        $scope.initial();

        $scope.submit = function () {
            if ($scope.text) {
                $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + $scope.text + "&appid=696c4bf61adb5cf64f21f54b46d6a2ef&units=imperial")
                    .then(function (response) {
                        $scope.details = response.data;
                        console.log(response.data);
                    }).
                  error(function () {
                      $('.error').show().html("Sorry there has been an error connecting to the API");
                  });
            } else {
                $scope.initial();
            }
        };




    });//End Controller

})();//End App