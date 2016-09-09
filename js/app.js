var App = angular.module('App', ['wu.masonry']);
App.controller('feed-list', function($scope, $http) {
	$http.get('data/feed.json').
    success(function(data) {
		$scope.allfeed = data;
		$scope.status = true;
		$scope.loadMore = function() {
			if($scope.status==true){
				$scope.status=false;
				// $scope.loadAct();
			}
		};
		$scope.loadAct = function() {
			var savedata = data.feeds;
			for(var j = 0; j < savedata.length; j++) {
				data.feeds.push(savedata[j]);
			}
			$scope.status=true;
			$scope.allfeed = data.feeds;
		};
    });
});

App.directive('scrollTrigger', function($window) {
    return {
        link : function(scope, element, attrs) {
            var offset = parseInt(attrs.threshold) || 0;
            var e = jQuery(element[0]);
            var doc = jQuery(document);
            angular.element(document).bind('scroll', function() {
                if (doc.scrollTop() + $window.innerHeight + offset > e.offset().top) {
                    scope.$apply(attrs.scrollTrigger);
                }
            });
        }
    };
});
