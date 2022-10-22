const data = require('../models/index');
const jwt = require('../token/jwt');
const crypto = require('crypto');
const STRETCHINGKEY = 9999;

const createSalt = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });

const createHashedPassword = (plainPassword) =>
  new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(
      plainPassword,
      salt,
      STRETCHINGKEY,
      64,
      'sha512',
      (err, key) => {
        if (err) reject(err);
        resolve({ password: key.toString('base64'), salt });
      }
    );
  });

const createHashedPasswordWithSalt = (plainPassword, salt) =>
  new Promise(async (resolve, reject) => {
    crypto.pbkdf2(
      plainPassword,
      salt,
      STRETCHINGKEY,
      64,
      'sha512',
      (err, key) => {
        if (err) reject(err);
        resolve(key.toString('base64'));
      }
    );
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

const output = {
	setting : async (req, res)=>{
		const decoded = token.decode(req, res);
		
		const name = decoded.name;
		const categories = await data.user_category.get('user_no', decoded.no);
		
		res.json({
			success : true,
			name : name,
		    category : categories
		})
	},
	
	mine : async (req, res)=>{
		const decoded = token.decode(req, res);
		const host = decoded.no;
		
		const routines = await data.user_routine.get('user_no', host);

		var JoinedRoutine = [];
		
		for(const routine of routines){
			if(routine.type == 'join'){
				const myRoutine = await data.routine.get('id', routine.routine_id);
				JoinedRoutine.push(myRoutine);
			}
		}
		
		res.json({
			success : true,
			routine : JoinedRoutine
		})
	},
	
	like : async (req, res)=>{
		const decoded = token.decode(req, res)
		
		const myRoutine = await data.user_routine.get('user_no',decoded.no);
		const likeRoutineId = [];
		
		for(const routine of myRoutine){
			if(routine.type == 'like'){
				likeRoutineId.push(routine.routine_id);
			}
		}
		
		res.json({
			success : true,
			likeRoutineID : likeRoutineId
		})
	},
	
	auth : async (req, res) => {
		const routine = await data.routine.get('id', req.params.routineId);
		
		res.json({
			success : true,
			routine : routine[0]
		})
	},
	
	goods : async (req, res) => {
		const decoded = token.decode(req, res);
		
		const userPoint = await data.user.get('id', decoded.id)[0].point;
		
		const goods = await data.goods.getAll();
		
		res.json({
			success : true,
			userPoint : userPoint,
			goods : goods
		})
	}
}

const user = {
	setInfo : (req, res) =>{
		const decoded = token.decode(req, res);
		
		if(req.body.name){
			data.user.update('nickname', req.body.name, decoded.id); 
		} else{
			return res.status(400).json({
				success : false,
				err : '닉네임을 입력해주세요!'
			})
		}
		
		if(req.body.category){
			const categories = req.body.category;
			data.user_category.delete('user_no', decoded.no);
			for(const category of categories){
				const param = [decoded.no, category]
				data.user_category.add(param);
			}
		} else{
			return res.satus(400).json({
				success : false,
				err : '카테고리를 선택해주세요!'
			})
		}
		
		return res.json({
			success : true
		})
	},
	
	setPassword : async (req, res) => {
		if(!req.body.pw){
			return res.status(400).json({
				success : false,
				err : '새로운 비밀번호를 입력해주세요!'
			})
		}

		const decoded = token.decode(req, res);
		
		const originalPw = await createHashedPasswordWithSalt(await data.user.get('id', decoded.id)[0].pw, await data.user.get('id', decoded.id)[0].salt) ;
		
		if(req.body.pw != originalPw){
			const { password, salt } = await createHashedPassword(req.body.pw);
			
			data.user.update('pw', password, decoded.id);
			data.user.update('salt', salt, decoded.id);
			
			return res.json({
				success : true,
				msg : '비밀번호 수정 완료!'
			})
		}
		
		else{
			return res.status(400).json({
				success : true,
				err : '원래 비밀번호와 같습니다!'
			})
		}
	}
}

const routine = {
	auth : (req, res) => {
		const decoded = token.decode(req, res);
		
		try{
			const user_no = decoded.no;
			const routine_id = req.params.routineId;
			const {week, day, date, img, text} = req.body;
			
			if(!week){
				res.status(400).json({
					success : false,
					err : 'week의 정보가 없습니다!'
				})
			} else if(!day){
				res.status(400).json({
					success : false,
					err : 'day의 정보가 없습니다!'
				})
			} else if(!date){
				res.status(400).json({
					success : false,
					err : 'date의 정보가 없습니다!'
				})
			} else if(!img){
				res.status(400).json({
					success : false,
					err : 'img의 정보가 없습니다!'
				})
			} else if(!text){
				res.status(400).json({
					success : false,
					err : 'text의 정보가 없습니다!'
				})
			}
			
			const param = [user_no, routine_id, week, day, date, img, text]
			data.auth.add(param);
			
			res.json({
				success : true
			})
		}
		catch(err){
			res.status(400).json({
				success : false,
				err : err
			});
			
		}
	}
}

const goods = {
	buy : async (req, res) => {
		const decoded = token.decode(req, res);
		
		const userNo = decoded.id;
		const goodsId = req.body.goods_id;
		
		if(!goodsId){
			res.status(400).json({
				success : false,
				err : 'goods_Id의 정보가 없습니다!'
			})
		}
		
		
		const date = new Date();
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		const dateStr = year + '-' + month + '-' + day;
		
		const hours = ('0' + date.getHours()).slice(-2);
		const minutes = ('0' + date.getMinutes()).slice(-2);
		const seconds = ('0' + date.getSeconds()).slice(-2);
		const timeStr = hours + ':' + minutes + ':' + seconds;
		
		const dayStr = dateStr+' '+timeStr
		
		const param = [userNo, goodsId, dayStr];
		
	  	data.user_goods.add(param);
		
		const goods = await data.goods.get('id', goodsId);
		
		res.json({
			success : true,
			goods : goods[0]
		})
	}
}

module.exports = {
	output,
	user,
	routine,
	goods
}
