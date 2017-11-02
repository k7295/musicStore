'use strict';


/**
 * @ngdoc overview
 * @name appWebApp
 * @description
 * # appWebApp
 *
 * Main module of the application.
 */
angular
  .module('appWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/album', {
        templateUrl: 'views/albums.html',
        controller: 'AlbumCtrl',
        controllerAs: 'vm'
      })
      .when('/song', {
        templateUrl: 'views/songs.html',
        controller: 'SongCtrl',
        controllerAs: 'vm'
      })
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

