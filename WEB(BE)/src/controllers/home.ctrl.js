const jwt = require('../token/jwt');
const data = require('../models/index');

const token = {
	isToken : (req, res) => {
		if(req.headers.authorization && req.headers.authorization.split(' ')[1]){
			return true;
		}

		else{
			return false;
		}
	},
	
	decode : (req, res) => {
		const jwtToken = req.headers.authorization.split(' ')[1];
		const decoded = jwt.token.decode(jwtToken)
		return decoded;
	}
}


const output = {
	home : async (req, res) => {
		if(!token.isToken(req, res)){
			return res.json({
				success : true,
				isLogin : false
			})
		}
		
		const decoded = token.decode(req, res);
		const userInfo = await data.user.get('id', decoded.id);
		
		res.json({
			success : true,
			isLogin : true,
			user : userInfo[0]
		})
	}
}


module.exports = {
	output
};