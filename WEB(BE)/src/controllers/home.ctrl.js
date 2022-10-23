const jwt = require('../token/jwt');
const data = require('../models/index');
const popular = require('./popular.ctrl');

const MINRANK = 1;
const MAXRANK = 10;

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
		const userRoutines = await data.user_routine.getAll();
		const JoinedRoutine = popular.process.sortRank(userRoutines);
		
		var rankedRoutine = [];
		
		for(var rank = MINRANK; rank <= MAXRANK; ++rank){
			const routine = await data.routine.get('id', JoinedRoutine[rank-1][0]);
			rankedRoutine.push(routine[0]);
		}
		
		
		if(!token.isToken(req, res)){
			return res.json({
				success : true,
				isLogin : false,
				rankedRoutine : rankedRoutine
			})
		}
		const decoded = token.decode(req, res);
		const userInfo = await data.user.get('id', decoded.id);
		
		res.json({
			success : true,
			isLogin : true,
			user : userInfo[0],
			rankedRoutine : rankedRoutine
		})
	}
}


module.exports = {
	output
};