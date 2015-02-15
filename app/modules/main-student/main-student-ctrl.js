angular.module('starter.main-student', [])

.controller('MainStudentCtrl', function($scope, $ionicPopup, $ionicModal, $state, $timeout) {

  $scope.hello="Hello World!";

  $timeout(function() {
    $scope.hello="Goodbye World!";
  }, 3000);

  $scope.goSession = function() {
    //TODO: validate that the session exists
    //.then(function() {code goes here}
    var validated = true;
    if (validated) {
      $ionicPopup.alert({
        title: "Class found!",
      }).then(function(done) {
        $state.go('app.student');
      });
    } else {
      $ionicPopup.alert({
        title: "Class ID already taken! Try another one or add some numbers to the end of yours!"
      }).then(function(done) {

      });
    }

  }

});
