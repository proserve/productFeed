require('babel-polyfill');
require('babel-register');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe('Feeds', () => {
	describe('/GET Feed ', () => {
		it('it should GET the default feed when feedUrl param is empty', (done) => {
			chai.request(app)
					.get('/api/v1/feed')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('array');
						res.body.length.should.be.eql(10);
						done();
					});
		});
		it('it should Fetch the right feed when passing the right Feed url', (done) => {
			chai.request(app)
					.get(`/api/v1/feed?feedUrl=${encodeURIComponent('http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=4')}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('array');
						res.body.length.should.be.eql(4);
						done();
					});
		});
		it('it should return 400 error code when feed url is invalid', (done) => {
			chai.request(app)
					.get(`/api/v1/feed?feedUrl=${encodeURIComponent('http://google.com')}`)
					.end((err, res) => {
						res.should.have.status(400);
						done();
					});
		});
	});
});
