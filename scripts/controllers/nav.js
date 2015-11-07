'use strict';

app.controller('NavController', function($scope, $location, toaster, Auth) {

  $scope.currentUser = Auth.user;
  console.log('sdsjksdkjds ', $scope.currentUser);
  $scope.signedIn = Auth.signedIn;

  $scope.logout = function() {
    Auth.logout();
    toaster.pop('success', "Logged out successfully");
    $location.path("/");
  };

});