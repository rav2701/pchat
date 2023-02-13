import React, { useState } from 'react';
import { withRouter } from 'react-router';
import './Login.css';
import { RWebShare } from "react-web-share";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	paper: {
	//   padding: theme.spacing(2),
	  textAlign: 'center',
	  height:"45vh",
	  maxWidth: "100%",
	  padding:"10px",
	  maxHeight: "45vh",
	  color: theme.palette.text.secondary,
	},
	paperSignIn: {
		// padding: theme.spacing(2),
		textAlign: 'center',
		display:"flex",
		alignItems:"center",
		justifyContent:"space-around",
		flexDirection:"column",
		height:"45vh",
		fontSize:"14px",
		fontWeight:"bolder",
		padding:"10px",
		maxWidth: "100%",
		maxHeight: "45vh",
		color: 'white',
	  },
  }));
 const LoginContainer  = (props) => {
	const [allValues, setAllValues] = useState({
		email: '',
		password: '',
	 });
	 const [open, setState] = React.useState(false);
	  const handlechange = (event) => {
		setAllValues({...allValues, [event.target.name]: event.target.value});
	};
	const handleClose = () => {
		setState(false);
	  };
	  const handleOpen = () => {
		setState(true);
	  };

		const classes = useStyles();
		return (
			<>
			<Grid container xs={12} className="mainBody">
				<Grid className="signInDiv" container xs={12} lg={6}>
				<Grid container alignItems="center" justify="center" direction="column">
				<Paper className={classes.paper}>
						<h1>Sign in</h1>
						<Grid>
							<Grid item xs={12}
							>
							<img 
								onClick={(e) => {
									e.preventDefault();
									props.googleLogin();
									}}
								src="gplus.png" 
								style={{objectFit:"cover",height:"30px", width:"30px",borderRadius:"50% " }}
							/>
							</Grid>
						</Grid>
						<span>OR Use Phone Number Login</span>
						<input type="tel" name="phoneNumber" onChange={handlechange} placeholder="Phone Number"  />
						<input type="number" name="otp" onChange={handlechange} placeholder="OTP"  />
						<a href="#">Forgot your password?</a>
						<Grid item xs={12}>
							<button 
							id='sign-in-button'
							onClick={e=>{
								e.preventDefault();
								props.showOTP ? props.verifyOTP(allValues.otp) : props.phoneLogin(allValues.phoneNumber)
								}}
							>
							{props.showOTP ? "Sign In" : "Send OTP"}
							</button>
						</Grid>
					</Paper>
					</Grid>
				</Grid>
				<Grid className="signInDiv" container xs={12} lg={6}>
					<Grid container alignItems="center" justify="center" direction="column">
					<Paper className={`${classes.paperSignIn} overlay`}>
						<Grid item><h1>Hello, Friend!</h1></Grid >
						<Grid container alignItems="center" justify="center">
							<span>Enter your personal details and INVITE friends by</span>
							<RWebShare
								data={{
								text: "Like humans, pchat_app make friends for life",
								url: "https://pchatapp-15cab.firebaseapp.com/",
								title: "Pchat_app",
								}}
								onClick={() => console.log("shared successfully!")}
							>
								<span> SHARING <u>(PCHAT_APP)</u> 🔗  and start Chating with them</span>
							</RWebShare>
							
						</Grid>
						<Grid>
							<button class="ghost" id="signUp" onClick={(e) => {
								e.preventDefault();
								props.googleLogin();
								}}
							>
							Google Login
							</button>
						</Grid>
					</Paper>
					</Grid>
				</Grid>
				
				<Snackbar
					open={open}
					onClose={handleClose}
					message="Please try logging in with Google"
				/>	
				<footer>
				<Grid item xs={2}style={{color:"grey", position:"fixed", bottom:"10px", left:"15px"}}>
				Version No: 1.0.2
				</Grid>
					<p>
						Created <i class="fa fa-heart"></i> by
						Mayank Aditya
						- Join me on linkedin  
						<a target="_blank" href="https://www.linkedin.com/in/mayank-aditya-936296131"> Click Here</a>.
					</p>
				</footer>		
			</Grid>
			</>
			
		);
}
export default withRouter(LoginContainer);
