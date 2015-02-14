angular.module('starter.services.f',
  [])

.factory('$f', ['$q', function($q) {
  var main = new Firebase("https://echo0.firebaseio.com");
  // define the $f object
  function $f() {

  }
  // add some methods to its prototype
  $f.prototype = {
    ref: function() {
      return main;
    },
    authID: function() {
      var curAuth = main.getAuth();
      if (curAuth === null) {
        return null;
      } else {
        return curAuth.uid;
      }
    },
    //User manipulation methods
    $logout: function() {
      main.unauth();
    },
    $login: function(user) {
      var promise = $q.defer(); // promises. Woot! We have to return a promise because we don't know when the firebase will finish authenticating the user.
      main.authWithPassword(user, function(error, authData) { //Login to the firebase
        if (error) { // they couldn't login
          promise.reject(error);
        } else { // they logged in sucessfully
          promise.resolve(authData);
        }
      });
      return promise.promise;
    },
    // signs a user into the firebase. Returns a promise that tells when it completes and if it was sucessful or not
    $signup: function(user) {
      var promise = $q.defer(); //Create a promise that will be returned to the user when we know if the firebase created the user
      main.createUser(user, function(error) { //Create the user
        if (error === null) { //The user was successfully created
          promise.resolve(); //Resolve the promise
        } else { //They did not sucessfully signup
          promise.reject(error); //Reject the promise with an error
        }
      });
      return promise.promise;
    }
  }
  // return an instance of $f
  return new $f();
}]);
