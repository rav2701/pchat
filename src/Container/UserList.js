import React from 'react';
import { withRouter } from 'react-router';
import UserList from '../Component/UserList';
import { auth, users, createNewDbUser, db } from '../store';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            allUsers: [],
            isLoadingUser:true,
		};
	}

	componentWillMount() {
		users.onSnapshot((querySnapshot) => { //sent frnd request
			console.log('onsnapShot', querySnapshot);
			let allUsers = [];
			querySnapshot.forEach(async (doc) => {
				if (doc.exists) {
					const singleUser = doc.data();
					singleUser.id = doc.id;
					if(this.props.user.uid === doc.data().userId){}
                    else{allUsers.push(singleUser);}
				}
            });
            this.setState({ allUsers, isLoadingUser:false });
		});
	}

	render() {
	
		return (
			<UserList
                users={this.state.allUsers && this.state.allUsers}
                user={this.props.user}
                isLoadingUser={this.state.isLoadingUser}
			/>
		);
	}
}
export default withRouter(App);
