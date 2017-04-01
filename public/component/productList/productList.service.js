angular.module('productFeed').factory('Product', function ($http) {
  return {
    fetchProducts: (feedUrl = DEFAULT_FEED_URL) =>
				$http.get(`${API_FEED_URL}?feedUrl=${encodeURIComponent(feedUrl)}`)
  };
});
