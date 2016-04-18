import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Patients } from '../api/patients.js';

import './patient_info.html';

Template.patient_info.helpers({
   patient() {
   	//return a single patien for template data context
   	const instance = Template.instance();
    if (instance.state.get('patientID')) {
      const patientID = instance.state.get('patientID');
      return Patients.findOne({'patientID' : Number(patientID)});
    }
    return Patients.findOne();
  },
   patients() {
    return Patients.find({});
  },
  calc_age() {
//calculate age. See http://stackoverflow.com/a/21984136/3961519
	if (this.birthDate == undefined)
	return '' ;

  	const ageDifMs = Date.now() - this.birthDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
});


Template.patient_info.events({
	 "change #patient-select": function (event, template) {
        var patientID = template.$(event.currentTarget).val();
        template.state.set('patientID', patientID);
        // console.log(patientID);
    }

});

Template.patient_info.onCreated(function piOnCreated() {
  Meteor.subscribe('patients_demo');
  this.state = new ReactiveDict();

});