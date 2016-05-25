//patient_info_ui.js
/*
This class has functionality to improve the layout of the patinet info tile


  //  - color : background color to display in the UI: 
  //		Healthy green : textcolor: '#0f3d0f, backgroundcolor : '#47d147', 
  //		Alert Yellow  : textcolor: #8a6d3b,  backgroundcolor: #ffff00;
  //		Danger Red    : textcolor: #fff, 	 backgroundcolor: #ff0000;
  //		Info blue     : textcolor: #31708f;  backgroundcolor: #d9edf7;

*/
  let	healthy = {
  		backgroundcolor : '#47d147', 
  		textcolor: '#0f3d0f',
  		message : 'Patient OK',
  		status : 'Healthy'
  	}
  let	alert = {
  		backgroundcolor : '#ffff00', 
  		textcolor: '#8a6d3b',
  		message : 'Warning...',
  		status : 'Alert'
  	}
  let	danger = {
  		backgroundcolor : '#ff0000', 
  		textcolor: '#fff',
  		message : 'Patient Alert',
  		status : 'Danger'
  	}
  let	info = {
  		backgroundcolor : '#d9edf7', 
  		textcolor: '#31708f',
  		message : 'Info Message',
  		status : 'Info'
  	}



/**
parameter temperature in Celsius
Returns the css color for the temperature value in the UI
*/
export const temperature_color = function(temperature) {

	if (temperature == undefined || temperature == "-")
		return '';
	temp = Number(temperature)
	if(temp >= 36.1 && temp <= 37.8)
		return  ''; //or healthy green?
	else
		return 'color : #fff;  background: red; border-radius:5px; padding:2px;';

}


/**
receives a JSON object with patient data (demographics, data metrics)
Returns a JSON object to display the patient assesment with a certain layout
*/
export const patient_assesment = function(patientdata){
	let temp_avg = patientdata === undefined || patientdata.temperature === undefined ? '-' : patientdata.temperature.sum / patientdata.temperature.count;
	// console.log(temp_avg)
	if(temp_avg === '-'){
		return healthy
	}
	else{
		let assesment = healthy;
		temp_avg = Number(temp_avg);
		console.log(temp_avg)
		if(temp_avg <= 36.1 || temp_avg >= 37.8){
			assesment = alert;
			assesment.message = "Check temperature"
		}
		return assesment;
	}

}