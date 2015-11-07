'use strict';

var app = angular
  .module('TaskRabbit', [
    'firebase',
    'ui.router'
  ])
  .constant('FURL', 'https://trproject.firebaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('/', {
        url: "/",
        templateUrl: "views/main.html"
      })
      .state('post', {
        url: "/post",
        templateUrl: "views/post.html",
        controller: 'TaskController as taskCtrl'
      })
      .state('edit', {
        url: "/edit",
        templateUrl: "views/edit.html"
      })
      .state('browse', {
        url: "/browse",
        templateUrl: "views/browse.html",
        controller: 'TaskController as taskCtrl'
      })
  });
