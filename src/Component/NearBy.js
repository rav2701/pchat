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
import './nearBy.css';
import Divider from '@material-ui/core/Divider';

class NearBy extends React.Component {
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
            this?.props?.isLoadingDistance ? "Loading..." :
            <Layout bottomNavigation selectedValue={2}>
            <div style={{display:"flex", alignItems:"center",justifyContent:"center", marginTop:"30px"}}>
                <h3>Near By</h3>
				<div style={{position:"fixed", top:"15px", right:"15px"}}>
				<Button variant="contained" color="primary" onClick={e => {e.preventDefault(); logOut(); }} >
					Logout
				</Button>
				</div>
            </div>
             <div style={{display:"flex", height:"calc(100vh - 140px)", overflowY:"scroll", flexDirection:"column"}}>
                {
                    this?.props?.allUserDistanceWise?.length > 0 ?
                    this?.props?.allUserDistanceWise?.map((data) => (
                    <List className={data?.displayName ? null : "nearBy"} onClick={e => {e.preventDefault(); this.props.history.push(`/singelOtherUserProfile/${data.userId}`)}}>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={data.imageURL ? data.imageURL : data.photoURL && data.photoURL} />
                        </ListItemAvatar>
                        <ListItemText
							
							primary={data.displayName ? data.displayName : data.email ? data.email : data.phoneNumber ? data.phoneNumber : "No name available"}
							secondary={data.distance ? `${data.distance} : Km Away from You` : "Mars : Km Away from You"}
						/>
                    </ListItem>
					<Divider />
                    </List>
                    ))                    
                    : "Awwwwww no user found yet"
                }
			</div>
            </Layout>
		);
	}
}

export default withRouter(NearBy);
