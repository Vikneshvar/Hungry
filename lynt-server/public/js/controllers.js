angular.module('my_ctrls', [])

.controller('MainCtrl', function($scope){
    $scope.test = 'Hello world!';
})

.controller('DemoCtrl', function($scope){

})

.controller('LogoCtrl', function($scope){
  $scope.animateLogo = function(){
    setTimeout(function(){
      var elements = document.getElementsByClassName("transitions");
      for(var i = 0, length = elements.length; i < length; i++){
        elements[i].style.borderRadius= '50%';
      }
    }, 100);
  }
});
