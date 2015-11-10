angular
  .module('TaskRabbit')
  .controller('TaskController', TaskController);

TaskController.$inject = [
  '$scope',
  '$state',
  '$stateParams',
  'toaster',
  'Task',
  'Auth'
];

/* @ngInject */
function TaskController($scope,
                        $state,
                        $stateParams,
                        toaster,
                        Task,
                        Auth) {




  $scope.createTask = function() {
    $scope.task.status = 'open';
    $scope.task.gravatar = Auth.user.profile.gravatar;
    $scope.task.name = Auth.user.profile.name;
    $scope.task.poster = Auth.user.uid;

    Task.createTask($scope.task).then(function(ref) {
      toaster.pop('success', 'Task created successfully.');
      $scope.task = {title: '', description: '', total: '', status: 'open', gravatar: '', name: '', poster: ''};
      $state.go('/browse/' + ref.key());
    });
  };

  $scope.editTask = function(task) {
    console.log('task in controller ', task);
    Task.editTask(task).then(function() {
      toaster.pop('success', "Task is updated.");
    });
  };


  /*/!* jshint validthis: true *!/
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
  }*/


}