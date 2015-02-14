angular.module('starter.classes', ['starter.services.f'])

.controller('ClassesCtrl', function($scope, $state, $firebaseAuth, $firebase, $f) {

  var rootRef = $f.ref();

  $scope.auth = $firebaseAuth(rootRef);

  if ($scope.auth.$getAuth() == null) {
    // when you are at this state, the user is logged in
    var userRef = rootRef.child("users").child($scope.auth.$getAuth().uid).child("classes");

    var sync = $firebase(userRef);

    $scope.classes = sync.$asArray();
  }

  $scope.auth.$onAuth(function(authData) {
    // when you are at this state, the user is logged in
    var userRef = rootRef.child("users").child($scope.auth.$getAuth().uid).child("classes");

    var sync = $firebase(userRef);

    $scope.classes = sync.$asArray();
  });

  $scope.goClass = function(class0) {
    $state.go('app.sessions', {id:class0.$id});
  };

});
