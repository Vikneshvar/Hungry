angular.module('starter', ['ui.router','my_ctrls'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/demo/splash');

  $stateProvider
  .state('demo', {
    abstract: true,
    url: '/demo',
    templateUrl: 'views/demo.html'
  })
  .state('demo.splash',{
    url:'/splash',
    views:{
      'splash@demo':{
        templateUrl: 'views/splash.html'
      }
    }
  })
  .state('merchant',{
    abstract: true,
    url: '/merchant',
    templateUrl: 'views/merchant.html'
  })
  .state('merchant.login',{
    url:'/login',
    views:{
      'login@merchant':{
        templateUrl: 'views/partials/login.html'
      }
    }
  })
  .state('merchant.signup',{
    url:'/signup',
    views:{
      'signup@merchant':{
        templateUrl: 'views/partials/signup.html'
      }
    }
  });
});
