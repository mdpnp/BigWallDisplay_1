//patient_info_ui.js
/*
This class has functionality to improve the layout of the patinet info tile


  //  - color : background color to display in the UI: 
  //		Healthy green : textcolor: '#0f3d0f, backgroundcolor : '#47d147', 
  //		Alert Yellow  : textcolor: #8a6d3b,  backgroundcolor: #ffff00;
  //		Danger Red    : textcolor: #fff, 	 backgroundcolor: #ff0000;
  //		Info blue     : textcolor: #31708f;  backgroundcolor: #d9edf7;

*/

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