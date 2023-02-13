import React from 'react';
import { withRouter } from 'react-router';
import ChatScreen from '../Component/ChatScreen';
import firebase from 'firebase';
import { auth, chats, createNewDbUser, db, firestore, images } from '../store';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chats: [],
			realTimeAllChats: [],
			messages: [],
			
		};
	}	

	clearChat = (chatId) =>{
		db
		  .collection("chats")
		  .doc(chatId)
		  .update({
			  lastArchiveAt:firebase.firestore.FieldValue.serverTimestamp(),
		  })
	}
	  sendImage = (fileToUpload) => {
		const file = fileToUpload[0];
		const type = fileToUpload[0].type;		
			const ref = images.child(new Date().toString());
			ref.put(file).then(() => {
			  ref.getDownloadURL().then(url => {
				const imageMessageURL = url;
				this.setState(
				  { imageMessageURL, messageText: "", localImage: false },
				  () => {
					this.sendMessage(type, imageMessageURL);
				  }
				);
				console.log(imageMessageURL);
			  });
			});
	  };
	
	  sendMessage = async (type,imageMessageURL) => {
		var chatId = `${this.props.match.params.id}_${this.props.user.uid}`;
		var chatId1 = `${this.props.user.uid}_${this.props.match.params.id}`;
		const cahtExists = await this.state.allChats.find(e => {return e.chatId === chatId || e.chatId === chatId1});
		if(cahtExists) {	
		db
		  .collection("chats")
		  .doc(cahtExists.chatId)
		  .get()
		  .then(doc => {
			if (doc.exists) {
			  doc.ref
				.collection("messages")
				.add({
					title: "",
					type:type,
					messageMediaURL:imageMessageURL,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					createdBy: this.props.user.uid,
					userId: this.props.user.uid,
					photoURL: this.props.user.photoURL
				})
				.then(() => {
				  console.log("chat send", doc.data());
				});
			}
		  });
		this.setState({ value: "" });
	  }
	  else {
		db
		.collection('chats')
		.doc(`${this.props.match.params.id}_${this.props.user.uid}`)
		.set({
			userId: this.props.user.uid,
			otherpersonId: this.props.match.params.id,
			chatId:`${this.props.match.params.id}_${this.props.user.uid}`,
			blockedBy:'',
			lastArchiveAt:firebase.firestore.FieldValue.serverTimestamp(),
		})
		.then((doc) => {
		db
			.collection('chats')
			.doc(`${this.props.match.params.id}_${this.props.user.uid}`)
			.collection('messages')
			.add({
				title: "",
				type:type,
				messageMediaURL:imageMessageURL,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				createdBy: this.props.user.uid,
				userId: this.props.user.uid,
				photoURL: this.props.user.photoURL
			});
		});
	  }
	};
	 componentDidMount() {
		var chatId = `${this.props.match.params.id}_${this.props.user.uid}`
		var chatId1 = `${this.props.user.uid}_${this.props.match.params.id}`
		var allChats =[];
		db.collection('chats').get().then((snap)=>{
			snap.forEach((doc) =>{
				if(doc.exists){
					const singleChat=doc.data();
					singleChat.id=doc.id;
					allChats.push(singleChat);
				}
			});
				this.setState({allChats});
		}).then( ()=>{
			const singleChatId =  allChats.find(e => {return e.chatId === chatId || e.chatId === chatId1});
			console.log("this is chat id",singleChatId);
			this.setState({singleChatId});
			if(singleChatId){
			db.collection('chats')
			.doc(singleChatId.id)
			.collection('messages')
			.orderBy("createdAt", "asc")
			.startAt(singleChatId?.lastArchiveAt)
			.onSnapshot((querySnapshot) => {
				console.log("size message ka",querySnapshot.size);
						const messages = [];
						querySnapshot.forEach((mess) => {
							if (mess.exists) {
								const singleMessage = mess.data();
								singleMessage.id = mess.id;
								messages.push(singleMessage);
								
							}
						});
						this.setState({ messages });
					});
			}
		});	
	}
	blockUser =  (userId, otherpersonId) =>{
		var chatId = `${this.props.match.params.id}_${this.props.user.uid}`;
		var chatId1 = `${this.props.user.uid}_${this.props.match.params.id}`;
		const singleChatId =  this.state.allChats.find(e => {return e.chatId === chatId || e.chatId === chatId1});
			if(singleChatId){
				db.collection('chats').doc(singleChatId.id).update({
					blockedBy:this.props.user.uid
				});
			}
	}
	unBlockUser =  (userId, otherpersonId) =>{
		var chatId = `${this.props.match.params.id}_${this.props.user.uid}`;
		var chatId1 = `${this.props.user.uid}_${this.props.match.params.id}`;
		const singleChatId =  this.state.allChats.find(e => {return e.chatId === chatId || e.chatId === chatId1});
			if(singleChatId){
				db.collection('chats').doc(singleChatId.id).update({
					blockedBy:''
				});
			}
	}

	addMessage = async (message, userId, otherpersonId) => {
		var chatId = `${this.props.match.params.id}_${this.props.user.uid}`;
		var chatId1 = `${this.props.user.uid}_${this.props.match.params.id}`;
		const cahtExists = await this.state.allChats.find(e => {return e.chatId === chatId || e.chatId === chatId1});
			if (cahtExists) {		
				db.collection('chats').doc(cahtExists.chatId).collection('messages').add({
						title: message,
						type:"",
						messageMediaURL:"",
						createdAt: firebase.firestore.FieldValue.serverTimestamp(),
						createdBy: this.props.user.uid,
						userId: this.props.user.uid,
						photoURL: this.props.user.photoURL
				}).then(()=>console.log("success")).catch((err)=>console.log(err));
			} 
			else {
				db
					.collection('chats')
					.doc(`${otherpersonId}_${userId}`)
					.set({
						userId: this.props.user.uid,
						otherpersonId: this.props.match.params.id,
						chatId:`${otherpersonId}_${userId}`,
						blockedBy:'',
						lastArchiveAt:firebase.firestore.FieldValue.serverTimestamp()
					})
					.then((doc) => {
						db
							.collection('chats')
							.doc(`${otherpersonId}_${userId}`)
							.collection('messages')
							.add({
								title: message,
								type:"",
								messageMediaURL:"",
								createdAt: firebase.firestore.FieldValue.serverTimestamp(),
								createdBy: this.props.user.uid,
								userId: this.props.user.uid,
								photoURL: this.props.user.photoURL
							});
					});
			}
	};

	render() {
		return (
			<ChatScreen
				messages={this.state.messages && this.state.messages}
				singleChat={this.state.singleChatId && this.state.singleChatId}
				addMessage={this.addMessage}
				user={this.props.user}
				blockUser={this.blockUser}
				unBlockUser={this.unBlockUser}
				sendImage={this.sendImage}
				clearChat={this.clearChat}
			/>
		);
	}
}
export default withRouter(App);
