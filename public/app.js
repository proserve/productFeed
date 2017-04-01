angular.module('productFeed', ['ui.router', 'LocalStorageModule'])
		.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('main', { url: '/', template: '<main/>' });
})
		.config((localStorageServiceProvider) => {
  localStorageServiceProvider.setPrefix('productFeed');
});

document.addEventListener('DOMContentLoaded', function () {
  angular.bootstrap(document, ['productFeed']);
});