angular
  .module('TaskRabbit')
  .controller('AuthController', AuthController);

AuthController.$inject = [
  '$scope',
  '$state',
  'Auth'
];

/* @ngInject */
function AuthController($scope,
                        $state,
                        Auth) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.register = register;


  activate();

  ////////////////

  function activate() {
  }

  function register(user) {
    Auth.register(user)
      .then(function () {
        console.log('Register successfully ');
        $state.go('/')
      }, function (error) {
        console.log('error ', error);
      });
  }

  $scope.login = function (user) {

    Auth.login(user)
      .then(function () {
        console.log('success', "Logged in successfully");
        $state.go('/')
      }, function (err) {
        console.log('error', "Oops! Something went wrong.");
        // errMessage(err);
      });
  };

  $scope.changePassword = function (user) {

    Auth.changePassword(user)
      .then(function () {

        // Reset form
        $scope.user.email   = '';
        $scope.user.oldPass = '';
        $scope.user.newPass = '';

        console.log('success', "Password changed successfully");
      }, function (err) {
        console.log('error', "Oops! Something went wrong.");
        // errMessage(err);
      });
  };


}