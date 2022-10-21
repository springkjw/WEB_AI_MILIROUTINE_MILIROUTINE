const db = require('../db/config');
const data = require('../models/index');
const crypto = require('crypto');
const jwt = require('../token/jwt');
const STRETCHINGKEY = 9999;

const createHashedPasswordWithSalt = (plainPassword, salt) =>
    new Promise(async (resolve, reject) => {
        crypto.pbkdf2(plainPassword, salt, STRETCHINGKEY, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
        });
    });

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

const user = {
	hasSameId : (userInfo) => {
		if(userInfo.length > 0){
			return true;
		}
		else{
			return false;
		}
	},
	
	checkUserInfo : async(req, res) => {
		if(!req.body.id){
			return res.status(400).json({
				success : false,
				err : "ID를 찾을 수 없습니다"
			});
		}
		
		if(!req.body.pw){
			return res.status(400).json({
				success : false,
				err : "Password를 찾을 수 없습니다"
			});
		}
		
		const userInfo = await data.user.get('id', req.body.id);
		
		if(!token.isToken(req, res)){
			if(user.hasSameId(userInfo)){ 
				if(userInfo[0].pw == await createHashedPasswordWithSalt(req.body.pw, userInfo[0].salt)){
					const token = jwt.token.create(req, res, userInfo[0].no, userInfo[0].id, userInfo[0].name);
					
					res.json({
						success : true,
						token : token,
						user : userInfo[0]
					});
				}
				else{
					return res.status(400).json({
						success : false,
						err : "비밀번호가 틀렸습니다!"
					});
				}
			}

			else{
				return res.status(400).json({
					success : false,
					err : "아이디가 존재하지 않습니다!"
				});
			}	
		}
		
		else{
			return res.status(400).json({
				success : false,
				err : "이미 로그인 되어있습니다!"
			});
		}
	}
}

module.exports = {
	user
};