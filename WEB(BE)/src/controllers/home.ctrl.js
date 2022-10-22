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
		if(!token.isToken(req, res)){
			return res.status(400).json({
				success : false,
				isLogin : false,
				err : '로그인을 해주세요'
			})
		};
		
		const jwtToken = req.headers.authorization.split(' ')[1];
		const decoded = jwt.token.decode(jwtToken)
		return decoded;
	}
}


const output = {
	home : (req, res) => {
		if(!token.isToken(req, res)){
			return res.json({
				success : true,
				isLogin : false
			})
		}
		
		const decoded = token.decode(req, res);
		const userInfo = data.user.get('id', decoded.id);
		
		res.json({
			success : true,
			isLogin : true,
			user : userInfo
		})
	}
}


module.exports = {
	output
};