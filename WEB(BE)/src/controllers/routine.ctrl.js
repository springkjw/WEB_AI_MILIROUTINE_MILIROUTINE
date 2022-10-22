const data = require('../models/index');
const jwt = require('../token/jwt');

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

const routine = {
	make : async (req, res) =>{
		const {name, category, image, auth_cycle, auth_description_list, start_date, duration} = req.body;
		
		if(!name){
			res.status(400).json({
				success : false,
				err : '이름을 입력해주세요'
			})
		} else if(!category){
			res.status(400).json({
				success : false,
				err : '카테고리를 입력해주세요'
			})
		} else if(!image){
			res.status(400).json({
				success : false,
				err : '이미지를 첨부해주세요'
			})
		} else if(!auth_cycle){
			res.status(400).json({
				success : false,
				err : '주기 횟수를 입력해주세요'
			})
		} else if(!auth_description_list){
			res.status(400).json({
				success : false,
				err : '인증 방법을 입력해주세요'
			})
		} else if(!start_date){
			res.status(400).json({
				success : false,
				err : '시작일을 입력해주세요'
			})
		} else if(!duration){
			res.status(400).json({
				success : false,
				err : '진행기간을 입력해주세요'
			})
		}

		const host = await data.user.get('id', token.decode(req, res).id);
		const auth_description = JSON.stringify(auth_description_list);
		
		const param = [host[0].no , name, category, image, auth_cycle, auth_description, start_date, duration];
		data.routine.add(param);
		
		const routine_id = await data.routine.getWithItems(host[0].no, name)
		const type = 'join';
		const param2 = [host[0].no, routine_id[0].no, type];
		data.user_routine.add(param2);
		
		res.json({
			success : true,
			routine : param
		})
	},
	
	output : async (req, res) => {
		const routineId = req.params.routineId;
		
		const param = await data.routine.get('id', routineId);
		
		res.json({
			success : true,
			routine_id : routineId,
			routine : param[0]
		})
	}
}

module.exports = {
	routine
}