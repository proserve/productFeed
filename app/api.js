import express from "express";
import axios from "axios";
import {parseString} from "xml2js";
function promisify(fn, params) {
	return new Promise((success, reject) => fn(...params, (err, resp) => err ? reject(err) : success(resp)));
}
const parserOptions = {explicitArray: false, mergeAttrs: true, charkey: 'value'};
const DEFAULT_FEED_URL = "http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=10";
const apiRouter = express.Router();

apiRouter.get('/feed', async (req, res) => {
	let feedUrl = req.query.feedUrl || DEFAULT_FEED_URL;
	try {
		const {data} = await axios.get(feedUrl);
		let {products} = await promisify(parseString, [data, parserOptions]);
		products = products.product;
		for (let i = 0; i < products.length; i++) {
			const product = products[i];
			const additionalFields = product.additional.field;
			const fields = {};
			for (let field of additionalFields) {
				fields[field.name] =field.value;
			}
			product.additionalFields = fields;
		}
		res.json(Array.isArray(products) ? products : [products]);
	} catch (e) {
		res.status(e.statusCode || 400).send(e);
	}
});

export default apiRouter;