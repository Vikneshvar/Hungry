angular.module('my_ctrls', [])

.controller('MainCtrl', function($scope, $state){
    $scope.test = 'Hello world!';

    $scope.go_to = function(page){
      $state.go(page);
    }
})

.controller('DemoCtrl', function($scope, $state){
  $scope.view = "splash";
  var pages = ["splash", "test"];
  var curr = 0;

  $scope.test = function(){
    curr++;
    $scope.view = pages[curr];
    if(curr==pages.length-1){
      curr= -1;
    }
    $state.go('demo.'+$scope.view);
  }
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
  var counter = 0;
  var shells = [document.getElementById("state0"), document.getElementById("state1"),
  document.getElementById("state2"), document.getElementById("state3"), document.getElementById("state4")];
  var viewer = document.getElementById('slide');
  var slider = document.getElementById('promo-slides');
  var current = shells[counter];

  viewer.appendChild(current);
  slider.className = "";

  $scope.cycles = function(){
    window.setInterval(function () {
      slider.className = "fade";

      setTimeout(function(){
        viewer.removeChild(current);

        counter += 1;
        if(counter===5){
          counter = 0;
        }

        current = shells[counter];
        viewer.appendChild(current);
        slider.className = "";
      },1000);

    }, 6000);
  }

  $scope.signup = function(){

  }
  $scope.to_login = function(){
    $state.go('merchant.login');
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
