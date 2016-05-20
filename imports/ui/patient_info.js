import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Patients } from '../api/patients.js';
import {Datasample_second} from '../api/patients.js';

import './patient_info.html';
import './patient_info.css';


// This dumy patient is just to represent the "empty template"
// meaning giving "fake" context data to the template
const dummy_patient = {
	"_id" : '000',
	"lastName" : "no name",
	"firstName" : "no name",
	"gender" : "?",
	"birthDate" : new Date(),
	"maritalStatus" : "?",
	"race" : "?",
	"allergies" : "none",
	"height" : 0,
	"weight" : 0
}


Template.patient_info.helpers({
  //returns the information of a single patient
   patient() {
   	//return a single patient for template data context
   	const instance = Template.instance();
    if (instance.state.get('patientID')) {//check patient that has been selected on the dropdown
      const patientID = instance.state.get('patientID');
      return Patients.findOne({'patientID' : Number(patientID)});
    }
    // return Patients.findOne();
    return dummy_patient;
  }
  //returns all patients
   ,patients() {
    // return Patients.find({});
    return Patients.find({}, {sort : {'lastName':1, 'firstName' : 1} });
  }
  ,datasamples(){
    const instance = Template.instance();
    let data = undefined
    if (instance.state.get('patientID')) {
        const patientID = instance.state.get('patientID');
        //find returns a cursor, so we need to use fetch, to convert to array. 
        // We are limiting to only one (the latest) sample --> array notation to get the object from the array
        data = Datasample_second.find({'patientID' : Number(patientID)} , {sort : {'timestamp' : -1}, limit : 1}).fetch()[0];
    }


    const temp_avg = data === undefined || data.temperature === undefined ? '-' : data.temperature.sum / data.temperature.count;
    const bp_sys_avg = data === undefined || data.blood_pressure_sys === undefined ? '-' : data.blood_pressure_sys.sum / data.blood_pressure_sys.count;
    const bp_dias_avg = data === undefined || data.blood_pressure_dias === undefined ? '-' : data.blood_pressure_dias.sum / data.blood_pressure_dias.count;
    const hr_avg = data === undefined || data.heart_rate === undefined ? '-' : data.heart_rate.sum / data.heart_rate.count;
    const spo2_avg = data === undefined || data.spo2 === undefined ? '-' : data.spo2.sum / data.spo2.count;
    const pr_avg = data === undefined || data.pulse_rate === undefined ? '-' : data.pulse_rate.sum / data.pulse_rate.count;

    data_sample = {
      temperature : temp_avg
      ,blood_pressure_sys : bp_sys_avg
      ,blood_pressure_dias : bp_dias_avg
      ,heart_rate : hr_avg
      ,spo2_sat : spo2_avg
      ,pulse_rate : pr_avg
    }

    // console.log(data_sample)
    
    return data_sample;

  }

  ,calc_age() {
//calculate age. See http://stackoverflow.com/a/21984136/3961519
	if (this.birthDate == undefined)
	return '' ;

  	const ageDifMs = Date.now() - this.birthDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  ,hasAllergies () {
  	return patientHasAllergies(this);
  }
  ,noAllergies(){
  	return !patientHasAllergies(this);
  }

  // returns a patient assesment base on their metrics
  // this function returns a JSON object with 
  //  - color : background color to display in the UI: 
  //		Healthy green : textcolor: '#0f3d0f, backgroundcolor : '#47d147', 
  //		Alert Yellow  : textcolor: #8a6d3b,  backgroundcolor: #ffff00;
  //		Danger Red    : textcolor: #fff, 	 backgroundcolor: #ff0000;
  //		Info blue     : textcolor: #31708f;  backgroundcolor: #d9edf7;
  //  - message : message to display to the clinical staff
  ,patientAssesment() {

  	// for demos purposes only 

  	healthy = {
  		backgroundcolor : '#47d147', 
  		textcolor: '#0f3d0f',
  		message : 'Patient OK',
  		status : 'Healthy'
  	}
  	alert = {
  		backgroundcolor : '#ffff00', 
  		textcolor: '#8a6d3b',
  		message : 'Warning...',
  		status : 'Alert'
  	}
  	danger = {
  		backgroundcolor : '#ff0000', 
  		textcolor: '#fff',
  		message : 'Patient Alert',
  		status : 'Danger'
  	}
  	info = {
  		backgroundcolor : '#d9edf7', 
  		textcolor: '#31708f',
  		message : 'Info Message',
  		status : 'Info'
  	}

  	const val = Math.floor(Math.random() * 4);
  	let fakeassesment = healthy;
  	if (val === 1 ) 
  		fakeassesment = alert;
  	else if (val === 2)
  		fakeassesment = danger;
  	else if(val === 3)
  		fakeassesment = info;

  	return fakeassesment;
  }

});


// Auxiliarify function to reuse functionality. 
// returns 'true' if the patient has allergies
// (the parameter patient object has an allergies field and its content is not 'none')
patientHasAllergies = function(patient){
	if (patient === undefined || patient.allergies === undefined)
  		return false;
  	if (patient.allergies == null || patient.allergies.trim() === '' || patient.allergies === 'none')
  		return false;

  	return true;
}


Template.patient_info.events({
	 "change #patient-select": function (event, template) {
        var patientID = template.$(event.currentTarget).val();
        template.state.set('patientID', patientID);
        // console.log(patientID);
    }

});

Template.patient_info.onCreated(function piOnCreated() {
  //subscriptions
  Meteor.subscribe('patients_demo');
  Meteor.subscribe('datasample_second');
  this.state = new ReactiveDict();

});