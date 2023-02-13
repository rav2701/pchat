import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getLocationCordinates } from './method';


var abc = "kuchv";
const startApp = () => {
		getLocationCordinates();
		// if (navigator.geolocation) {
    //   //localStorage.removeItem('nearestLocation');
    //   var result = unirest
		// 			.get(`https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${localStorage.lat}&longitude=${localStorage.lng}&range=0`)
		// 			.header('X-RapidAPI-Key', 'b2c944eeb5msh75d9d3d20ee9e47p173fb6jsn896b94fdbe7b')
		// 			.end(function(result) {
		// 				localStorage.setItem(
		// 					'nearestLocation',
		// 					JSON.stringify({
		// 						currentLocation: result?.body
		// 					})
		// 				);
		// 			});
      // var unirest = require("unirest");

      // var req = unirest("GET", "https://geocodeapi.p.rapidapi.com/GetNearestCities");
      
      // req.query({
      //   "range": "0",
      //   "longitude": localStorage.lat,
      //   "latitude": localStorage.lng
      // });
      
      // req.headers({
      //   "x-rapidapi-key": "b2c944eeb5msh75d9d3d20ee9e47p173fb6jsn896b94fdbe7b",
      //   "x-rapidapi-host": "geocodeapi.p.rapidapi.com",
      //   "useQueryString": true
      // });
      
      
      // req.end(function (res) {
      //   if (res.error) throw new Error(res.error);
      
      //   console.log(res.body);
      // });

		// The passed in function will be fired when a notification subscription property changes.
    ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        document.getElementById('root')
      );
	serviceWorker.unregister();
	// serviceWorker.register();
};

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
if (abc) {
  startApp();
}