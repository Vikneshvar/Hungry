angular.module('starter', ['ui.router','my_ctrls'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/splash');

  $stateProvider
  .state('demo', {
    abstract: true,
    templateUrl:'views/demo.html'
  })
  .state('demo.splash',{
    url:'/splash',
    views:{
      'splash@demo':{
        templateUrl: 'views/splash.html'
      }
    }
  })
  .state('demo.home',{
    url:'/home',
    views:{
      'home@demo':{
        templateUrl: 'views/home.html'
      }
    }
  });
});
