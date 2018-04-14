

exports.getAllDrugDetails =  function(req, res) {
try{            
    var connection = res.app.get('connection');
    connection.query("select DM.Drug_Key, DM.Drug_Name, DM.Drug_Code, DM.Drug_Power, DM.Drug_Company, DM.Drug_Appearance, DM.Drug_Shape, DM.Drug_Side from drug_master DM ",null, function(err, rows, fields){
        if(err){
            return connection.rollback(function(){
            throw err;
            });
        }   
        var drugList = [];                   
            for(var drugIndex = 0 ; drugIndex < rows.length; drugIndex++){
                var drugObj = {};                
                drugObj = rows[drugIndex];                                    
                drugList.push(drugObj);
            }
            res.json(drugList);           
        });             
    }
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }
}

exports.createReminder =  function(req, res) {
    try{        
        var reqObj = req.body; 
        var connection = res.app.get('connection');

        console.log('createReminder: patientKey' + reqObj.patientKey);
        console.log('createReminder: drugKey' + reqObj.drugKey);
        console.log('createReminder: morningTime' + reqObj.morningTime);
        console.log('createReminder: middayTime' + reqObj.middayTime); 
        console.log('createReminder: eveningTime' + reqObj.eveningTime); 
        console.log('createReminder: bedtimeTime' + reqObj.bedtimeTime);
        console.log('createReminder: customTime' + reqObj.customTime);
        console.log('createReminder: durationType' + reqObj.durationType);
        console.log('createReminder: startDay' + reqObj.startDay); 
        console.log('createReminder: note' + reqObj.note);

        var insertSql = "INSERT INTO reminder_master SET ?";
		var insertValues = {
    		"Patient_Key": reqObj.patientKey,		
    		"Drug_Key": reqObj.drugKey,		
            "Morning_Time": reqObj.morningTime,
            "Midday_Time": reqObj.middayTime,
            "Evening_Time": reqObj.eveningTime,        
            "Bed_Time": reqObj.bedtimeTime,     
            "Custom_Time": reqObj.customTime,
            "Duration_Type": JSON.stringify(reqObj.durationType),
            "Start_Day": reqObj.startDay,
           // "End_Day": reqObj.endDay,
            "Note": reqObj.note
		};        
        connection.query(insertSql, insertValues, function (err, result){
		if(err) {
			return connection.rollback(function(){
			throw err;
			});
		}
        res.json({"Reminder_Key":result.insertId});			
	   });	          
    }    
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
	}
}

exports.getUpcomingReminders =  function(req, res) {
    try{
        var reqObj = req.body; 
        var connection = res.app.get('connection');
        console.log('getUpcomingReminders: patientKey' + reqObj.patientKey);               
        connection.query("select * from reminder_master RM, drug_master DM  where RM.Patient_Key  = ? and RM.Drug_Key = DM.Drug_Key and RM.Is_Deleted = 0 and RM.Start_Day <= cast((now()) as date)",[reqObj.patientKey], function(err, rows, fields){
        if(err){
            return connection.rollback(function(){
            throw err;
            });
        }   
        var upcomingReminderList = [];                   
            for(var reminderIndex = 0 ; reminderIndex < rows.length; reminderIndex++){
                var reminderObj = {};                
                reminderObj = rows[reminderIndex];
                reminderObj.Duration_Types = JSON.parse(rows[reminderIndex].Duration_Type);                                    
                upcomingReminderList.push(reminderObj);
            }
            res.json(upcomingReminderList);    
        });             
    }
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }
}

exports.deleteReminder =  function(req, res) {
    try{
        var reqObj = req.body; 
        var connection = res.app.get('connection');
        console.log('deleteReminder: reminderKey' + reqObj.reminderKey);               
        connection.query("UPDATE reminder_master SET Is_Deleted=1 where Reminder_Key = ?",reqObj.reminderKey, function(err, results){
         if(err){
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

exports.updateReminder =  function(req, res) {
    try{        
        var reqObj = req.body; 
        var connection = res.app.get('connection');

        console.log('updateReminder: reminderKey' + reqObj.reminderKey);
        console.log('updateReminder: morningTime' + reqObj.morningTime);
        console.log('updateReminder: middayTime' + reqObj.middayTime); 
        console.log('updateReminder: eveningTime' + reqObj.eveningTime); 
        console.log('updateReminder: bedtimeTime' + reqObj.bedtimeTime);
        console.log('updateReminder: customTime' + reqObj.customTime);
        console.log('updateReminder: durationType' + reqObj.durationType);
        console.log('updateReminder: startDay' + reqObj.startDay);
        console.log('updateReminder: note' + reqObj.note);

        var updateSql = "UPDATE reminder_master SET ? where Reminder_Key = ?";
        var updateValues = {
            "Morning_Time": reqObj.morningTime,
            "Midday_Time": reqObj.middayTime,
            "Evening_Time": reqObj.eveningTime,        
            "Bed_Time": reqObj.bedtimeTime,     
            "Custom_Time": reqObj.customTime,
            "Duration_Type": JSON.stringify(reqObj.durationType),
            "Start_Day": reqObj.startDay,          
            "Note": reqObj.note
        };        
        connection.query(updateSql, [updateValues,reqObj.reminderKey], function (err, result){
        if(err) {
            return connection.rollback(function(){
            throw err;
            });
        }
        res.json({"Reminder_Key":result.insertId});         
       });            
    }    
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
}

// Used to Log Adherance
exports.putAdherance =  function(req, res) {
try{
        var reqObj = req.body; 
        var connection = res.app.get('connection');
        var updateFlag = false;

        console.log('putAdherance: reminderKey ' + reqObj.reminderKey);
        console.log('putAdherance: drugTime ' + reqObj.drugTime);
        console.log('putAdherance: isTaken ' + reqObj.isTaken); 
        console.log('putAdherance: isMissed ' + reqObj.isMissed); 
        console.log('putAdherance: missedReason ' + reqObj.missedReason);

        connection.beginTransaction(function(err){
            if(err) {throw err;}
            connection.query("select * from adherence_log where Reminder_Key = ? and Drug_Time = ?",[reqObj.reminderKey,reqObj.drugTime], function(err, rows, fields){
                if(err)
                {
                    return connection.rollback(function(){
                    throw err;
                    });
                }           
                if(rows.length > 0)
                {
                    updateFlag = true;
                }
                if(updateFlag){

                    console.log('putAdherance: updateFlag ' + updateFlag);
                    var updateSql = "UPDATE adherence_log SET ? where Reminder_Key = ? and Drug_Time = ?";
                    var updateValues = {
                        "Is_Taken": reqObj.isTaken,
                        "Is_Missed": reqObj.isMissed,
                        "Missed_Reason": reqObj.missedReason                       
                    };        
                    connection.query(updateSql, [updateValues,reqObj.reminderKey,reqObj.drugTime], function (err, result){
                    if(err) {
                        return connection.rollback(function(){
                        throw err;
                        });
                    }
                    res.json({"Adherance_Key ":result.insertId});  
                    return;       
                   });      
                }
                else{

                    console.log('putAdherance: updateFlag ' + updateFlag);
                    var insertSql = "INSERT INTO adherence_log SET ?";
                    var insertValues = {
                        "Reminder_Key": reqObj.reminderKey,
                        "Drug_Time": reqObj.drugTime,
                        "Is_Taken": reqObj.isTaken,
                        "Is_Missed": reqObj.isMissed,
                        "Missed_Reason": reqObj.missedReason                       
                    };        
                    connection.query(insertSql, insertValues, function (err, result){
                    if(err) {
                        return connection.rollback(function(){
                        throw err;
                        });
                    }
                    res.json({"Adherance_Key":result.insertId});
                    return;       
                   }); 
                }               
                connection.commit(function(err){
                    if(err){
                        return connection.rollback(function(){
                    throw err;
                    });
                    }       
                });
                });
            }); 
        }
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }
}


exports.getAdheranceStatus =  function(req, res) {
    try{
        var reqObj = req.body; 
        var connection = res.app.get('connection');

        console.log('getAdheranceStatus: reminderKey ' + reqObj.reminderKey);
        console.log('getAdheranceStatus: drugTime ' + reqObj.drugTime);      

        connection.query("select * from adherence_log where Reminder_Key = ? and Drug_Time = ?",[reqObj.reminderKey,reqObj.drugTime], function(err, rows, fields){
        if(err){
            return connection.rollback(function(){
            throw err;
            });
        }   
        if(rows.length > 0){
            res.json(rows[0]);                
        }
        else{
            res.json({
            "status": 402,
            "message" : "No Adherance Record Exists"
            });
        }
      });             
    }
    catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
    }
}