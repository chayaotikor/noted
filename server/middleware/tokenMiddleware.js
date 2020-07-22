require('dotenv').config();
const jwt = require('jsonwebtoken');
const responseStatus = require('../config/responseStatuses')
const errorHandler = require("../config/errorHandler");



module.exports = {
	protected: (req, res, next) => {
		try{
			const token = req.headers.authorization;
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
			req.decodedToken = decodedToken
			next();
		} catch {
			errorHandler(responseStatus.conflict);
		}
	},

	generateToken: (user) => {
		const payload = {
			id: user._id,
			email: user.email
		};
		const secret = process.env.JWT_SECRET;
		const options = {
			expiresIn: '1h'
		};

		return jwt.sign(payload, secret, options);
	}
};
