import React from "react";
import { withRouter } from "react-router-dom";
import BottomNavigation from "../Component/BottomNavigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Layout extends React.Component {

  notify = () => toast("Someone is trying to screenshot!");
  componentWillMount(){
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
    document.onkeydown = function(e) {
      if(e.keyCode == 123) {
         return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
         return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
         return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
         return false;
      }
      if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
         return false;
      }
    }

    document.addEventListener("keydown", function (e) {
      var keyCode = e.keyCode ? e.keyCode : e.which;
              if (keyCode == 44 || keyCode == 18) {
                  // stopPrntScr();
                  return this.notify;
              }
          });
  // function stopPrntScr() {
  
  //             var inpFld = document.createElement("input");
  //             inpFld.setAttribute("value", ".");
  //             inpFld.setAttribute("width", "0");
  //             inpFld.style.height = "0px";
  //             inpFld.style.width = "0px";
  //             inpFld.style.border = "0px";
  //             document.body.appendChild(inpFld);
  //             inpFld.select();
  //             document.execCommand("copy");
  //             inpFld.remove(inpFld);
  //         }
  }
  render() {
    const {
      bottomNavigation,
      children,
      selectedValue,
    } = this.props;
    // const top = appBar && (
    //   <AppBar appBarLeftIcon={appBarLeftIcon} appBarText = {appBarText} appBarRightIcon={appBarRightIcon} baapIcon={baapIcon} handleAppBarRightIcon={handleAppBarRightIcon} />
    // );
    const toast = (<ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />)
    const bottom = bottomNavigation && (
      <BottomNavigation
        selectedValue={selectedValue}
        // falseLogin={falseLogin}
      />
    );
    return (
      <>
        {children}
        {bottom}
        {toast}
      </>
    );
  }
}

export default Layout;
