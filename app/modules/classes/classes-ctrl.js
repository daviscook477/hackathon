angular.module('starter.classes', ['starter.services.f'])

.controller('ClassesCtrl', function($scope, $state, $firebaseAuth, $ionicModal, $ionicPopup, $firebase, $f) {

  var rootRef = $f.ref();

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

  $scope.modal = {
    class0: null,
    del: null
  };

  $scope.input = {
    name: null,
    del_name: null
  };

  // create the modal for login
  $ionicModal.fromTemplateUrl('modules/classes/class-add-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal.class0 = modal;
  });

  // create the modal for login
  $ionicModal.fromTemplateUrl('modules/classes/class-del-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal.del = modal;
  });

  $scope.hideDeleteModal = function() {
    $scope.modal.del.hide();
  };

  $scope.doDelete = function() {
    var objCheck = {title: $scope.input.del_name};
    for (var i = 0; i < $scope.classes.length; i++) {
      if ($scope.classes[i].title == objCheck.title) {
        $scope.classes.$remove(i);
        break;
      }
    }
    $scope.hideDeleteModal();
    $scope.input.del_name = null;
  };

  $scope.deleteClass = function() {
    $scope.modal.del.show();
  }

  $scope.goClass = function(class0) {
    $state.go('app.sessions', {id:class0.$id});
  };

  $scope.hideClassModal = function() {
    $scope.modal.class0.hide();
  }

  $scope.createClass = function() {
    var toPush = {
      title: $scope.input.title
    };
    $scope.classes.$add(toPush);
    $scope.hideClassModal();
    $scope.input.title = null;
  }

  $scope.addClass = function() {
    $scope.modal.class0.show();
  }

});
