import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Layout from '../Layout/layout'; 
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import './profile.css';
import './otherUserProfile.css';
import Button from '@material-ui/core/Button';
import DefaultAvtar from './DefaultAvtar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import {DropzoneDialog} from 'material-ui-dropzone'
import { images } from '../store';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Sad from './sad';
import Happy from './happy';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DoneIcon from '@material-ui/icons/Done';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent:"center",
    alignItems:"center",
    flexWrap: 'wrap',
    // '& > *': {
    margin: "15px",
    height: "50vh",
    // },
  },
  avtar:{
    height: "22vh",
    width:"22vh",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  menuItem:{
    padding:"0px",
    marginBottom:"5px",
  },
  bottomDialog:{
    marginTop:"20px",
  },
  frndRePaper:{
    display: 'flex',
    flexDirection:"column",
    overflowY:"scroll",
    alignItems:"center",
    padding:"10px",
    justifyContent:"flex-start",
    margin: "15px",
    height: "30vh",
    background: 'rgb(238,174,202)',
    background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
  },
  mainGrid:{
    height: "100vh",
    overflowY:"scroll"
  }

}));


function Profile(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openUploadImageDialog, setOpenUploadImageDialog] = React.useState(false);
  const [files, setState] = React.useState(false);
  const [profileImage, setImage] = React.useState(false);
  const classes = useStyles();
  const [friendShipStatus, setFriendShipStatus] = React.useState();
  const [allValues, setAllValues] = React.useState({
		name: '',
    gender: '',
    hobbies: '',
	 });
	  const handlechange = (event) => {
		setAllValues({...allValues, [event.target.name]: event.target.value});
  };
//   React.useEffect(()=>{
//    var friendshipStatus = props?.user?.db?.friendList.find((e) => e.userId === props?.otherUser?.userId);
//     console.log(friendshipStatus);
//     setFriendShipStatus(friendshipStatus);
//   },[this?.props?.user]);

  const handleClick = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };

  const handleOpenImage = () => {setOpenUploadImageDialog(true);}

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () =>{
    setOpenDialog(true)
  }
  const handleCloseDialog = () =>{
    setOpenDialog(false);
  }
  
  const handleCloseDropZone = () => {
    setOpenUploadImageDialog(false);
}

const handleSave = (files) => {
console.log(files)
const file = files[0];
		const type = files[0].type;		
			const ref = images.child(new Date().toString());
			ref.put(file).then(() => {
			  ref.getDownloadURL().then(url => {
				const imageMessageURL = url;
				setImage(url);
				console.log(imageMessageURL);
			  });
			});
    //Saving files to state for further use and closing Modal.
    setState(files);
    setOpenUploadImageDialog(false);
// this.props.sendImage(files)
}

const handleUpdateProfile = () =>{
  const updateValue = {
    name: allValues.name,
    gender: allValues.gender,
    photoURL: profileImage,
    hobbies: allValues.hobbies,
  }
  console.log(updateValue, props.otherUser.userId);
  setOpenDialog(false);
  props.updateProfile(props.otherUser.userId, updateValue);
}

return  props.isLoadingUser ? "Loading..." :
  (
      console.log(props?.user?.db?.friendList),
    <>
    <div style={{position:"fixed", top:"15px", left:"15px"}}>
        <Button variant="contained" color="primary" onClick={e=>{e.preventDefault(); props.history.goBack();}}>Back</Button>
    </div>
      <Grid container className={`${classes.mainGrid} `}>
      <Paper elevation={3} className={`${classes.root} profile userNo`}>
          { props?.otherUser?.photoURL || props?.otherUser?.imageURL ? 
          <Avatar className={classes.avtar} src={props?.otherUser?.imageURL ? props?.otherUser?.imageURL : props?.otherUser?.photoURL} alt="Cindy Baker" />
          :
          <div style={{height:"123px", width:"123px", objectFit:"cover", marginBottom:"30px"}}>
            <DefaultAvtar />
          </div>
          }
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} >
              {
              props.otherUser.displayName !== '' ? 
              <span>{props.otherUser.displayName}</span> 
              : props.otherUser.email !== '' ? 
                <span className="otherhide-phone-number">{props.otherUser.email}</span> 
              : 
                <span className="otherhide-phone-number">{props.otherUser.phoneNumber}</span>
              }
            </Grid>
            <Grid item xs={12}>{`UserNO :- ${parseInt(Math.random() * 100)}`}</Grid>
            <Grid xs={12} container justify="space-around" alignItem="center" className="profileButon">
            <Button style={{margin:"20px"}} variant="contained" color="primary" 
                disabled={props?.user?.db?.friendList && props?.user?.db?.friendList?.length > 0 ? props?.user?.db?.friendList?.find((e) => e.userId === props?.otherUser?.userId) : false} 
                onClick={e=>{e.preventDefault(); props.sendFriendRequest(props?.otherUser);}}
            >
                {
                  props?.user?.db?.friendList && props?.user?.db?.friendList?.length > 0 &&
                 props?.user?.db?.friendList?.find((e) => e.userId === props?.otherUser?.userId) !== undefined ?
                 "Already A Friend" : "Follow"
                }
            </Button>
            <Button variant="outlined" color="primary"
                onClick={e=>{e.preventDefault(); props.blockUser(props?.otherUser);}}
            >
                {
                props?.user?.db?.blockList?.length > 0 &&
                props?.user?.db?.blockList?.find((e) => e.userId === props?.otherUser?.userId) !== undefined ? 
                "Unblock" 
                : 
                "Block" 
                }
            </Button>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>{localStorage.currentLo}</Grid> */}
      </Paper>
      <Grid container direction="row">
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.frndRePaper}>
            <Grid item xs={12}>
                Hey! Dear I Am 
            {
              props.otherUser.displayName !== '' ? 
              <span>  {props.otherUser.displayName}</span> 
              : props.otherUser.email !== '' ? 
                <span className="otherhide-phone-number">  {props.otherUser.email}</span> 
              : 
                <span className="otherhide-phone-number">  {props.otherUser.phoneNumber}</span>
            }
            </Grid>
        <Grid item xs={12}>My Hobbies Are {props.otherUser.hobbies ? props.otherUser.hobbies : "..."}
        </Grid>
      </Paper>
      </Grid>
      </Grid>
      </Grid>
      
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={e => {e.preventDefault(); handleCloseDialog();}}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Edit Profile"}</DialogTitle>
        <DialogActions>
            <Grid container justify="center" alignItems="center" direction="column">
              <Grid item xs={12}>
              <img src={profileImage} alt="" style={{height:"80px", width:"80px", objectFit:"cover"}} onClick={e =>{e.preventDefault(); handleOpenImage();}} />
              </Grid>
              <Grid item xs={12}>
              <TextField onChange={handlechange} id="outlined-basic" name="name" label="Enter Name" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
              <TextField onChange={handlechange} id="outlined-basic" name="gender" label="Gender" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
              <TextField onChange={handlechange} id="outlined-basic" name="hobbies" label="Your Hobbies" variant="outlined" />
              </Grid>
              <Grid className={classes.bottomDialog} container justify="space-around" alignItems="center">
                <Button onClose={e => {e.preventDefault(); handleCloseDialog();}} color="primary">
                cancel
              </Button>
              <Button onClick={e => {e.preventDefault();handleUpdateProfile();}} color="primary">
                update
              </Button>
              </Grid>
              </Grid>

          
        </DialogActions>
      </Dialog>

        <DropzoneDialog
          open={openUploadImageDialog}
          onSave={handleSave}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={handleCloseDropZone}
        />
    </>
  
  );
}

export default withRouter(Profile);