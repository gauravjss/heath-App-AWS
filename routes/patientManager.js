
// Used to fetch Patient Data
exports.getPatientData =  function(req, res) {
try{
var professionalKey = req.body.professionalKey;  	 
var connection = res.app.get('connection');
			connection.query("select PM.Name, PM.Chat_Id, PM.Gender, PM.Phone, Date_Format(PM.DOB,\"%Y-%m-%d\") AS DOB , PM.Patient_Key, PM.Blood_Group, PM.Rh_Factor from patient_master PM, patient_professional_mapping PPM where PM.Patient_Key = PPM.Patient_Key and PPM.Professional_Key = ? and PPM.Is_Deleted = 0",[professionalKey], function(err, rows, fields){
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
                    patObj.Age = calcAge(patObj.DOB);				
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


function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return~~ ((Date.now() - birthday) / (31557600000));
}

// Used to fetch BP Data for Last 7 Days
exports.getBPAverageData =  function(req, res) {
try{
	var patientId = req.body.patientKey;
	var connection = res.app.get('connection');
			connection.query("select ROUND(AVG(BP.Systolic)) AS Systolic, ROUND(AVG(BP.Diastolic)) AS Diastolic, BP.Unit AS BP_Unit, ROUND(AVG(BP.Heart_Rate)) AS Heart_Rate, BP.Heart_Rate_Unit, Date_Format(BP.CreatedOn,'%b-%d') AS BP_DATE  from patient_bp_master BP where BP.Patient_Id = ?  GROUP BY BP_DATE  order by BP.Bp_Record_Id  DESC LIMIT 7",[patientId], function(err, rows, fields){
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

// Used to fetch All BP Data
exports.getAllBPData =  function(req, res) {
try{
	var patientId = req.body.patientKey;
	var connection = res.app.get('connection');
			connection.query("select BP.Systolic, BP.Diastolic, BP.Unit AS BP_Unit, BP.Heart_Rate , Date_Format(BP.CreatedOn,'%b-%d-%y') AS BP_DATE , Date_Format(BP.CreatedOn,'%H:%i') AS BP_DATE_TIME from patient_bp_master BP where BP.Patient_Id = ?  order by BP.Bp_Record_Id DESC ",[patientId], function(err, rows, fields){
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

// Used to fetch Average Glucose Data
exports.getAverageGlucoseData =  function(req, res) {
try{
	var patientId = req.body.patientKey;
	var connection = res.app.get('connection');
			//connection.query("select ROUND(AVG(BG.Glucose)) AS Glucose,BG.Unit AS BG_Unit, BG.Type, Date_Format(BG.CreatedOn,'%b-%d-%y') AS BG_DATE , Date_Format(BG.CreatedOn,'%H:%i') AS BG_DATE_TIME from patient_glucose_master BG where BG.Patient_Id = ? GROUP BY BG_DATE , BG.Type order by BG.Glucose_Record_Id DESC ",[patientId], function(err, rows, fields){
			connection.query("select ROUND(AVG(BG.Glucose)) AS Glucose,BG.Unit AS BG_Unit, Date_Format(BG.CreatedOn,'%b-%d') AS BG_DATE from patient_glucose_master BG where BG.Patient_Id = ? GROUP BY BG_DATE order by BG.Glucose_Record_Id DESC LIMIT 7",[patientId], function(err, rows, fields){

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

// Used to fetch All Glucose Data
exports.getAllGlucoseData =  function(req, res) {
try{
	var patientId = req.body.patientKey;
	var connection = res.app.get('connection');
			connection.query("select BG.Glucose ,BG.Unit AS BG_Unit, BG.Type, Date_Format(BG.CreatedOn,'%b-%d-%y') AS BG_DATE , Date_Format(BG.CreatedOn,'%H:%i') AS BG_DATE_TIME from patient_glucose_master BG where BG.Patient_Id = ? GROUP BY BG_DATE , BG.Type order by BG.Glucose_Record_Id DESC ",[patientId], function(err, rows, fields){
			
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


// Used to fetch Health Data
exports.getBPMData =  function(req, res) {
try{
	var patientId = req.body.patientKey;
	var connection = res.app.get('connection');
			connection.query("select BPM.Heart_Rate, BPM.Unit AS BPM_Unit, BPM.CreatedOn AS BPM_DATE from patient_bpm_master BPM where BPM.Patient_Id = ? ",[patientId], function(err, rows, fields){
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

// Used to fetch Health Data
exports.getBloodGlucoseData =  function(req, res) {
try{
	var patientId = req.body.patientKey;
	var connection = res.app.get('connection');
			connection.query("select GM.Glucose, GM.Type, GM.Unit , GM.CreatedOn AS GM_DATE from patient_glucose_master GM  where GM.Patient_Id = ?  ",[patientId], function(err, rows, fields){
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

// Used to fetch Weight Data
exports.getWeightData =  function(req, res) {
try{
	var patientId = req.body.patientKey;
	var connection = res.app.get('connection');
			connection.query("select Weight, Unit AS WT_UNIT , CreatedOn AS WT_DATE from patient_weight_master  where Patient_Id = ?  ",[patientId], function(err, rows, fields){
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

// Used to fetch Height Data
exports.getHeightData =  function(req, res) {
try{
	var patientId = req.body.patientKey;
	var connection = res.app.get('connection');
			connection.query("select Height, Unit AS HT_UNIT , CreatedOn AS HT_DATE from patient_height_master where Patient_Id = ?  ",[patientId], function(err, rows, fields){
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

// MASTER DATA FOR PROFESSIONALS
exports.getProfessionalData =  function(req, res) {
try{
 	 
var connection = res.app.get('connection');
			connection.query("select PM.Name, PM.Chat_Id, PM.Role, PM.Gender, PM.Phone, PD.Professional_Key, PD.Consultation_Fee,  PD.Chat_Fee, PD.Speciality, PD.Qualification ,PD.Availability from professional_details PD, professional_master PM where PD.Professional_Key = PM.Professional_Key", function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				var professionalList = [];					
                for(var patIndex = 0 ; patIndex < rows.length; patIndex++)
                {
                    var patObj = {};				
                    patObj = rows[patIndex];
                    console.log(patObj);
                    patObj.availability = JSON.parse(rows[patIndex].Availability);			
                    professionalList.push(patObj);
                }
                res.json(professionalList);		
            });				
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}


exports.getSelectedPatientData =  function(req, res) {
try{

var patientKey = req.body.patientKey;  	 
var connection = res.app.get('connection');
			connection.query("select PM.Name, PM.Phone, PM.Chat_Id, PM.Address, PM.Email, Date_Format(PM.DOB,'%M %d,%Y') AS DOB, PM.Gender from patient_master PM where PM.Patient_Key = ?",[patientKey] , function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				var patientDetailsList = [];					
                for(var patIndex = 0 ; patIndex < rows.length; patIndex++)
                {
                    var patObj = {};				
                    patObj = rows[patIndex];
                    
                    if(patObj.Address != '' && patObj.Address != 'null' && patObj.Address != ' '){
                    patObj.address = JSON.parse(patObj.Address);
                    }
                    else{
                      patObj.address = patObj.Address;
                    }	
                    
                    patientDetailsList.push(patObj);
                }
                res.json(patientDetailsList);		
            });				
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

exports.addCreditCard =  function(req, res) {
var reqObj = req.body;
var patientKey = reqObj.patientKey;
    console.log('addCreditCard: cardNumber :' + reqObj.cardNumber);
    console.log('addCreditCard: patientKey :' + reqObj.patientKey);
    
var connection = res.app.get('connection');
		var insertSql = "UPDATE patient_master SET ? where Patient_Key= ?";
		var insertValues = {
		"Credit_Card_Number": reqObj.cardNumber		
		};
		try{
		var query = connection.query(insertSql,[insertValues, patientKey], function (err, result){
			if(err) throw err;			
			res.json({"_id":result.insertId});
		});
	}
	catch(err){
		console.log(err);
	}
		console.log(query.sql);		
}