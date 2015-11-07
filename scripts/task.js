angular
  .module('TaskRabbit')
  .controller('TaskController', TaskController);

TaskController.$inject = [
  '$scope',
  'FURL',
  '$firebaseArray',
  '$firebaseObject',
  '$state'
];

/* @ngInject */
function TaskController($scope,
                        FURL,
                        $firebaseArray,
                        $firebaseObject,
                        $state) {
  /* jshint validthis: true */
  var vm = this;
  var ref = new Firebase(FURL);
  var fbTasks = $firebaseArray(ref.child('tasks'));

  vm.tasks = fbTasks;

  vm.activate = activate;
  vm.postTask = postTask;


  activate();

  ////////////////

  function activate() {
  }

  function postTask(task) {
    fbTasks.$add(task);
    $state.go('browse')
  }


}