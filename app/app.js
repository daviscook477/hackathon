// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.main-menu', 'starter.main-teacher', 'starter.main-student', 'starter.classes', 'starter.sessions', 'starter.session', 'starter.student', 'starter.services.f', 'firebase'])

.run(function($ionicPlatform, $rootScope, $firebaseAuth, $f) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.auth = $firebaseAuth($f.ref()); // configure an auth object
  $rootScope.authObject = $rootScope.auth.$getAuth();
  $rootScope.auth.$onAuth(function() {
    $rootScope.authObject = $rootScope.auth.$getAuth();
  });

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "app.html"
  })


  .state('app.main-menu', {
    url: "/main-menu",
    views: {
      'menuContent': {
        templateUrl: "modules/main-menu/main-menu.html",
        controller: "MainMenuCtrl"
      }
    }
  })

  .state('app.main-teacher', {
    url: "/main-teacher",
    views: {
      'menuContent': {
        templateUrl: "modules/main-teacher/main-teacher.html"
      }
    }
  })

  .state('app.main-student', {
    url: "/main-student",
    views: {
      'menuContent': {
        templateUrl: "modules/main-student/main-student.html",
        controller: "MainStudentCtrl"
      }
    }
  })

  .state('app.classes', {
    url: "/classes",
    views: {
      'menuContent': {
        templateUrl: "modules/classes/classes.html",
        controller: "ClassesCtrl"
      }
    }
  })

  .state('app.student', {
    url: "/student",
    views: {
      'menuContent': {
        templateUrl: "modules/student/student.html",
        controller: "StudentCtrl"
      }
    }
  })

  .state('app.session', {
    url: '/session:id',
    views: {
      'menuContent': {
        templateUrl: "modules/session/session.html",
        controller: "SessionCtrl"
      }
    }
  })

  .state('app.sessions', {
    url: "/sessions:id",
    views: {
      'menuContent': {
        templateUrl: "modules/sessions/sessions.html",
        controller: "SessionsCtrl"
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main-menu');
});
