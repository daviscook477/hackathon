angular.module('starter.main-teacher', ['starter.services.f'])

.controller('MainTeacherCtrl', function($scope, $ionicModal, $rootScope, $state, $timeout, $firebaseAuth, $f) {

  // intialize the input containers to empty
  $scope.resetInput = function() {
    $scope.input = {
      login: {
        email: null,
        password: null
      },
      signup: {
        email: null,
        password: null
      }
    };
  };
  $scope.resetInput();
  $scope.modal = {
    login: null,
    signup: null
  };

  $scope.defaults = {
    login: {
      email: "Email",
      password: "Password"
    },
    signup: {
      email: "Email",
      password: "Password"
    }
  };

  // create the modal for login
  $ionicModal.fromTemplateUrl('modules/main-teacher/login-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal.login = modal;
  });
  // create the modal for signup
  $ionicModal.fromTemplateUrl('modules/main-teacher/signup-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal) {
    $scope.modal.signup = modal;
  });
  $scope.showLoginModal = function() {
    $scope.modal.login.show();
  };
  $scope.hideLoginModal = function() {
    $scope.modal.login.hide();
  };
  $scope.showSignupModal = function() {
    $scope.modal.signup.show();
  };
  $scope.hideSignupModal = function() {
    $scope.modal.signup.hide();
  };
  $scope.doLogout = function() {
    $scope.auth.$unauth();
  };
  $scope.doLogin = function() {
    var user = {
      email: $scope.input.login.email,
      password: $scope.input.login.password
    };
    $scope.auth.$authWithPassword(user).then(function(authData) {
      $scope.input.login = { // when user is loggin sucessfully reset the form
        email: null,
        password: null
      };
      console.log("login sucesful");
      console.log(authData.uid);
      $state.go('app.classes');
    });
    $scope.hideLoginModal();
  };
  $scope.doSignup = function() {
    var user = {
      email: $scope.input.signup.email,
      password: $scope.input.signup.password
    }
    $scope.auth.$createUser(user).then(function() { // create the user
      $scope.input.signup = { // when user is created sucessfully reset the form
        email: null,
        password: null
      };
      console.log("signup sucesful");
    });
    $scope.hideSignupModal();
  };

});
