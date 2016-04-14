import { Template } from 'meteor/templating';
// import { ReactiveDict } from 'meteor/reactive-dict';

import { Patients } from '../api/patients.js';

import './patient_info.html';

Template.patient.helpers({
   patient() {
    return Patients.findOne();
  },
  // lastName()  {
  // 	let randomPatient = Patients.findOne();
  // 	// console.log(randomPatient);
  // 	// let name = randomPatient===undefined ? '' : randomPatient.lastName
  // 	return randomPatient===undefined ? '' : randomPatient.lastName;
  // }
  age() {
//see http://stackoverflow.com/a/21984136/3961519
	if (this.birthDate == undefined)
	return '' ;

  	var ageDifMs = Date.now() - this.birthDate.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  	// return this.lastName;
  }
});

Template.patient.onCreated(function piOnCreated() {
  Meteor.subscribe('patients_demo');
  // this.patient = new ReactiveDict();
  // this.patient.set("patient", {lastName : "alonso"});
});