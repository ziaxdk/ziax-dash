module.controller('NewController', ['$scope', '$http', 'RestDrive', 'Delayer', '$route', function ($scope, $http, RestDrive, Delayer, $route) {
  var lisLink, lisPlace, lisArticle;
  var _t = this, delayScraper = new Delayer(2000);
  var initQ = $route.current.params.q;

  _t.form = {
    onlyAuth: false,
    type: 'article'
  };
  _t.bigMap = false;
  _t.mapIcon = 'cutlery';

  if (angular.isDefined(initQ) && initQ) {
    _t.form.q = initQ;
  }



  $scope.$watch(function () { return _t.form.q; }, function (q) {
    if (!q) return;
    if (lisLink) lisLink();
    if (lisPlace) lisPlace();
    if (lisArticle) lisArticle();
    if (/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(q)) {
      _t.form.type = 'place';
      _t.form.header = null;
      lisPlace = $scope.$watch(function () { return _t.form.q; }, function (n) { _t.form.location = n; });
    }
    else if (/^https?\:\/\//.test(q)) {
      _t.form.type = 'link';
      lisLink = $scope.$watch(function () { return _t.form.q; }, function (n) { _t.form.url = n; });
      delayScraper.run(function () {
        $http.get('/api/scrape', { params: { q: encodeURIComponent(q) } }).success(function (data) {
          _t.form.header = data.title1 || data.title2 || data.title3; //link;
          _t.form.content = '"' + _t.form.url + '":' + _t.form.url + '\n\n' + (data.desc1 || data.desc2 || data.desc3);
        });
      });
    }
    else {
      _t.form.type = 'article';
      lisArticle = $scope.$watch(function () { return _t.form.q; }, function (n) { _t.form.header = n; });
    }
  });

  // "Link to Wikipedia":http://www.wikipedia.org
  _t.submit = function () {
    // console.log(_t.form);
    // return;
    if ($scope.theForm.$invalid) return;
    var obj = {
      header: _t.form.header,
      content: _t.form.content,
      url: _t.form.url,
      type: _t.form.type,
      location: _t.form.location,
      tags: _t.form.tags ? _t.form.tags.split(' ') : [],
      onlyAuth: _t.form.onlyAuth,
      code: _t.form.code
    };

    // console.log(obj);
    RestDrive.save(obj);
  };
}]);
