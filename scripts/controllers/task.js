angular
  .module('TaskRabbit')
  .controller('TaskController', TaskController);

TaskController.$inject = [
  '$scope',
  'FURL',
  '$firebaseArray',
  '$firebaseObject',
  '$state',
  '$stateParams',
  'toaster'
];

/* @ngInject */
function TaskController($scope,
                        FURL,
                        $firebaseArray,
                        $firebaseObject,
                        $state,
                        $stateParams,
                        toaster) {

  /* jshint validthis: true */
  var vm      = this;
  var taskId  = $stateParams.taskId;
  var ref     = new Firebase(FURL);
  var fbTasks = $firebaseArray(ref.child('tasks'));

  vm.tasks      = fbTasks;
  vm.activate   = activate;
  vm.postTask   = postTask;
  vm.updateTask = updateTask;

  fbTasks.$loaded()
    .then(function (data) {
      //Load the data here
    });


  activate();

  if (taskId) {
    vm.selectedTask = getTask(taskId);
  }

  function getTask(taskId) {
    return $firebaseObject(ref.child('tasks').child(taskId))
  }

  ////////////////

  function activate() {
  }

  function postTask(task) {
    fbTasks.$add(task);
    toaster.pop('success', "Task created");
    $state.go('browse')
  }

  function updateTask(task) {
    vm.selectedTask.$save(task);
    toaster.pop('success', "Task is updated");
    $state.go('browse');
  }


}