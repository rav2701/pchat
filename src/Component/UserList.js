import React from 'react';
import { withRouter } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import Button from '@material-ui/core/Button';
import Layout from '../Layout/layout';
import { logOut } from '../store';
import Divider from '@material-ui/core/Divider';
import './nearBy.css';
import Sad from './sad';

class App extends React.Component {
	constructor(props) {
		super(props);
		{
			this.state = {
				messages: [],
				message: ''
			};
		}
	}
	componentWillMount() {
		this.initializeData(this.props);
	}
	componentWillReceiveProps(whichProps) {
		this.initializeData(whichProps);
	}
	initializeData = (nextProps) => {
		this.setState({
			messages: nextProps.messages
		});
	};
	handlechange = (event) => {
		this.setState({
			message: event.target.value
		});
	};
	render() {
		return (
            this?.props?.isLoadingUser ? "Loading..." :
            <Layout bottomNavigation selectedValue={1}>
            <div style={{display:"flex", alignItems:"center",justifyContent:"center", marginTop:"30px"}}>
                <h3>Friend List</h3>
				<div style={{position:"fixed", top:"15px", right:"15px"}}>
				<Button variant="contained" color="primary" onClick={e => {e.preventDefault(); logOut(); }} >
					Logout
				</Button>
				</div>
            </div>
             <div style={{display:"flex", height:"calc(100vh - 140px)", overflowY:"scroll", flexDirection:"column"}}>
                {
                    this.props.myData.friendList.length > 0 ?
                    this.props.myData.friendList.map((data) => (
                    <List onClick={e => {e.preventDefault(); this.props.history.push(`/chatScreen/${data.userId}`)}}>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={data.imageURL ? data.imageURL : ""} />
                        </ListItemAvatar>
                        <ListItemText 
							primary={data.displayName ? data.displayName : "No name available"}
						/>
							{/* <span className = "hide-mail-phone-number">{data.email ? data.email : data.displayName ? data.displayName : data.phoneNumber ? data.phoneNumber : "No name available"}</span>
						</ListItemText>	 */}
                    </ListItem>
					<Divider />
                    </List>
                    ))                    
                    : 
					<div style={{display:"flex",height:"100%",width:"100%", flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
					<Sad style={{height:"30px", width:"30px", objectFit:"cover"}} />
					<span style={{display:"flex",alignItems:"center", fontSize:".8rem",margin:"5px", fontWeight:"bolder", justifyContent:"center"}}>Dont be sad ,search friends near by</span>
				  </div>
                }
			</div>
            </Layout>
		);
	}
}

export default withRouter(App);
