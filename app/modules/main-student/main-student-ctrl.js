angular.module('starter.main-student', [])

.controller('MainStudentCtrl', function($scope, $ionicModal, $state, $timeout) {

  $scope.hello="Hello World!";

  $timeout(function() {
    $scope.hello="Goodbye World!";
  }, 3000);

  $scope.goSession = function() {
    $state.go('app.student');
  }

});
