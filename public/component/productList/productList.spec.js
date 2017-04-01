import 'angular';
import 'angular-mocks';
import 'chai';
import '../../constants/api';
import data from './test-fixtures';

describe('Products list component', function () {
	beforeEach(angular.mock.module('productFeed'));
	var $componentController, controller, productsListService;
	beforeEach(inject(($injector, Product, $httpBackend) => {
		$componentController = $injector.get("$componentController");
		productsListService = Product;
		controller = $componentController("productList");
		window.$httpBackend = $httpBackend;
	}));
	describe("updateSettings", function () {
		it('call updateSettings should update feedUrl and refreshTime', (done) => {
			const feedUrl = "google.com", refreshTime = 4000;
			controller.updateSettings(feedUrl, refreshTime);
			expect(controller.feedUrl).to.equal(feedUrl);
			expect(controller.refreshTime).to.equal(refreshTime);
			done();
		})
	});
	describe("loadNewProducts", function () {
		it('call loadNewProducts should update the lists of products', (done) => {
			controller.products = [{productID: "1"}, {productID: "2",}];
			controller.newProducts = [{productID: "4"}];
			controller.loadNewProducts();
			expect(controller.products).to.have.length(3);
			expect(controller.products[0]).to.have.property('productID', '4');
			done();
		});
	});
	
	describe("extractNewFeed", function () {
		it('call extractNewFeed should populate this.newProducts', (done) => {
			controller.products = [{productID: "1"}, {productID: "2",}];
			controller.newProducts = [{productID: "4"}];
			const newProducts = [{productID: "4"}, {productID: "6"}, {productID: "2"}];
			controller.extractNewFeed(newProducts);
			expect(controller.newProducts).to.have.length(2);
			expect(controller.newProducts[0]).to.have.property('productID', '4');
			expect(controller.newProducts[1]).to.have.property('productID', '6');
			done();
		});
	});
	
	describe("productListService", function () {
		it('newProducts', (done) => {
			const url = '/api/v1/feed?feedUrl=http%3A%2F%2Fpf.tradetracker.net%2F%3Faid%3D1%26type%3Dxml%26encoding%3Dutf-8%26fid%3D251713%26categoryType%3D2%26additionalType%3D2%26limit%3D10';
			$httpBackend.whenGET(url).respond(data);
			productsListService.fetchProducts().then(function (resp) {
				const products = resp.data;
				expect(products).to.be.instanceof(Array);
				expect(products).to.have.length(10);
				expect(resp).to.have.property('status', 200);
				done();
			}).catch(e => {
				console.log("Error");
				console.log(JSON.stringify(e));
				done();
			});
			$httpBackend.flush();
		});
	})
});