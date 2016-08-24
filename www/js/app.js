// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('newsApp', ['ionic']);

app.controller('newsController', function($scope, $http){
  // vm staat voor view-model
  var vm = this;

  // init empty news array
  vm.allNews = [];

  // loadMore function
  vm.loadMore = function() {
    var parameters = {
      id: vm.lastarticleID
    };
    $http.get('http://codedamn.com/filesCodedamn/news.php', { params: parameters }).success(function(items) {
      vm.lastarticleID = items.lastID;
      angular.forEach(items, function(item) {
        vm.allNews.push(item);
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  vm.doRefresh = function() {
    vm.allNews = [];
    $http.get('http://codedamn.com/filesCodedamn/news.php').then(function(newsData) {
      angular.forEach(newsData.data, function(newsArticle) {
        vm.allNews.push(newsArticle);
      });
      vm.lastarticleID = newsData.data.lastID;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  // http GET request on news API
  $http.get('http://codedamn.com/filesCodedamn/news.php').then(function(newsData) {
    angular.forEach(newsData.data, function(newsArticle) {
      vm.allNews.push(newsArticle);
    });
    vm.lastarticleID = newsData.data.lastID;
  });

});

// run application
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
