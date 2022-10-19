const data = require('../models/index');

function sortFunction(a, b) {
	if(a[1] == b[1]){
		return 0;
	}
	
	else{
		return (a[1] > b[1]) ? -1 : 1;
	}
}

const output = {
	popular : async (req, res) => {
		const routines = await data.user_routine.getAll();
		
		if(routines.length == 0){
			res.status(400).json({
				success : false,
				err : '루틴이 없습니다!'
			})
		}
		
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
		
		res.json({
			success : true,
			rankedRoutine : JoinedRoutine 
		})
	} 
}

module.exports = {
	output
}