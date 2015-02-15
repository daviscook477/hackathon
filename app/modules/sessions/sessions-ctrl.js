angular.module('starter.sessions', ['starter.services.f'])

.controller('SessionsCtrl', function($scope, $state, $stateParams, $firebaseAuth, $firebase, $f, $ionicModal) {

  var rootRef = $f.ref();

  var id = $stateParams.id;

  if ($scope.auth.$getAuth() == null) {
    // when you are at this state, the user is logged in
    var userRef = rootRef.child("users").child($scope.auth.$getAuth().uid).child("classes").child(id);

    var sync = $firebase(userRef);

    $scope.me = sync.$asObject();
  }

  $scope.auth.$onAuth(function(authData) {
    // when you are at this state, the user is logged in
    var userRef = rootRef.child("users").child($scope.auth.$getAuth().uid).child("classes").child(id);

    var sync = $firebase(userRef);

    $scope.me = sync.$asObject();
  });

  $scope.input = {
    name: null
  };

  $scope.modal = {
    name: null
  };

  // create the modal for login
  $ionicModal.fromTemplateUrl('modules/sessions/name-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal.name = modal;
  });

  $scope.onNameObtain = function() {
    //TODO: validate name
    // create the session on the firebase
    $scope.modal.name.hide();
    $state.go('app.session');

  }

  $scope.hideNameModal = function() {
    $scope.modal.name.hide();
  }


  $scope.openSession = function() {
    $scope.modal.name.show();
  };

});
