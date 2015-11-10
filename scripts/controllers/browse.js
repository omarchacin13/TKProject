angular
  .module('TaskRabbit')
  .controller('BrowseController', BrowseController);

BrowseController.$inject = [
  '$scope',
  '$stateParams',
  'toaster',
  '$firebaseArray',
  '$firebaseObject',
  'Task',
  'Auth',
  'Comment'];

/* @ngInject */
function BrowseController($scope,
                          $stateParams,
                          toaster,
                          $firebaseArray,
                          $firebaseObject,
                          Task,
                          Auth,
                          Comment) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title    = 'BrowseController';

  activate();

  ////////////////

  function activate() {
  }

  $scope.user = Auth.user;
  $scope.searchTask = '';
  $scope.tasks      = Task.all;
  $scope.signedIn = Auth.signedIn;
  $scope.listMode = true;


  if ($stateParams.taskId) {
    var task        = Task.getTask($stateParams.taskId);
    $scope.listMode = false;

    setSelectedTask(task);
  }

  function setSelectedTask(task) {
    $scope.selectedTask = task;
    // We check isTaskCreator only if user signedIn
    // so we don't have to check every time normal guests open the task
    if ($scope.signedIn()) {
      // Check if the current login user is the creator of selected task
      $scope.isTaskCreator = Task.isCreator;
      // Check if the selectedTask is open
      $scope.isOpen = Task.isOpen;
    }

    $scope.comments = Comment.comments(task.$id)
  };

  // --------------- TASK ---------------

  $scope.cancelTask = function (taskId) {
    /*var task        = Task.getTask($stateParams.taskId);*/
    Task.cancelTask(taskId).then(function () {
      toaster.pop('success', "This task is cancelled successfully.");
    });
  };

  $scope.addComment = function () {
    var comment = {
      content: $scope.content,
      name: $scope.user.profile.name,
      gravatar: $scope.user.profile.gravatar
    };

    Comment.addComment($scope.selectedTask.$id, comment)
      .then(function() {
          $scope.content = '';
      });
  }


}