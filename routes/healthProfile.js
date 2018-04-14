// This Method Facilitates Inserting Weight Record of Patient
exports.insertWeightRecord =function(req, res, next){
	try{
    var reqObj = req.body;  
    console.log('insertWeightRecord : patientKey '+reqObj.patientKey);
    console.log('insertWeightRecord : weight '+reqObj.weight);
    var connection = res.app.get('connection');		
		
		var insertWtSql = "INSERT INTO patient_weight_master SET Patient_Id ="+reqObj.patientKey+", Weight ="+reqObj.weight+", Unit = 'Kgs'";
	    connection.query(insertWtSql, null, function (err, result){
				if(err)
				{
					console.error(err);
					return err;
				}						
			});
			res.json({"Weight_Record":"Success"});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}s    
}

// This Method Facilitates Inserting Heart rate of Patient
exports.insertHeartRate =function(req, res, next){
try{
    var reqObj = req.body;  
    console.log('insertHeartRate : patientKey '+reqObj.patientKey);
    console.log('insertHeartRate : heartRate '+reqObj.heartRate);
    console.log('insertHeartRate : activity '+reqObj.activity);
    var connection = res.app.get('connection');				
		var insertSql = "INSERT INTO patient_bpm_master SET Patient_Id ="+reqObj.patientKey+", Heart_Rate ="+reqObj.heartRate+", Activity='"+reqObj.activity+"', Unit = 'bpm'";
		connection.query(insertSql, null, function (err, result){
				if(err)
				{
					console.error(err);
					return err;
				}					
			});		
			res.json({"Heart_Rate":"Success"});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

// This Method Facilitates Inserting Blood Glucose of Patient
exports.insertBloodGlucose =function(req, res, next){
try{
    var reqObj = req.body;  
    console.log('insertBloodGlucose : patientKey '+reqObj.patientKey);
    console.log('insertBloodGlucose : bloodGlucose '+reqObj.bloodGlucose);
    console.log('insertBloodGlucose : readingType '+reqObj.readingType);
    var connection = res.app.get('connection');				
		var insertSql = "INSERT INTO patient_glucose_master SET Patient_Id ="+reqObj.patientKey+", Glucose ="+reqObj.bloodGlucose+", Type ='"+reqObj.readingType+"', Unit = 'mg/dl'";
	    connection.query(insertSql, null, function (err, result){
				if(err)
				{
					console.error(err);
					return err;
				}					
			});		
			res.json({"Blood_Glucose":"Success"});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

// This Method Facilitates Inserting Blood Pressure of Patient
exports.insertBloodPressure =function(req, res, next){
try{
    var reqObj = req.body;  
    console.log('insertBloodPressure : patientKey '+reqObj.patientKey);
    console.log('insertBloodPressure : systolic '+reqObj.systolic);
    console.log('insertBloodPressure : diastolic '+reqObj.diastolic);
    console.log('insertBloodPressure : heartRate '+reqObj.heartRate);
    var connection = res.app.get('connection');				
		var insertSql = "INSERT INTO patient_bp_master SET Patient_Id ="+reqObj.patientKey+", Systolic ="+reqObj.systolic+", Diastolic ="+reqObj.diastolic+", Unit = 'mmHg', Heart_Rate ="+reqObj.heartRate+", Heart_Rate_Unit = 'bpm' ";
	   connection.query(insertSql, null, function (err, result){
				if(err)
				{
					console.error(err);
					return err;
				}					
			});		
			res.json({"Blood_Pressure":"Success"});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

// This Method Facilitates Inserting Height Weight of Patient
exports.insertHeightWeight =function(req, res, next){
try{

    var reqObj = req.body;  
    console.log('insertHeightWeight : patientKey '+reqObj.patientKey);
    console.log('insertHeightWeight : height '+reqObj.height);
    console.log('insertHeightWeight : weight '+reqObj.weight);
    var connection = res.app.get('connection');		
		if(reqObj.height !== ''){
		var insertSql = "INSERT INTO patient_height_master SET Patient_Id ="+reqObj.patientKey+", Height ="+reqObj.height+", Unit = 'Cms'";
		connection.query(insertSql, null, function (err, result){
				if(err)
				{
					console.error(err);
				    return err;
				}					
			});
		}
		if(reqObj.weight !== ''){
		var insertWtSql = "INSERT INTO patient_weight_master SET Patient_Id ="+reqObj.patientKey+", Weight ="+reqObj.weight+", Unit = 'Kgs'";
	    connection.query(insertWtSql, null, function (err, result){
				if(err)
				{
					console.error(err);
					return err;
				}						
			});
		}
		res.json({"Height_Weight":"Success"});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

// This Method Facilitates Get Weight of Patient
exports.getWeightAdmin =function(req, res){
    try{
		var reqObj = req.body;  
        console.log('getWeightAdmin : patientKey '+reqObj.patientKey);	 
		var connection = res.app.get('connection');
				connection.query("select WM.Weight, WM.Unit as Wt_Unit, Date_Format(WM.CreatedOn,'%b %d %Y') AS WT_DATE , Date_Format(WM.CreatedOn,'%H:%i') AS WT_DATE_TIME from patient_weight_master WM where WM.Patient_Id =? order by WM.Weight_Record_Id DESC LIMIT 5",[reqObj.patientKey], function(err, rows, fields){
						if(err){
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

// This Method Facilitates Get Height of Patient
exports.getHeightAdmin =function(req, res){
    try{
		var reqObj = req.body;  
        console.log('getHeightAdmin : patientKey '+reqObj.patientKey);	 
		var connection = res.app.get('connection');
				connection.query("select HM.Height, HM.Unit as Ht_Unit, Date_Format(HM.CreatedOn,'%b %d %Y') AS HT_DATE , Date_Format(HM.CreatedOn,'%H:%i') AS HT_DATE_TIME  from patient_height_master HM where HM.Patient_Id =? order by HM.Height_Record_Id DESC LIMIT 5",[reqObj.patientKey], function(err, rows, fields){
						if(err){
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

// This Method Facilitates Get BP Data of Patient
exports.getBPAdmin =  function(req, res) {
try{
	var reqObj = req.body;  
    console.log('getBPAdmin : patientKey '+reqObj.patientKey); 	
	var connection = res.app.get('connection');
			connection.query("select BP.Systolic, BP.Diastolic, BP.Heart_Rate , Date_Format(BP.CreatedOn,'%b %d %Y') AS BP_DATE , Date_Format(BP.CreatedOn,'%H:%i') AS BP_DATE_TIME from patient_bp_master BP where BP.Patient_Id = ?  order by BP.Bp_Record_Id DESC LIMIT 7 ",[reqObj.patientKey], function(err, rows, fields){
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

// This Method Facilitates Get Glucose Data of Patient
exports.getGlucoseAdmin =  function(req, res) {
try{
	var reqObj = req.body;  
    console.log('getGlucoseAdmin : patientKey '+reqObj.patientKey); 		
	var connection = res.app.get('connection');
			connection.query("select BG.Glucose ,BG.Unit AS BG_Unit, BG.Type, Date_Format(BG.CreatedOn,'%b-%d-%y') AS BG_DATE , Date_Format(BG.CreatedOn,'%H:%i') AS BG_DATE_TIME from patient_glucose_master BG where BG.Patient_Id = ? GROUP BY BG_DATE , BG.Type order by BG.Glucose_Record_Id DESC LIMIT 7 ",[reqObj.patientKey], function(err, rows, fields){
			
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

// This Method Facilitates Get Glucose Data of Patient
exports.getBPMAdmin =  function(req, res) {
try{
	var reqObj = req.body;  
    console.log('getBPMAdmin : patientKey '+reqObj.patientKey); 
    var connection = res.app.get('connection');		
	connection.query("select BPM.Heart_Rate, BPM.Activity, BPM.Unit AS BPM_Unit, Date_Format(BPM.CreatedOn,'%b-%d-%y') AS BPM_DATE , Date_Format(BPM.CreatedOn,'%H:%i') AS BPM_DATE_TIME from patient_bpm_master BPM where BPM.Patient_Id = ? order by BPM.Bpm_Record_Id DESC LIMIT 7",[reqObj.patientKey], function(err, rows, fields){
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