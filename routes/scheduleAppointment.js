exports.scheduleAppointment =  function(req, res) {
    try{
        
        var reqObj = req.body; 
        var connection = res.app.get('connection');
        
        console.log('scheduleAppointment: patientKey' + reqObj.patientKey);
        console.log('scheduleAppointment: professionalKey' + reqObj.professionalKey);
        console.log('scheduleAppointment: date' + reqObj.date);
        console.log('scheduleAppointment: time' + reqObj.time); 
        console.log('scheduleAppointment: dateTime' + reqObj.dateTime); 

        
        connection.beginTransaction(function(err){
            if(err) {throw err;}
            connection.query("select Appointment_Key from schedule_appointment_manager where Date = ? AND Time= ? AND Professional_Key = ? AND Is_Booked= 1",
			 [reqObj.date,reqObj.time,reqObj.professionalKey], function(err, rows, fields){                
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				if(rows.length > 0)
				{
					res.status(401);
					res.json({
					"status": 401,
					"message" : "Sorry, this slot is already booked while you were trying to book it."
					});
					return;
				}
    	    connection.query("select Time from schedule_appointment_manager where Patient_key =? AND Professional_Key=? AND Date=? AND Is_Booked = 1",
            	[reqObj.patientKey,reqObj.professionalKey,reqObj.date], function(err, rows, fields){                
                if(err)
                {
                    return connection.rollback(function(){
                    throw err;
                    });
                }                                              
                if(rows.length > 0)
                {
                    res.status(402);
                    res.json({
                    "status": 402,
                    "message" : "You already have booking at "+rows[0].Time+""
                    });
                    return;
                }           
                var insertSql = "INSERT INTO schedule_appointment_manager SET ?";
        		var insertValues = {
            		"Patient_Key": reqObj.patientKey,		
            		"Professional_Key": reqObj.professionalKey,		
                    "Date": reqObj.date,
                    "Time": reqObj.time,
                    "Date_Time": reqObj.dateTime
        		};        
                connection.query(insertSql, insertValues, function (err, result){
				if(err) {
					return connection.rollback(function(){
					throw err;
					});
				}				
				connection.commit(function(err){
					if(err){
						return connection.rollback(function(){
					throw err;
					});
					}		
				res.json({"Appointment_Key":result.insertId});
				});
			 });	
            })
          });            
        });
    }    
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
	}
}

exports.getAppointments =  function(req, res) {
    try{ 
        var professionalKey = req.body.professionalKey;   

        var today = new Date();
        var currentDateYear = today.getFullYear();
        var currentDateMonth = today.getMonth()+1;
        var currentDateDay = today.getDate()-1;
        
        var currentDate = currentDateYear + '-' + currentDateMonth+ '-' +currentDateDay;
         
        console.log(currentDate);
                   
        var today = new Date();            
        var year = today.getFullYear();
        var month = today.getMonth();
        var date = today.getDate();

        var day = [];
        for(var i=0; i<60; i++){
            day = new Date(year, month, date + i);
        }
        
        var endDateYear =  day.getFullYear();
        var endDateMonth =  day.getMonth()+1;
        var endDateDay =  day.getDate();
        
        var endDate = endDateYear+ '-' + endDateMonth + '-' + endDateDay;

        console.log('getAppointments: Professional_Key'+ professionalKey);
        console.log('getAppointments: Date_Time>='+ currentDate);
        console.log('getAppointments: Date_Time<='+ endDate);
        
        var connection = res.app.get('connection');
    	connection.query("select Date,Time from schedule_appointment_manager where Professional_Key = ? and Date_Time>=? and Date_Time<=? and Is_Booked=1",[professionalKey,currentDate,endDate], function(err, rows, fields){
    		if(err)
    		{
    			return connection.rollback(function(){
    			throw err;
    			});
    		}	
            var appointmentList = [];					
                for(var patIndex = 0 ; patIndex < rows.length; patIndex++)
                {
                    var patObj = {};				
                    patObj = rows[patIndex];		                 			
                    appointmentList.push(patObj);
                }
                res.json(appointmentList);       	
            });				
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

exports.cancelAppointment =  function(req, res) {
    try{
        var appointmentKey = req.body.appointmentKey;

        console.log('cancelAppointment: appointmentKey'+ appointmentKey);

        var connection = res.app.get('connection');
        connection.query("UPDATE schedule_appointment_manager SET Is_Booked=0 where Appointment_Key = ?",appointmentKey, function(err, results){
		if(err)
		{
			return connection.rollback(function(){
			throw err;
			});
		}	
        res.json(results);               	
       });				
    }
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

exports.getAppointmentDetails =  function(req, res) {
try{
    var professionalKey = req.body.professionalKey;
    var queryDate = req.body.queryDate;
        
    console.log('getAppointmentDetails: professionalKey'+ professionalKey);
    console.log('getAppointmentDetails: queryDate'+ queryDate);
    
    var connection = res.app.get('connection');
    connection.query("select SAM.Appointment_Key, SAM.Date as queryDate, Date_Format(SAM.Date,'%b %d %Y, %W') AS Date, SAM.Time, SAM.Patient_Key, PM.Name from schedule_appointment_manager SAM, patient_master PM where SAM.Patient_Key=PM.Patient_Key and SAM.Professional_Key = ? and SAM.Date_Time=? and SAM.Is_Booked=1",[professionalKey,queryDate], function(err, rows, fields){
        if(err){
            return connection.rollback(function(){
            throw err;
            });
        }   
        var appointmentList = [];                   
            for(var patIndex = 0 ; patIndex < rows.length; patIndex++){
                var patObj = {};                
                patObj = rows[patIndex];                                    
                appointmentList.push(patObj);
            }
            res.json(appointmentList);           
        });             
    }
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }
}

exports.getPatientAppointments =  function(req, res) {
try{
    var professionalKey = req.body.professionalKey;
    var patientKey = req.body.patientKey;
        
    console.log('getPatientAppointments: professionalKey'+ professionalKey);
    console.log('getPatientAppointments: patientKey'+ patientKey);
    
    var connection = res.app.get('connection');
    connection.query("select SAM.Time as Time, Date_Format(SAM.Date,'%b %d %Y, %W') AS Date from schedule_appointment_manager SAM where SAM.Patient_Key=? and SAM.Professional_Key = ? and SAM.Is_Booked=1 ORDER BY SAM.Date DESC LIMIT 5",[patientKey,professionalKey], function(err, rows, fields){
        if(err){
            return connection.rollback(function(){
            throw err;
            });
        }   
        var appointmentList = [];                   
            for(var patIndex = 0 ; patIndex < rows.length; patIndex++){
                var patObj = {};                
                patObj = rows[patIndex];                                    
                appointmentList.push(patObj);
            }
            res.json(appointmentList);           
        });             
    }
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }
}

exports.getPatientAppAppointments =  function(req, res) {
    try{ 
        var patientKey = req.body.patientKey;   

        var today = new Date();
        var currentDateYear = today.getFullYear();
        var currentDateMonth = today.getMonth()+1;
        var currentDateDay = today.getDate()-1;
        
        var currentDate = currentDateYear + '-' + currentDateMonth+ '-' +currentDateDay;
         
        console.log(currentDate);
                   
        var today = new Date();            
        var year = today.getFullYear();
        var month = today.getMonth();
        var date = today.getDate();

        var day = [];
        for(var i=0; i<60; i++){
            day = new Date(year, month, date + i);
        }
        
        var endDateYear =  day.getFullYear();
        var endDateMonth =  day.getMonth()+1;
        var endDateDay =  day.getDate();
        
        var endDate = endDateYear+ '-' + endDateMonth + '-' + endDateDay;

        console.log('getPatientAppAppointments: Patient_Key'+ patientKey);
        console.log('getPatientAppAppointments: Date_Time>='+ currentDate);
        console.log('getPatientAppAppointments: Date_Time<='+ endDate);
        
        var connection = res.app.get('connection');
        connection.query("select Date,Time from schedule_appointment_manager where Patient_Key = ? and Date_Time>=? and Date_Time<=? and Is_Booked=1",[patientKey,currentDate,endDate], function(err, rows, fields){
            if(err)
            {
                return connection.rollback(function(){
                throw err;
                });
            }   
            var appointmentList = [];                   
                for(var patIndex = 0 ; patIndex < rows.length; patIndex++)
                {
                    var patObj = {};                
                    patObj = rows[patIndex];                                    
                    appointmentList.push(patObj);
                }
                res.json(appointmentList);          
            });             
    }
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }
}

exports.getProfessionalAppointmentDetails =  function(req, res) {
try{
    var patientKey = req.body.patientKey;
        
    console.log('getAppointmentDetails: patientKey'+ patientKey);
    
    var connection = res.app.get('connection');
    connection.query("select SAM.Appointment_Key, SAM.Date as queryDate, Date_Format(SAM.Date,'%b %d %Y, %W') AS Date, SAM.Time, SAM.Patient_Key, PM.Name, PM.Phone, SAM.Professional_Key, PM.Role , PD.Speciality, PD.Address, PM.Chat_Id from schedule_appointment_manager SAM, professional_master PM, professional_details PD where SAM.Professional_Key=PM.Professional_Key and SAM.Professional_Key=PD.Professional_Key and SAM.Patient_Key = ? and SAM.Is_Booked=1",[patientKey], function(err, rows, fields){
        if(err){
            return connection.rollback(function(){
            throw err;
            });
        }   
        var professionalAppointmentList = [];                   
            for(var patIndex = 0 ; patIndex < rows.length; patIndex++){
                var patObj = {};                
                patObj = rows[patIndex];
                patObj.address = JSON.parse(rows[patIndex].Address);                                    
                professionalAppointmentList.push(patObj);
            }
            res.json(professionalAppointmentList);    
        });             
    }
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }
}