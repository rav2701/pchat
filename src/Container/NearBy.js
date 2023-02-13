import React from 'react';
import { withRouter } from 'react-router';
import NearBy from '../Component/NearBy';
import { auth, users, createNewDbUser, db } from '../store';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            allUsers: [],
            isLoadingUser:true,
            isLoadingDistance: false,
        };
        const myData="";
	}

	componentWillMount() {
		users.onSnapshot((querySnapshot) => { //sent frnd request
			console.log('onsnapShot', querySnapshot);
            let allUsers = [];
			querySnapshot.forEach(async (doc) => {
				if (doc.exists) {
					const singleUser = doc.data();
					singleUser.id = doc.id;
					if(this.props.user.uid === doc.data().userId){
                        window.myData=doc.data();
                    }
                    else{allUsers.push(singleUser);}
				}
            });
            this.setState({ allUsers, isLoadingUser:false }, ()=>{this.calculateDistance(allUsers);});
		});
	}

    calculateDistance =(allUsers)=>{
        const allUserDistanceWise = [];
        var mylat=window.myData.lat;
        var mylng=window.myData.lng;

        allUsers.map((data)=>{
            var userLat = data.lat;
            var userLng = data.lng;
            const distance = this.calcCrow(mylat,mylng,userLat,userLng).toFixed(1);
            console.log(distance);
            const singleUser = data;
            singleUser.distance = distance;
            allUserDistanceWise.push(singleUser);
    });
    this.setState({allUserDistanceWise, isLoadingDistance:false});

}
 calcCrow = (lat1, lon1, lat2, lon2) => {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var lat1 = this.toRad(lat1);
      var lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
     toRad = (Value) => {
        return Value * Math.PI / 180;
    }

	render() {
		return (
			<NearBy
                users={this.state.allUsers && this.state.allUsers}
                user={this.props.user}
                isLoadingUser={this.state.isLoadingUser}
                isLoadingDistance={this.state.isLoadingDistance}
                allUserDistanceWise={this.state.allUserDistanceWise}
			/>
		);
	}
}
export default withRouter(App);
