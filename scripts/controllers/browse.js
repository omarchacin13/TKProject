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
  'Auth'];

/* @ngInject */
function BrowseController($scope,
                          $stateParams,
                          toaster,
                          $firebaseArray,
                          $firebaseObject,
                          Task,
                          Auth) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title    = 'BrowseController';

  activate();

  ////////////////

  function activate() {
  }


  $scope.searchTask = '';
  $scope.tasks      = Task.all;
  console.log('taks ', Task.test);


  $scope.signedIn = Auth.signedIn;

  $scope.listMode = true;
  console.log('stateParams ', $stateParams.taskId);


  if ($stateParams.taskId) {
    console.log('Tasks ', Task);
    var task        = Task.getTask($stateParams.taskId);
    console.log('task object ', task);
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
  };

  // --------------- TASK ---------------

  $scope.cancelTask = function (taskId) {
    /*var task        = Task.getTask($stateParams.taskId);*/
    Task.cancelTask(taskId).then(function () {
      toaster.pop('success', "This task is cancelled successfully.");
    });
  };


}