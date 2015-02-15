angular.module('starter.sessions', ['starter.services.f', 'starter.services.random-an'])

.controller('SessionsCtrl', function($scope, $state, $stateParams, $firebaseAuth, $firebase, $f, $ionicModal, $ionicPopup, randomAN) {

  var rootRef = $f.ref();

  var id = $stateParams.id;

  if ($scope.auth.$getAuth() == null) {
    // when you are at this state, the user is logged in
    var userRef = rootRef.child("users").child($scope.auth.$getAuth().uid).child("classes").child(id).child("sessions");

    var sync = $firebase(userRef);

    $scope.sessions = sync.$asArray();
  }

  $scope.auth.$onAuth(function(authData) {
    // when you are at this state, the user is logged in
    var userRef = rootRef.child("users").child($scope.auth.$getAuth().uid).child("classes").child(id).child("sessions");

    var sync = $firebase(userRef);

    $scope.sessions = sync.$asArray();
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

  var lock = false;

  var numCB = 1;

  var curCB = 0;

  var randCB = function(snapshot) {
    curCB++;
    var gotData = false;
    var data = snapshot.val();
    if (data != null) {
      gotData = true;
    }
    if (!gotData && !lock) { // use locks so only one session is made
      lock = true;
      $f.ref().child("live").child(snapshot.key()).set(
        {
          start: Firebase.ServerValue.TIMESTAMP,
          end: null,
          participants: {},
          questions: {}
        }
      );
      $ionicPopup.alert({title: ("Session created with id: " + snapshot.key() + ". Give this id to the students such that they may connect to your class")}).then(function() {
        $state.go('app.session', {id:snapshot.key()});
      });
    } else {
      if (curCB == numCB) {
        tryOpenSession();
      }
    }
  };


  var foundSessionId = false;

  var tryOpenSession = function() {
    lock = false;
    for (var i = 0; i < numCB; i++) { // we send out three random session ids to hopefully have one that isn't currently used
      $f.ref().child("live").child(randomAN.getRandomAN(5)).on("value", randCB);
    }
  }


  $scope.openSession = function() {
    //$scope.modal.name.show();

    // this process of creating sessions should be future proofed - it isn't now
    tryOpenSession();
  };

});
