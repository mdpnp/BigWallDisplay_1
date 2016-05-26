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

	//properties from te patient assesment
	let temp_avg = patientdata === undefined || patientdata.temperature === undefined ? '-' : patientdata.temperature.sum / patientdata.temperature.count;
	let bp_sys_avg = patientdata === undefined || patientdata.blood_pressure_sys === undefined ? '-' : patientdata.blood_pressure_sys.sum / patientdata.blood_pressure_sys.count;
    let bp_dias_avg = patientdata === undefined || patientdata.blood_pressure_dias === undefined ? '-' : patientdata.blood_pressure_dias.sum / patientdata.blood_pressure_dias.count;
    let hr_avg = patientdata === undefined || patientdata.heart_rate === undefined ? '-' : patientdata.heart_rate.sum / patientdata.heart_rate.count;
    let spo2_avg = patientdata === undefined || patientdata.spo2 === undefined ? '-' : patientdata.spo2.sum / patientdata.spo2.count;
    let pr_avg = patientdata === undefined || patientdata.pulse_rate === undefined ? '-' : patientdata.pulse_rate.sum / patientdata.pulse_rate.count;

    let assesment = healthy; //basic assesment
    let message = ''; //message to be displayed with the assesment

    //BLOOD PRESSURE

    /* 
    Systolic in mmHg    Diastolic in mmHg  Category
    below 120				below 80		Normal blood pressure
    120 - 139				80 - 39			Prehyertension
    140 - 159				90 - 99			Stage 1 hypertension
    160 or higher			100 or higher   Stage 2 Hyperension

    */
    if(bp_sys_avg  <= 120  && bp_dias_avg <= 80 ){
		message += " Normal Blood Pressure ";
    }else if( (bp_sys_avg  >= 120 && bp_sys_avg  <= 139) && 
    	(bp_dias_avg >= 80  && bp_dias_avg <= 89 )){
    	//prehypertension
	    // assesment = alert;
	    message += " Prehypertension ";
	} else if( (bp_sys_avg  >= 140 && bp_sys_avg  <= 159) && 
    		   (bp_dias_avg >= 90  && bp_dias_avg <= 99 )){
    	//Stage 1 prehypertension
	    assesment = alert;
	    message += " Stage 1 Hypertension ";
	} else if(bp_sys_avg  >= 160  && bp_dias_avg >= 100 ){
    	//prehypertension
	    assesment = danger;
	    message += " Stage 2 Hypertension ";
	}



	if(temp_avg === '-'){
		return healthy
	}
	else{
		
		temp_avg = Number(temp_avg);
		if(temp_avg <= 36.1 || temp_avg >= 37.8){
			assesment = alert;
			assesment.message = "Check temperature"
		}
		return assesment;
	}

}