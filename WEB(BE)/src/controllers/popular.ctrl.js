const data = require('../models/index');

function sortFunction(a, b) {
	if(a[1] == b[1]){
		return 0;
	}
	
	else{
		return (a[1] > b[1]) ? -1 : 1;
	}
}

const process = {
	sortRank : (routines) => {
		var JoinedRoutine = [];
		
		for(const routine of routines){
			var isRoutine = false;
			var index;
			
			if(routine.type == 'join'){
				for(var i = 0; i<JoinedRoutine.length; ++i){
					if(JoinedRoutine[i][0] == routine.routine_id){
						isRoutine = true;
						index = i;
						break;
					}
				}
				
				if(isRoutine){
					JoinedRoutine[index][1]++;
				}
				else{
					JoinedRoutine.push([routine.routine_id, 1]);
				}
			}
		}
		
		JoinedRoutine.sort(sortFunction);
		return JoinedRoutine;
	}
}

const output = {
	popular : async (req, res) => {
		const from = req.query.from;
		const to = req.query.to;
		
		if(!from){
			return res.status(400).json({
				success : false,
				err : 'from query를 입력해주세요'
			})
		}
		if(!to){
			return res.status(400).json({
				success : false,
				err : 'to query를 입력해주세요'
			})
		}
		
		const userRoutines = await data.user_routine.getAll();

		if(userRoutines.length == 0){
			return res.status(400).json({
				success : false,
				err : '루틴이 없습니다!'
			})
		}
		
		const JoinedRoutine = process.sortRank(userRoutines);
		
		var rankedRoutine = [];
		
		try{
			for(var rank = from; rank <= to; ++rank){
				const routine = await data.routine.get('id', JoinedRoutine[rank-1][0]);
				rankedRoutine.push(routine[0]);
			}
		}
		catch(e){
			return res.status(400).json({
				success : false,
				err : String(e)
			})
		}
		
		res.json({
			success : true,
			rankedRoutine : rankedRoutine
		})
	} 
}

module.exports = {
	output,
	process
}