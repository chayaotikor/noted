require('dotenv').config();
const jwt = require('jsonwebtoken');
const responseStatus = require('../config/responseStatuses')
const errorHandler = require("../config/errorHandler");



module.exports = {
	protected: (req, res, next) => {
		const token = req.headers.authorization;
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
				if (err) {
					errorHandler(responseStatus.badCredentials);
				} else {
					req.decodedToken = decodedToken;
					next();
				}
			});
		} 
		next()
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
