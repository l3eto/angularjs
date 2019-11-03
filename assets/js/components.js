app

.directive('trash', function factory() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'assets/components/trash.html',
    scope: {
      action: '&',
      data: '='
    }
  };
})  

;