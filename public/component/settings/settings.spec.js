import "angular";
import "angular-mocks";
import "chai";

describe('Products feed setting component', function () {
	beforeEach(angular.mock.module('productFeed'));
	let $componentController, controller, localStorage;
	beforeEach(inject((localStorageService, _$controller_) => {
		$componentController = _$controller_;
		controller = $componentController('settingsController', {});
		localStorage = localStorageService;
	}));
	describe("submitSetting", function () {
		it('When settings are submitted, local storage should be updated', (done) => {
			controller.feedUrl = "www.tradetracker.com";
			controller.refreshTime = 430009;
			controller.updateLocalStorage();
			expect(localStorage.get("feedUrl")).to.equal(controller.feedUrl);
			expect(localStorage.get("refreshTime")).to.equal(controller.refreshTime);
			done();
		})
	});
});