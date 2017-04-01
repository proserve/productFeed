angular.module('productFeed').component('setting', {
  templateUrl: '/component/settings/settings.html',
  controller : 'settingsController',
  bindings   : {
    onSubmitSetting: '&'
  }
});

angular.module('productFeed').controller('settingsController', function (localStorageService, $state) {
  this.$onInit = () =>{
	  this.feedUrl = localStorageService.get('feedUrl') || DEFAULT_FEED_URL;
	  this.refreshTime = localStorageService.get('refreshTime') || 5000;
  };
	this.updateLocalStorage = ()=> {
		localStorageService.set('feedUrl', this.feedUrl);
		localStorageService.set('refreshTime', this.refreshTime);
	};
	
	this.submitSetting = () => {
		this.updateLocalStorage();
		this.onSubmitSetting({ feedUrl: this.feedUrl, refreshTime: this.refreshTime });
		$state.reload();
  };
});