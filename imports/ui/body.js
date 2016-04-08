import { Template } from 'meteor/templating';

import { Patients } from '../api/patients.js';
 
import './body.html';
 
Template.body.helpers({
   patients() {
    return Patients.find({});
  },
});