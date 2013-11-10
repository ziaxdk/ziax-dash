// Config
module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
      templateUrl: "/html/_index.html",
      resolve: { History: ['$http', function($http) { return $http.get('/api/history'); }] },
      controller: "IndexController",
      controllerAs: "IndexCtrl"
  });
  $routeProvider.when('/new', {
      templateUrl: "/html/_new.html"
  });
  $routeProvider.when('/show/:id', {
      templateUrl: "/html/_show.html",
      resolve: { Drive: ['$route', 'RestQ', function($route, RestQ) { return RestQ.save({id: $route.current.params.id }); }] },
      controller: "ShowController",
      controllerAs: "ShowCtrl"
  });
  $routeProvider.when('/res/:q', {
      templateUrl: "/html/_result.html",
      resolve: { Drives: ['$route', 'RestQ', function($route, RestQ) { return RestQ.get({ q: $route.current.params.q }); }] },
      controller: "ResultController",
      controllerAs: "ResultCtrl"
  });
  $routeProvider.when('/404.html', {
      templateUrl: "/html/_404.html"
  });
  $routeProvider.otherwise({
      redirectTo: "/"
  });
}]);
