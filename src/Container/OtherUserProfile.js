import { initializeApp } from 'firebase';
import React from 'react';
import { withRouter } from 'react-router';
import OtherUserProfile from '../Component/OtherUserProfile';
import { auth, users, createNewDbUser, db } from '../store';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            isLoadingUser:true,
            isLoadingMydata:true,
            currentUserFriendReq:[],
		};
	}

	componentWillMount() {
        this.initializeUser(this.props);
        const currentUserFriendReq= this?.props?.user?.db?.friendRequests;
		users.doc(this?.props?.match?.params?.id).get().then((doc) => { //sent frnd request
			console.log('onsnapShot', doc.data());
				if (doc.exists) {
					const otherUser = doc.data();
					otherUser.id = doc.id;
                    this.setState({ otherUser,currentUserFriendReq, isLoadingUser:false });
            }
        });
           
    }
    componentWillReceiveProps(whichProps){
        this.initializeUser(whichProps);
    }
    initializeUser =(nextProps) =>{
        this.setState({user: nextProps.user, isLoadingMydata:false});
    }
    sendFriendRequest = (otherUser) =>{
        console.log(this?.props?.user);
        const friendRequest = {
            photoURL:otherUser.imageURL ? otherUser.imageURL : otherUser.photoURL || '',
            displayName:otherUser.displayName ? otherUser.displayName : otherUser.email ? otherUser.email : otherUser.phoneNumber || '',
            userId:otherUser.userId,
            message: "sent you friend request"
        }
        var myFriendRequest = new Set();
        console.log(this?.state?.currentUserFriendReq);
        if(this?.state?.currentUserFriendReq !== undefined){
        myFriendRequest.add(this?.state?.currentUserFriendReq);
        myFriendRequest.add([friendRequest]);
        console.log("inside if",[...myFriendRequest]);
        }
        else{
            myFriendRequest.add(friendRequest);
        }

       console.log("after first user value inserted",Array.from(myFriendRequest).flat(Infinity));
       users.doc(this?.props?.user?.uid).set({friendRequests:Array.from(myFriendRequest).flat(Infinity)},{merge:true});
        
    }
    blockUser =(otherUser) =>{
        const blockList = {
            photoURl:otherUser.imageURL ? otherUser.imageURL : otherUser.photoURL || '',
            displayName:otherUser.displayName ? otherUser.displayName : otherUser.email ? otherUser.email : otherUser.phoneNumber || '',
            userId:otherUser.userId,
            message: "blocked"
        }
        var allBlockedUser = this?.props?.user.db.blockList;
        if(allBlockedUser.find((e) => e.userId === otherUser.userId)){
// remove object
    console.log(allBlockedUser);
    var abc = allBlockedUser.splice(allBlockedUser.find((e) => e.userId === otherUser.userId), 1);
    console.log(abc);
        }
        else{
            console.log(allBlockedUser);
            allBlockedUser.push(blockList);
            console.log(allBlockedUser);
        }
        
        users.doc(this?.props?.user?.uid).
        update({
            blockList: allBlockedUser
        });
    }    

	render() {
	
		return (
			<OtherUserProfile
                otherUser={this.state.otherUser && this.state.otherUser}
                sendFriendRequest={this.sendFriendRequest}
                blockUser={this.blockUser}
                user={this.state.user}
                isLoadingUser={this.state.isLoadingUser}
			/>
		);
	}
}
export default withRouter(App);
