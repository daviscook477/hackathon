angular.module('starter.services.random-an',
  [])

.factory('randomAN', function() {

  var possible = "abcdefghijklmnopqrstuvwxz123456789";
  var possibleArray = [];
  for (var i = 0; i < possible.length; i++) {
    possibleArray.push(possible.charAt(i));
  }

  return {
    getRandomAN: function(length) {
      var toReturn = "";
      for (var i = 0; i < length; i++) {
        var index = Math.floor(Math.random() * possible.length);
        if (index > 35) {
          index = 35;
        }
        toReturn += possible.charAt(index);
      }
      return toReturn;
    }
  }

});
