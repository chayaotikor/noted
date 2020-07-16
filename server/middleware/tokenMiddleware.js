require('dotenv').config();
const jwt = require('jsonwebtoken');
const responseStatus = require('../config/responseStatuses');

module.exports = {
	protected: (req, res, next) => {
		const token = req.headers.authorization;
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
				if (err) {
					next(responseStatus.badCredentials);
				} else {
					req.decodedToken = decodedToken;
					next();
				}
			});
		} else {
			next(responseStatus.badCredentials);
		}
	},

	generateToken: (user) => {
        console.log("user",user)
		const payload = {
			id: user._id,
			email: user.email
		};
		const secret = process.env.JWT_SECRET;
		const options = {
			expiresIn: '1h'
		};
		console.log(payload);
		return jwt.sign(payload, secret, options);
	}
};
