angular.module('starter.main-menu', [])

.controller('MainMenuCtrl', function($scope, $ionicModal, $timeout, $state) {

  $scope.goStudent = function() {
    $state.go('app.main-student');
  };

  $scope.goTeacher = function() {
    $state.go('app.main-teacher')
  };

});
