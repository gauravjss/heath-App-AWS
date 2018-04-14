
// Used to fetch Patient Data
exports.getProfessionalList =  function(req, res) {
try{
var patientKey = req.body.patientKey;  	 
var connection = res.app.get('connection');
			connection.query("select PM.Name, PM.Chat_Id, PM.Role, PM.Phone, PD.Speciality, PD.Availability,  PM.Professional_Key from professional_master PM, professional_details PD, patient_professional_mapping PPM where PM.Professional_Key = PPM.Professional_Key and PM.Professional_Key = PD.Professional_Key and PPM.Patient_Key = ? and PPM.Is_Deleted = 0 and PPM.Approved = 1",[patientKey], function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				var professionalList = [];					
                for(var professionalIndex = 0 ; professionalIndex < rows.length; professionalIndex++)
                {
                    var professionalObj = {};				
                    professionalObj = rows[professionalIndex];
                    professionalObj.availability = JSON.parse(rows[professionalIndex].Availability);
                    professionalList.push(professionalObj);
                }
                res.json(professionalList);		
            });				
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}


exports.getSelectedProfessionalData =  function(req, res) {
try{

var professionalKey = req.body.professionalKey;  	 
var connection = res.app.get('connection');
			connection.query("select PM.Name, PM.Role, PM.Phone, PM.Chat_Id, PD.Address, PD.Speciality, PD.Qualification, PD.Consultation_Fee, PD.Chat_Fee, PM.Email, PM.Gender from professional_master PM, professional_details PD where PM.Professional_Key = ? and PM.Professional_Key = PD.Professional_Key ",[professionalKey] , function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				var professionalDetailsList = [];					
                for(var professionalIndex = 0 ; professionalIndex < rows.length; professionalIndex++)
                {
                    var professionalObj = {};				
                    professionalObj = rows[professionalIndex];
                    
                    if(professionalObj.Address != '' && professionalObj.Address != 'null' && professionalObj.Address != ' '){
                    professionalObj.address = JSON.parse(professionalObj.Address);
                    }
                    else{
                      professionalObj.address = professionalObj.Address;
                    }	
                    
                    professionalDetailsList.push(professionalObj);
                }
                res.json(professionalDetailsList);		
            });				
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}