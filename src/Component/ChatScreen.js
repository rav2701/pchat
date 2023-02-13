import React from 'react';
import { withRouter } from 'react-router';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Img from "react-image";
import CircularProgress from "@material-ui/core/CircularProgress";
// import moment from "moment";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AttachmentIcon from '@material-ui/icons/Attachment';
import {DropzoneDialog} from 'material-ui-dropzone'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './chatScreen.css';
import AttachFile from "@material-ui/icons/AttachFile";
import Send from "@material-ui/icons/Send";
import Avatar from '@material-ui/core/Avatar';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });
class App extends React.Component {
	constructor(props) {
		super(props);
		{
			this.state = {
				messages: [],
				message: '',
				open: false,
				files: [],
				chatQuestion: [
					{ question: "How are you?" },
					{ question: "Are you intrested to chat ?" },
					{ question: "Send me your number" },
					{ question: "What you do?" },
					{ question: "Lets meet" },
					{ question: "Send me some pics " }
				  ]
			};
		}
	}
	handleCloseDropZone() {
        this.setState({
            open: false
        });
    }
 
    handleSave(files) {
		console.log(files)
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
		});
		this.props.sendImage(files)
    }
	notify = () => toast("Chat clear successfully");
    handleOpen() {
        this.setState({
            open: true,
        });
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
	componentDidMount() {
		this.scrollToBottom();
	  }
	  openImageDilog = (imageURL) =>{
		  this.setState({openDialog:true, currentImage:imageURL});
	  }
	  handleClose = () => {
		this.setState({openDialog:false});
	  };
	  componentDidUpdate() {
		this.scrollToBottom();
	  }
	  scrollToBottom = () => {
		var elmnt = document.getElementById("myDiv");
		elmnt.scrollIntoView();
		//   console.log(this.messagesEnd);
		// const node = ReactDOM.findDOMNode(this.messagesEnd);
		// node && node.scrollIntoView({ behavior: "smooth", block: "end" });
	  };
	render() {
	
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: "100vh",
					width: '100%',
				}}
			>
			
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
						// background: 'radial-gradient(black, transparent)',
						height: 'calc(100vh - 137px)',
						flexDirection: 'column',
						justifyContent: 'sapce-between',
						overflowY: 'scroll',
						overflowX: 'hidden'
					}}
				>
					<div
						style={{
						height: "7vh",
						width:"100%",
						position:"fixed",
						top:"5px",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding:"0px 5px"
					}}
				>
				<Button variant="contained" color="primary" onClick={e=>{e.preventDefault(); this.props.history.goBack();}}>Back</Button>
             	<Avatar  src={this.props?.user?.imageURL ? this.props?.user?.imageURL : this.props.user.photoURL} alt="Cindy Baker" />
				 <Button 
					variant="contained"
					color="primary"
					onClick={e=>{e.preventDefault(); {this?.props?.singleChat?.blockedBy === "" ? this.props.blockUser(this.props.user.uid,this.props.match.params.id) : this.props.unBlockUser(this.props.user.uid,this.props.match.params.id)} this.props.history.goBack();}}>
						{this?.props?.singleChat?.blockedBy === "" ?  "Block" :  "Unblock"}
				</Button>
            </div>

					{
						this.state.messages.map((data) => (
							<div style={{display:"flex", alignItems:"center", height:"auto", width:"100%",  marginTop:"5px"}}>
								{this.props.user.uid && this.props.user.uid === data.userId ? (
									<div style={{ display: "flex", justifyContent: "flex-start" }}>
										{data.type === "image/jpeg" ? (
											<> 
												<img onClick={e=> {e.preventDefault();this.openImageDilog(data.messageMediaURL);}}src={data.messageMediaURL} alt="" style={{height:"100px", width:"100px", marginLeft:"15px", borderRadius:"5px", objectFit:"cover"}} />	
											</>
											) : (
										
										<div
											id="rightdiv"
											style={{
											display: "flex", // justifyContent: "space-between",
											alignItems: "center",
											height: "auto",
											marginRight: "23px",
											maxWidth: "80%",
											margin: "5px",
											backgroundColor: "#d8efd5",
											padding: "5px 9px",
											borderRadius: "10px 0px 10px 10px"
											}}
										>
											<br />
											<div style={{ marginRight: "5px", float: "left" }}>
												<span style={{ fontSize: "1em" }}>
													{data.title}
												</span>
											</div>
										</div>
									)
									}
									</div>
								) : (
									<div style={{ display: "flex", width:"100%", marginRight:"15px", justifyContent: "flex-end" }}>
										
										{data.type === "image/jpeg" ? ( 
											<>
												<img onClick={e=> {e.preventDefault();this.openImageDilog(data.messageMediaURL);}} src={data.messageMediaURL} alt="" style={{height:"100px", width:"100px", marginRight:"15px", borderRadius:"5px", objectFit:"cover"}} />
											</>
											) : (

										<div
											id="left"
											style={{
											  display: "flex",
											  justifyContent: "flex-start",
											  alignItems: "center"
											}}
										>
											<br />
											<div 
												style={{
													display: "flex",
													alignItems: "center",
													height: "auto",
													maxWidth: "80%",
													marginLeft: "23px",
													marginTop: "5px",
													backgroundColor: "white",
													padding: "5px 9px",
													borderRadius: "0px 10px 10px 10px"
													// backgroundColor: "#e0e0e0"
												}}
											>
												<span style={{ fontSize: "1em" }}>
													{data.title}
												</span>
											</div>
										</div>
									)}
									</div>
								)}
							</div>
						))}
					 <div
					 id="myDiv"
						ref={el => {
							this.messagesEnd = el;
						}}
					/>
					</div>
					{
					this?.props?.singleChat === undefined || this?.props?.singleChat?.blockedBy === "" ?
					<div>
						<div
							style={{
							height: "44px",
							width: "100%",
							position: "fixed",
							left:"0px",
							bottom: "70px",
							borderTop: "1px solid grey",
							borderBottom: "1px solid grey",
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center",
							overflow: "scroll"
							}}
              			>
                <div style={{ display: "-webkit-box", marginLeft: "5px" }}>
                  {this.state.chatQuestion.map(data => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#9fb890",
                        padding: "5px 9px",
                        borderRadius: "4px",
                        margin: "2px"
                      }}
                    >
                      <span
                        style={{ color: "white", textTransform: "uppercase" }}
                        onClick={e => {
						  e.preventDefault();
						  this.props.addMessage(data.question, this.props.user.uid, this.props.match.params.id);
                        }}
                      >
                        {data.question}
                      </span>
                    </div>
                  ))}
                  <div style={{ width: "5px", height: "auto" }} />
                </div>
              </div>

			<div
                style={{
                  width: "100%",
                  height: "80px",
				  position: "fixed",
				  left:"0px",
                  bottom: "0px",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <AttachFile
                  style={{ color: "white" }}
                  onClick={e=> {e.preventDefault();this.setState({open:true}); }}
                />

                <div style={{ width: "72%" }}>
                  <TextField
                    id="standard-textarea" // label="With placeholder multiline"
                    placeholder="Type here..."
                    multiline
                    rowsMax="3"
                    fullWidth
                    margin="normal"
                    style={{ marginTop: "10px", underline: "none",color:"white" }}
					onChange={this.handlechange}
					id="outlined-basic"
					value={this.state.message} // autoFocus
                    disableUnderline={false}
                  />
                </div>
                <Send
				className="sendButton"
                  style={{ color: "white" }}
                  onClick={(e) => {
					e.preventDefault();
					this.props.addMessage(this.state.message, this.props.user.uid, this.props.match.params.id);
					this.setState({ message: '', openDropzone:false });
				    }}
                />
              </div>
			  </div>
				:
				<div
					style={{
						display: 'flex',
						position: 'fixed',
						bottom: '20px',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column'
					}}
				>
					<span>You cant reply to this chats</span>
				</div>
				}
				
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					/>
				{/* Same as */}
				<ToastContainer />
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleCloseDropZone.bind(this)}
                />

		<Dialog
			open={this.state.openDialog}
			TransitionComponent={Transition}
			onClose={this.handleClose}
		>
        <div style={{height:"70vh", width:"100%"}}>
				<img src ={this.state.currentImage} style={{height:"100%", width:"100%", objectFit:"cover"}} alt ="" />
		</div>
      	</Dialog>
			</div>
		);
	}
}

export default withRouter(App);
