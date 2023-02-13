import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ChatScreen from './Container/ChatScreen';
import UserList from './Container/UserList';
import NearBy from './Container/NearBy';
import Profile from './Container/Profile';
import OtherUserProfile from './Container/OtherUserProfile';
import Loading from './Component/Loading';
import Login from './Container/Login';
import { auth, users, createNewDbUser , updateUserLocation} from './store';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged(async (loggedInUser) => {
      console.log('inside on auth state changed');
			if (loggedInUser) {
        localStorage.userId = loggedInUser.uid;
				// check if user is logged in
				this.setState({ authUser: loggedInUser });
				users.doc(loggedInUser.uid).onSnapshot(async (doc) => {
					const userVar = loggedInUser;
					if (doc.exists) {
						userVar.db = doc.data();
						await this.setState({ user: userVar }, ()=>{
							if(localStorage.nearestLocation){
								updateUserLocation(loggedInUser);
								}
						});
					} else {
						this.setState({ user: loggedInUser });
						createNewDbUser(loggedInUser);
					}
				});
			} else {
				this.setState({
					user: false
				});
			}
		});
	}
	render() {
		console.log('this.state.user', this.state.user);
		return (
			<Router>
				<div>
					<Redirect
						from="/"
						to={
							this.state.user.uid ? 
								'/profile/:id'
								:
								localStorage.userId ?
								"/loading"
							 	: 
								'/auth'
							
						}
					/>
					
					<Route path="/singelOtherUserProfile/:id" render={(props) => <OtherUserProfile {...props} {...this.state} user={this.state.user && this.state.user} />} />
          			<Route path="/loading" render={(props) => <Loading {...props} {...this.state} />} />
					<Route path="/profile/:id" render={(props) => <Profile {...props} {...this.state} userId={this.state.user.uid ? this.state.user.uid : localStorage.userId} />} />
					<Route path="/userList/:id" render={(props) => <Profile {...props} {...this.state} />} />
					<Route path="/nearBy/:id" render={(props) => <NearBy {...props} {...this.state} />} />
					<Route path="/chatScreen/:id" render={(props) => <ChatScreen {...props} {...this.state} />} />
					<Route path="/auth" render={(props) => <Login {...props} {...this.props} />} />
				</div>
			</Router>
		);
	}
}
export default App;
// export default currentStore(App);
