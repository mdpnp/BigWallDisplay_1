import { Mongo } from 'meteor/mongo';
 
// patient_demographic is a collections with basic patient info 
export const Patients = new Mongo.Collection('patient_demographic');


// Explicitly deny any writes in the patient_demographic collection. 
// This application is a "read only" app to display info, not to modify data
Patients.deny({
	insert : function(userid, doc){
		return true;
	}

	,update : function(userId, doc, fields, modifier){
		return true;
	}

	,remove : function(userId, doc){
		return true;
	}
})

if (Meteor.isServer) {

// Publication	
  Meteor.publish('patients_demo', function patientsPublication() {
    return Patients.find();
  });
}