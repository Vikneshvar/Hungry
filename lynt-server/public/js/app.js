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
        templateUrl: 'views/partials/splash.html'
      }
    }
  })
  .state('demo.test',{
    url:'/test',
    views:{
      'test@demo':{
        templateUrl: 'views/partials/test.html'
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
    url:'/signup/:id',
    views:{
      'signup@merchant':{
        templateUrl: 'views/partials/signup.html'
      }
    }
  });
});
