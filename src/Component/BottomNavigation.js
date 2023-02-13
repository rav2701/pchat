import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './bottomnav.css';

const useStyles = makeStyles({
  root: {
    position:"fixed",
    width:"100%",
    bottom:"0px",
    background: "rgb(34,193,195)",
    background: "radial-gradient(circle, rgba(34,193,195,1) 34%, rgba(253,187,45,1) 93%)"
    
  },
});

const BottomNav = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  useEffect(() => setValue(props.selectedValue),[value]);

  return (
    <BottomNavigation
      value={value}
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }}
      showLabels
      className={`${classes.root} bottomNav `}
    >
      <BottomNavigationAction 
      onClick={(e) => {
        e.preventDefault();
        props.history.push('/profile/id');
      }}
      label="Home" icon={<HomeIcon />} 
      />
      <BottomNavigationAction 
      onClick={(e) => {
        e.preventDefault();
        props.history.push('/userList/id');
    }}
      label="Chats" icon={<ChatIcon />} />
      <BottomNavigationAction 
      onClick={(e) => {
        e.preventDefault();
        props.history.push('/nearBy/id');
    }}
      label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}
export default withRouter(BottomNav);