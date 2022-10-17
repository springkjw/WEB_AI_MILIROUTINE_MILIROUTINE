const jwt = require('../token/jwt');
const data = require('../models/index');

const ouput = {
	home : (req, res) => {
		if(!user.isToken(req, res)){
			return res.json({
				isLogin : false
			})
		}
		
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.decode(token)
		
		const userInfo = data.user.get('id', decoded.id);
		
		res.json({
			user : userInfo,
			isLogin : true
		})
	}
}

const user = {
	isToken : (req, res) => {
		try{
			if(req.headers.authorization && req.headers.authorization.split(' ')[1]){
				return true;
			}

			else{
				return false;
			}
		}
		
		catch(err){
			res.status(400);
			throw new Error("로그인이 되어있지 않거나 토큰이 만료되었습니다!");
		}
		
	}
}

module.exports = {user};