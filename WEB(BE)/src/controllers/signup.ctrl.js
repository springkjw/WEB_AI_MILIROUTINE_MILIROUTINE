const db = require('../db/config');
const data = require('../models/index');
const crypto = require('crypto');
const jwt = require('../token/jwt');
const STRETCHINGKEY = 9999;

const createSalt = () =>
	new Promise((resolve,reject)=>{
		crypto.randomBytes(64, (err,buf)=>{
			if(err) reject(err);
			resolve(buf.toString('base64'));
		});
});

const createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt(); 
        crypto.pbkdf2(plainPassword, salt, STRETCHINGKEY, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
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
	regist : async(req, res) => {
		if(token.isToken(req, res)){
			return res.status(400).json({
				success : false,
				err : '이미 로그인이 되어있습니다!'
			})
		}
		
		const { id, pw, email, name, category, likeRoutine } = req.body;
		const { password, salt } = await createHashedPassword(pw);
		const param = [id, password, email, name, salt]
		
		if(!id){
			res.status(400).json({
				success : false,
				err : "아이디를 입력해주세요!"
			});
		} else if(!pw){
			res.status(400).json({
				success : false,
				err : "비밀번호를 입력해주세요!"
			});
		} else if(!email){
			res.status(400).json({
				success : false,
				err : "이메일을 입력해주세요!"
			});
		} else if(!name){
			res.status(400).json({
				success : false,
				err : "이름을 입력해주세요!"
			});
		} else if(!category){
			res.status(400).json({
				success : false,
				err : "카테고리를 선택해주세요!"
			});
		} else if(!likeRoutine){
			res.status(400).json({
				success : false,
				err : "좋아하는 루틴을 선택해주세요!"
			});
		}
		
		const userInfoWithId = await data.user.get('id', id);
		const userInfoWithEmail = await data.user.get('email', email);

		if(userInfoWithId.length > 0){
			res.status(400).json({
				success : false,
				err : "이미 사용중인 아이디입니다!"
			});
		}
		
		if(userInfoWithEmail.length > 0){
			res.status(400).json({
				success : false,
				err : "이미 사용중인 이메일입니다!"
			});
		}
		
		data.user.add(param);
		
		const token = jwt.token.create(req, res, id, name);
		
		const user_no = await data.user.get('id', id)[0].no;
		
		for(const item of category){
			data.user_category.add(user_no, item);
		}
		
		for(const routine of likeRoutine){
			data.user_routine.add(user_no, routine, 'like')
		}

		return res.json({
			success : true,
			token : token,
			user : param
		})
	}
}


module.exports = {
    user
};