import React from 'react';
import { withRouter } from 'react-router';
import { Route } from "react-router-dom";
import Profile from '../Component/Profile';
import UserList from '../Component/UserList';
import { auth, users, createNewDbUser, db } from '../store';


class HomeContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            allUsers: [],
            myData: false,
            isLoadingUser:true,
            currentUserFriendList:[],
		};
	}

    componentWillReceiveProps(whichProps){
this.initialiseProps(whichProps);
    }
	 componentWillMount() {
    const currentUserFriendList= this?.props?.user?.db?.friendRequests;
    const currentUserFriendReq= this?.props?.user?.db?.friendRequests;
    this.setState({currentUserFriendList,currentUserFriendReq});
        this.initialiseProps(this.props);            
	}
initialiseProps = (nextProps) => {
    console.log(nextProps);
    users.onSnapshot((snap) => { 
        console.log(snap.size);
        const allUsers = [];
        snap.forEach((doc) => {
        if (doc.exists) {
            console.log(doc.id);
            const singleUser = doc.data();
            singleUser.id = doc.id;
            allUsers.push(singleUser);
            
        }
    });
    const myData = allUsers.find((e) => e.userId === nextProps.user.uid);
        console.log("myData",myData)
        this.setState({myData});
    this.setState({ allUsers, isLoadingUser:false });

    });
}
updateProfile = (userId, value) => {
    db.collection("users")
    .doc(userId)
    .update({
        displayName:value.name,
        imageURL:value.photoURL,
        gender:value.gender,
        hobbies: value.hobbies,
    })
}
acceptRequest = (data) =>{
  var myFriendList = new Set();
  if(this?.state?.currentUserFriendList !== undefined){
  myFriendList.add(this?.state?.currentUserFriendList);
  myFriendList.add([data]);
  console.log("inside if",[...myFriendList]);
  }
  else{
      myFriendList.add(data);
  }

 users.doc(this?.props?.user?.uid).set({friendList:Array.from(myFriendList).flat(Infinity)},{merge:true}).then(() =>this.deleteRequest(data));
}

deleteRequest = (data) =>{
console.log(this?.state?.currentUserFriendReq);

var updateArray=[];
for (const element of this?.state?.currentUserFriendReq) {
  if(element.userId === data.userId){

  }
  else{
    updateArray.push(element);
  }
}

users.doc(this?.props?.user?.uid).set({friendRequests:updateArray},{merge:true});
}
	render() {
        const { isLoadingUser } =this.state;
		return (
        <div>
        {isLoadingUser ? "Loading..." : (
          <Route
            exact
            path="/userList/:id"
            render={props => (
              <UserList
                {...props}
                myData={this.state.myData && this.state.myData}
                allUsers={this.state.allUsers && this.state.allUsers}
                isLoadingUser={this.state.isLoadingUser}
                updateProfile={this.updateProfile}
              />
            )}
          />
        )}
        {isLoadingUser ? "Loading..." : (
        <Route
          exact
          path="/profile/:id"
          render={props => (
            <Profile
                {...props}
                myData={this.state.myData && this.state.myData}
                allUsers={this.state.allUsers && this.state.allUsers}
                isLoadingUser={this.state.isLoadingUser}
                updateProfile={this.updateProfile}
                acceptRequest={this.acceptRequest}
                deleteRequest={this.deleteRequest}
			/>
          )}
        />
        )}
        </div>
		);
	}
}
export default withRouter(HomeContainer);
