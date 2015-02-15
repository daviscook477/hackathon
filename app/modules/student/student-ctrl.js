angular.module('starter.student', ['starter.services.f'])

.controller('StudentCtrl', function($scope, $state, $stateParams, $firebaseAuth, $firebase, $f, $ionicModal) {

  $scope.exitSession = function() {
    //TODO: exit class code
    $state.go('app.main-student')
  }

});
