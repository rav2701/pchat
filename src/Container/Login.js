import React from 'react';
import { withRouter } from 'react-router';
import { login, googleLogin, loginUsingEmailPassword, errorMessage } from '../store';
import Login from '../Component/Login';
import firebase from 'firebase';

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showOTP:false
		};
	}

	componentDidMount() {}

	loginAnnonymous = () => {
		login();
	};
	viaGoogleLogin = () => {
		googleLogin();
	};
	phoneLogin = (phoneNumber) =>{
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"sign-in-button",
			{
			  size: "invisible",
			  callback: function(response) {
				// reCAPTCHA solved, allow signInWithPhoneNumber.
				console.log("test", response);
				return response;
			  }
			}
		  );
		  var appVerifier = window.recaptchaVerifier;
		  return firebase
			.auth()
			.signInWithPhoneNumber("+91" + phoneNumber, appVerifier)
			.then(confirmationResult => {
			  // SMS sent. Prompt user to type the code from the message, then sign the
			  // user in with confirmationResult.confirm(code).
			  this.setState({verificationId:confirmationResult.verificationId, showOTP:true});
			  this.verificationId = confirmationResult.verificationId;
			  console.log(this.verificationId);
			})
			.catch(error => {
			  this.verificationId = null;
			  console.log("web phone auth", error);
			  return error;
			});
	}
	verifyOTP = async (otp) =>{
		if (this.verificationId !== null) {
			console.log("inside otp 1", this.verificationId);
			var credential = await firebase.auth.PhoneAuthProvider.credential(
			  this.verificationId,
			  otp
			);
			console.log("inside otp 2", credential);
	  
			return firebase
			  .auth()
			  .signInAndRetrieveDataWithCredential(credential)
			  .then(result => {
				console.log(result);
			  })
			  .catch(error => {
				//this.verificationId = null;
	  
				if (error === "auth/code-expired") {
				  this.verificationId = null;
				}
				console.log(4, error);
				return error;
			  });
		  }
	}
	render() {
		return <Login login={this.loginAnnonymous} showOTP={this.state.showOTP} googleLogin={this.viaGoogleLogin} phoneLogin={this.phoneLogin} verifyOTP={this.verifyOTP} errorMessage={errorMessage} />;
	}
}
export default withRouter(LoginContainer);
