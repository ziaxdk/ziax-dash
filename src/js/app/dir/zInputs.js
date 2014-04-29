module.directive('zInputNew', ['const', function (Const) {
  return {
    restrict: 'A',
    scope: {
      context: '='
    },
    require: 'ngModel',
    replace: true,
    template:
      '<div>' +
        '<div class="form-group" ng-class="{\'has-error\': formInput.q.$invalid }">' +
          '<input type="text" class="form-control" placeholder="Enter something..." name="q" ng-model="form.q" required>' +
        '</div>' +
        '<ul class="list-group facets clearfix">' +
          '<li ng-repeat="type in types">' +
            '<button type="button" class="btn btn-sm" ng-class="{\'btn-primary\': clickType === type, \'btn-default\': meta.type !== type}" ng-click="setContext(type)">{{type}}</button>' +
          '</li>' +
        '</ul>' +
      '</div>',
    link: function(scope, element, attrs, ngModelCtrl) {
      scope.form = { };
      scope.types = Const.types;
      scope.$watch('form.q', updateModel);
      
      scope.setContext = function(ctx) {
        if (ctx === scope.clickType) {
          scope.context = scope.clickType = undefined;
          parseContext(scope.form.q);
        }
        else {
          scope.context = scope.clickType = ctx;
        }
      };

      // ngModelCtrl.$render = function() {
      //   //Nothing to render...
      // };

      function updateModel(val) {
        ngModelCtrl.$setViewValue(val);
        // ngModelCtrl.$render();
        //   //Nothing to render...
        if (!scope.clickType)
          parseContext(val);
      }

      function parseContext(val) {
        if (/undefined/.test(val))
        {
          scope.context = undefined;
        }
        else if (/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(val)) {
          scope.context = 'place';
        }
        else if (/^https?\:\/\//.test(val)) {
          scope.context = 'link';
          // setType('link');
          // delayScraper.run(function () {
          //   $http.get('/api/scrape', { params: { q: encodeURIComponent(q) } }).success(function (data) {
          //     $scope.form.header = data.title1 || data.title2 || data.title3; //link;
          //     $scope.form.content = '"' + $scope.form.q + '":' + $scope.form.q + '\n\n' + (data.desc1 || data.desc2 || data.desc3);
          //   });
          // });
        }
        else
        {
          scope.context = 'article';
        }
      }
    }
  };
}]);