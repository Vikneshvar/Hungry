angular.module('my_ctrls', [])

.controller('MainCtrl', function($scope, $location){
    $scope.test = 'Hello world!';
})

.controller('DemoCtrl', function($scope){

})

.controller('MerchCtrl', function($scope){

})

.controller('LoginCtrl', function($scope, $state){
  $scope.login = function(){

  }

  $scope.to_signup = function(){
    $state.go('merchant.signup');
  }
})

.controller('SignupCtrl', function($scope, $state){
  $scope.signup = function(){

  }
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
