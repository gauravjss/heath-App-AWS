
// Used to Create Assign Request
exports.createAssignRequest =  function(req, res) {
var reqObj = req.body;
var connection = res.app.get('connection');

    console.log('createAssignRequest: patientKey :' + reqObj.patientKey);
    console.log('createAssignRequest: professionalKey :' + reqObj.professionalKey);

       // Inserting New Assignment
		var insertSql = "INSERT INTO patient_professional_mapping SET ?";
		var insertValues = {
		"Patient_Key": reqObj.patientKey,		
		"Professional_Key":reqObj.professionalKey,
		"Approved": 0	
		};

    	connection.query("select * from patient_professional_mapping where Patient_Key = ? and Professional_Key = ? and Is_Deleted = 0 ",[reqObj.patientKey,reqObj.professionalKey], function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				if(rows.length > 0)
				{
					res.json({"_id":-1});
					return;
				}else{
					var query = connection.query(insertSql, insertValues, function (err, result){
						if(err) throw err;			
						console.log(result);
						res.json({"_id":result.insertId});
					});
					console.log(query.sql);	
				}		
			});		
}


// Used to Approve Assignments
exports.approveAssignRequest =  function(req, res) {
var reqObj = req.body;
var connection = res.app.get('connection');

    console.log('approveAssignRequest: patientProfessionalId :' + reqObj.patientProfessionalId);
    
        // Inserting New Assignment
		var updateSql = "UPDATE patient_professional_mapping SET Approved = true where Patient_Professional_Id = ?";
		
		var query = connection.query(updateSql, reqObj.patientProfessionalId, function (err, result){
			if(err) throw err;			
			console.log(result);
			res.json({"_id":result.insertId});
		});
		console.log(query.sql);		
}

// Get Pending Assignments
exports.getPendingAssignments =  function(req, res) {
try{
	var connection = res.app.get('connection');
			connection.query("select PM.Name as Professional_Name , PM.Role, PAM.Name as Patient_name, PPM.Patient_Professional_Id from professional_master PM , patient_master PAM, patient_professional_mapping PPM  where PPM.Approved= 0 and PPM.Professional_Key = PM.Professional_Key and PPM.Patient_Key = PAM.Patient_Key ",null, function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}
				
				var pendingList = [];					
                for(var pendingIndex = 0 ; pendingIndex < rows.length; pendingIndex++)
                {
                    var pendingObj = {};				
                    pendingObj = rows[pendingIndex];				
                    pendingList.push(pendingObj);
                }
                res.json(pendingList);

			});           			
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}


// Get all Professionals
exports.getAllProfessionals =  function(req, res) {
try{
var connection = res.app.get('connection');
			connection.query("select PM.Name, PM.Chat_Id, PM.Gender, PM.Role, PM.Phone, PM.Professional_Key, PD.Speciality , PD.Qualification from professional_master PM , professional_details PD where PM.Role='N' OR PM.Role = 'D' and PM.Professional_Key = PD.Professional_Key ",null, function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				var patientList = [];					
                for(var patIndex = 0 ; patIndex < rows.length; patIndex++)
                {
                    var patObj = {};				
                    patObj = rows[patIndex];                  		
                    patientList.push(patObj);
                }
                res.json(patientList);		
            });				
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}


// Get all Patients
exports.getAllPatients =  function(req, res) {
try{
var connection = res.app.get('connection');
			connection.query("select PM.Name, PM.Chat_Id, PM.Gender, PM.Phone, PM.Patient_Key from patient_master PM",null, function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				var patientList = [];					
                for(var patIndex = 0 ; patIndex < rows.length; patIndex++)
                {
                    var patObj = {};				
                    patObj = rows[patIndex];                  		
                    patientList.push(patObj);
                }
                res.json(patientList);		
            });				
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

