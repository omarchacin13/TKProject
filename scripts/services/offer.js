angular
  .module('TaskRabbit')
  .factory('Offer', Offer);

Offer.$inject = [
  '$firebaseObject',
  '$firebaseArray',
  'FURL',
  '$q',
  'Auth'];

/* @ngInject */
function Offer($firebaseObject,
               $firebaseArray,
               FURL,
               $q,
               Auth) {

  var ref     = new Firebase(FURL);
  var user    = Auth.user;
  var service = {
    offers   : offers,
    makeOffer: makeOffer,
    isOffered: isOffered
  };

  return service;

  ////////////////

  function offers(taskId) {
    return $firebaseArray(ref.child('offers').child(taskId))
  }

  function makeOffer(taskId, offer) {
    var task_offers = offers(taskId);

    if (task_offers) {
      return task_offers.$add(offer);
    }
  }

  function isOffered(taskId) {
    if (user && user.provider) {
      var d = $q.defer();

      $firebaseArray(ref.child('offers').child(taskId).orderByChild("uid")
        .equalTo(user.uid))
        .$loaded()
        .then(function (data) {
          d.resolve(data.length > 0);
        }, function (error) {
          d.reject(error)
        });

      return d.promise;

    }
  }


}
