const jwt = require('../token/jwt');
const data = require('../models/index');

const output = {
	home : (req, res) => {
		if(!user.isToken(req, res)){
			return res.json({
				success : true,
				isLogin : false
			})
		}
		
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.decode(token)
		
		const userInfo = data.user.get('id', decoded.id);
		
		res.json({
			success : true,
			isLogin : true,
			user : userInfo
			
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
			throw new Error(err);
		}
		
	}
}

module.exports = {
	output
};