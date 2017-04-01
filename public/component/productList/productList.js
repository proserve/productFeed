angular.module('productFeed').component('productList', {
	templateUrl: '/component/productList/productList.html',
	controller: 'productListController'
});

angular.module('productFeed').controller('productListController', function ($interval, Product, localStorageService) {
	this.feedUrl = localStorageService.get('feedUrl') || DEFAULT_FEED_URL;
	this.refreshTime = localStorageService.get('refreshTime') || 5000;
	this.isFetchingProduct = true;
	this.products = [];
	this.newProducts = [];
	this.updateSettings = (feedUrl, refreshTime) => {
		this.feedUrl = feedUrl;
		this.refreshTime = refreshTime;
	};
	this.loadNewProducts = () => {
		for (var i = 0; i < this.newProducts.length; i++) {
			var product = this.newProducts[i];
			this.products.unshift(product);
		}
		scrollTo(document.body, 0, 1000);
		this.newProducts = [];
	};
	this.$onInit = () => {
		Product.fetchProducts(this.feedUrl).then((resp) => {
			this.isFetchingProduct = false;
			this.products = resp.data;
		}).catch((e) => {
			this.isFetchingProduct = false;
		});
		$interval(() => {
			if (!this.isFetchingProduct) {
				this.isFetchingProduct = true;
				Product.fetchProducts(this.feedUrl).then((resp) => {
					this.extractNewFeed(resp.data);
					this.isFetchingProduct = false;
				}).catch((e) => {
					console.error(e);
					this.isFetchingProduct = false;
				});
			}
		}, this.refreshTime);
	};
	
	this.extractNewFeed = function (newProducts) {
		for (let i = 0; i < newProducts.length; i++) {
			let newProduct = newProducts[i];
			let isExist = false;
			for (let j = 0; j < this.products.length; j++) {
				let product = this.products[j];
				if (product.productID === newProduct.productID) {
					isExist = true;
					break;
				}
			}
			if (!isExist)
				for (let d = 0; d < this.newProducts.length; d++) {
					let product = this.newProducts[d];
					if (product.productID === newProduct.productID) {
						isExist = true;
						break;
					}
				}
			if (!isExist) {
				this.newProducts.push(newProduct);
			}
		};
	};
});


function scrollTo(element, to, duration) {
	if (duration <= 0) {
		return;
	}
	const difference = to - element.scrollTop;
	const perTick = difference / duration * 10;
	
	setTimeout(function () {
		element.scrollTop += perTick;
		if (element.scrollTop === to) {
			return;
		}
		scrollTo(element, to, duration - 10);
	}, 10);
}