const jwt = require("jsonwebtoken");
const path = require('path');
const EXPIRETIMEOFYEAR = 1;

require('dotenv').config({path:path.join(__dirname, '.env')});

const token = {
	create : (req, res, userNo, userId, userName) => {
		const token = jwt.sign({
			type: "JWT",
			no : userNo,
			id : userId,
			name : userName
		}, process.env.SECRET_KEY, {
			expiresIn: EXPIRETIMEOFYEAR + "y",
		});
		
		return token;
	},
	
	decode : (token) => {
		 return jwt.verify(token, process.env.SECRET_KEY);
	}
}

module.exports = {token};