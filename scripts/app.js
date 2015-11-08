'use strict';

var app = angular
  .module('TaskRabbit', [
    'firebase',
    'ui.router',
    'ngAnimate',
    'ngResource',
    'toaster'
  ])
  .constant('FURL', 'https://tr-project.firebaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('/', {
        url: "/",
        templateUrl: "views/main.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: 'AuthController as authCtrl'
      })
      .state('register', {
        url: "/register",
        templateUrl: "views/register.html",
        controller: 'AuthController as authCtrl'
      })
      .state('post', {
        url: "/post",
        templateUrl: "views/post.html",
        controller: 'TaskController as taskCtrl'
      })
      .state('edit', {
        url: "/edit",
        templateUrl: "views/edit.html",
        controller: "TaskController as taskCtrl",
        params: {
          taskId: null
        }
      })
      .state('browse', {
        url: "/browse",
        templateUrl: "views/browse.html",
        controller: 'TaskController as taskCtrl'
      })
  });
