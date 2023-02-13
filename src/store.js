import firebase from 'firebase';
import 'firebase/firestore';

const fire = firebase.initializeApp({
	apiKey: 'AIzaSyB528v5va-BU5trRv91XhGE5V6FDr6Wl4Q',
	authDomain: 'pchatapp-15cab.firebaseapp.com',
	databaseURL: 'https://pchatapp-15cab.firebaseio.com',
	projectId: 'pchatapp-15cab',
	storageBucket: 'pchatapp-15cab.appspot.com',
	messagingSenderId: '413748973440',
	appId: '1:413748973440:web:b85b36d398e21bf13c3b65'
});

const firestore = firebase.firestore();
// const set = { timestampsInSnapshots: true }; can be put in later for firebase timestamp change
const settings = {};
firestore.settings(settings);

fire
	.firestore()
	.enablePersistence()
	.then(() => {
		// Initialize Cloud Firestore through firebase
		console.log('Persistence working!');
	})
	.catch((err) => {
		if (err.code === 'failed-precondition') {
			// Multiple tabs open, persistence can only be enabled
			// in one tab at a a time.
			// ...
			console.log('Multiple tabs open. So, no offline persistence for you.');
		} else if (err.code === 'unimplemented') {
			// The current browser does not support all of the
			// features required to enable persistence
			// ...
			console.log('Offline persistence not supported in this browser.');
		}
	});
const db = fire.firestore();
const auth = firebase.auth();
const images = firebase.storage().ref().child('images');
const provider = new firebase.auth.GoogleAuthProvider();
const users = db.collection('users');
const chats = db.collection('chats');
var errorMessage = "";

const updateUserLocation = (user) => {
	if (user) {
		console.log("user data",user);
		users
			.doc(user.uid)
			.update({
				lat:localStorage?.lat || 24.1549,
				lng:localStorage?.lng || 83.7996
			});
	}
};


const createNewDbUser = (user) => {
		if (user) {
			console.log("user data",user);
			users
				.doc(user.uid)
				.set({
					onBoardingDone: false,
					userId: user.uid,
					displayName: '',
					phoneNumber: user?.phoneNumber || '',
					email: user?.email || '',
					gender: '',
					hobbies: '',
					imageURL:'',
					friendList: [],
					friendRequests:[],
					blockList:[],
					photoURL: user?.photoURL || '',
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					lat:localStorage?.lat || 24.1549,
					lng:localStorage?.lng || 83.7996
				})
				.then(() => {
					users.doc(user.uid).get().then((querySnapshot) => {
						console.log(querySnapshot.data());
					});
				});
		}
};
const googleLogin = () => {
	auth.signInWithRedirect(provider);
};
const login = () => {
	auth.signInAnonymously().catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log('errorCode', errorCode);
		console.log('errorMessage', errorMessage);
		// ...
	});
}

const loginUsingEmailPassword = (email,password) => {
	firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    // errorCode = error.code;
    errorMessage = error.message;
  });
}


	// firebase.auth().onAuthStateChanged((user) => {
	// 	console.log('inside authstatechanged');
	// 	if (user) {
	// 		console.log(user);
	// 		users.where('userId', '==', user.uid).get().then((querySnapshot) => {
	// 			if (querySnapshot.size > 0) {
	// 				console.log('user already exists');
	// 			} else {
	// 				users.add({
	// 					onBoardingDone: false,
	// 					userId: user.uid,
	// 					displayName: '',
	// 					email: '',
	// 					photoURL: '',
	// 					createdAt: new Date()
	// 				});
	// 				// .then(() => {
	// 				// 	users.doc(user.uid).get().then((querySnapshot) => {
	// 				// 		console.log(querySnapshot.data());
	// 				// 	});
	// 				// });
	// 			}
	// 		});
	// 	}
	// });
const logOut = () => {
	auth.signOut().then(
		function() {
			//  eslint-disable-line
			console.log('Signed Out');
			localStorage.clear();
		},
		function(error) {
			//  eslint-disable-line
			console.error('Sign Out Error', error);
		}
	);
};

export { auth, db, firestore, images, users, errorMessage, updateUserLocation, logOut, loginUsingEmailPassword, googleLogin, chats, login, createNewDbUser };
