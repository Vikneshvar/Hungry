angular.module('my_ctrls', [])

.controller('MainCtrl', function($scope, $state){
    $scope.test = 'Hello world!';

    $scope.go_to = function(page){
      $state.go(page);
    }
})

.controller('DemoCtrl', function($scope, $state){
  $scope.view = "splash";
  var pages = ["splash", "home"];
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

.controller('HomeCtrl', function($scope){
  $scope.animateHome = function(){
    setTimeout(function(){
      document.getElementById("new-lynt").style.height = '50px';
      setTimeout(function(){
        document.getElementById("details").style.height = '275px';
      }, 1500);
    }, 1000);
  }
})

.controller('LogoCtrl', function($scope){
  $scope.animateLogo = function(){
    setTimeout(function(){
    document.getElementById("pocket-box").style.width = '300px';
    document.getElementById("left-wallet").style.left = '0%';
    document.getElementById("left-wallet").style.transform = 'rotateY(360deg)';
    setTimeout(function(){
      document.getElementById("lynt").style.opacity = "1";
      var lints = document.getElementsByClassName("rises");
      for(var i=0, length = lints.length; i<length; i++){
        lints[i].style.visibility = 'visible';
      }
      document.getElementById("lint-1").style.top = '0%';
      document.getElementById("lint-2").style.top = '30%';
      document.getElementById("lint-3").style.top = '65%';
    }, 700);
  }, 500);
  }
});
