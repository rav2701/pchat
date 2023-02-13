import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Layout from '../Layout/layout'; 
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import './profile.css';
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
    width:"100%"
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
    justifyContent:"flex-start",
    margin: "15px",
    height: "30vh",
    background: 'rgb(238,174,202)',
    background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
  },
  mainGrid:{
    height: "calc(100vh - 54px)",
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
  const [allValues, setAllValues] = React.useState({
		name: '',
    gender: '',
    hobbies: '',
	 });
	  const handlechange = (event) => {
		setAllValues({...allValues, [event.target.name]: event.target.value});
  };
  
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
  console.log(updateValue, props.myData.userId);
  setOpenDialog(false);
  props.updateProfile(props.myData.userId, updateValue);
  

}

  return (
    <Layout bottomNavigation selectedValue={0}>
      <Grid container className={classes.mainGrid}>
      <Paper elevation={3} className={`${classes.root} profile userNo`}>
          <IconButton onClick={e =>{e.preventDefault(); handleClick(e); }} style={{position:"fixed", top:"25px", right:"35px"}} aria-label="display more actions" edge="end" color="inherit">
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem className="menuItem" onClick={e => {e.preventDefault();handleEditProfile(); }}>Edit Profile</MenuItem>
            
            <MenuItem className="menuItem" onClick={handleClose}>Logout</MenuItem>
          </Menu>
          { props?.myData?.photoURL || props?.myData?.imageURL ? 
          <Avatar className={classes.avtar} src={props?.myData?.imageURL ? props?.myData?.imageURL : props?.myData?.photoURL} alt="Cindy Baker" />
          :
          <div style={{height:"123px", width:"123px", objectFit:"cover", marginBottom:"30px"}}>
            <DefaultAvtar />
          </div>
          }
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              {
              props.myData.displayName !== '' ? 
              <span>{props.myData.displayName}</span> 
              : props.myData.email !== '' ? 
                <span>{props.myData.email}</span> 
              : 
                <span className="hide-phone-number">{props.myData.phoneNumber}</span>
              }
            </Grid>
            <Grid item xs={12}>{`UserNO :- ${parseInt(Math.random() * 100)}`}</Grid>
            <Grid xs={12} container justify="space-around" alignItem="center" className="profileButon">
            <Button style={{margin:"20px"}} variant="contained" color="primary" onClick={e=>{e.preventDefault(); this.props.history.goBack();}}>Follow</Button>
            <Button variant="outlined" color="primary" onClick={e=>{e.preventDefault(); this.props.history.goBack();}}>Block</Button>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>{localStorage.currentLo}</Grid> */}
      </Paper>
      <Grid container direction="row">
      <Grid item xs={6}>
        <Paper elevation={3} className={classes.frndRePaper}>
         Friend Requests
         {props?.myData?.friendRequests?.length > 0 ?
         props?.myData?.friendRequests?.map((data) => 
         <Grid container justify="flex-start" alignItems="center">
           <List className="profile">
              <ListItem>
                  <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={data.photoURL && data.photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    className="list"
                    primary={data.displayName ? data.displayName : "Unknown"}
                    secondary="Friend Request" //{data?.message !=='' ? data?.message : "Friend Request"}
                  />
                  <ListItemSecondaryAction style={{position:"relative", top:"15%",left:"5%"}}>
                    <IconButton onClick={e => {e.preventDefault(); props.acceptRequest(data); e.stopPropagation();}} className="list" edge="end" aria-label="delete">
                      
                    <DoneIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                  <ListItemSecondaryAction style={{position:"absolute", bottom:"15%"}}>
                    <IconButton onClick={e => {e.preventDefault(); props.deleteRequest(data); e.stopPropagation();}} className="list" edge="end" aria-label="delete">
                      
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                 
              </ListItem>
              <Divider />
            </List>
         </Grid>
         )
         :
          <div style={{display:"flex",height:"100%",width:"100%", flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
          <Sad style={{height:"30px", width:"30px", objectFit:"cover"}} />
          <span style={{display:"flex",alignItems:"center", justifyContent:"center"}}>No Friend Request</span>
        </div>
         }
      </Paper>
      </Grid>
        <Grid item xs={6}>
        <Paper elevation={3} className={classes.frndRePaper}>
         Block List
         {props?.myData?.blockList?.length > 0 ?
         props?.myData?.blockList?.map((data) => 
         <Grid container justify="flex-start" alignItems="center">
           <List className="profile" onClick={e => {e.preventDefault(); this.props.history.push(`/chatScreen/${data.userId}`)}}>
              <ListItem>
                  <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={data.photoURL && data.photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    className=""
                    primary={data.name ? data.name : "Unknown"}
                    secondary={data?.message !=='' ? data?.message : "Sent You A Friend Request"}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </List>
         </Grid>
         )
        :
        <div style={{display:"flex",height:"100%",width:"100%",flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
          <Happy style={{height:"30px", width:"30px", objectFit:"cover"}} />
        <span style={{display:"flex",alignItems:"center", justifyContent:"center"}}>Empty Here</span>
        </div>
        }
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
    </Layout>
  );
}
export default Profile;