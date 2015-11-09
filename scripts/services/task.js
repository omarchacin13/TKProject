angular
  .module('TaskRabbit')
  .factory('Task', Task);

Task.$inject = [
  'FURL',
  '$firebaseArray',
  '$firebaseObject',
  'Auth',
  '$q'];

/* @ngInject */
function Task(FURL, $firebaseArray, $firebaseObject, Auth, $q) {
  var ref     = new Firebase(FURL);
  var tasks   = $firebaseArray(ref.child('tasks'));
  var user    = Auth.user;
  var service = {
    test: test,
    all : tasks,

    getTask: function (taskId) {
      return $firebaseObject(ref.child('tasks').child(taskId));
    },

    createTask: function (task) {
      task.datetime = Firebase.ServerValue.TIMESTAMP;
      console.log('Creating ', task);
      return tasks.$add(task);
    },

    editTask: function (task) {
      console.log('Editing ', task);
      var t = this.getTask(task.$id);
      return t.$save({title: task.title, description: task.description, total: task.total});
    },

    cancelTask: function (taskId) {
      var d = $q.defer()
      var t = this.getTask(taskId);
      console.log('t  ', t);
      ref.child('tasks').child(taskId).set({
        //TODO: Fix this
        /*datetime: t.datetime,
         description: t.description,
         gravatar: t.gravatar,
         name: t.name,
         poster: t.poster,
         status: t.status,
         title: t.title,
         total: t.total*/
        status: "Cancelled"
      });
      d.resolve();
      return d.promise;
    },

    isCreator: function (task) {
      return (user && user.provider && user.uid === task.poster);
    },

    isOpen: function (task) {
      return task.status === "open";
    }
  };

  return service;

  ////////////////

  function test() {
    console.log('This is thest ');
  }


}
