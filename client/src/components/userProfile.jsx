import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Fade, Popper, Paper, Tooltip, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { uploadProfilePic } from '../services/post';


const styles = theme => ({
  root: {
    width: 50
  },
  typography: {
    padding: theme.spacing.unit * 2,
  },
});


class UserProfile extends Component {

  clearLocslStorage(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  }
  state = {
    anchorEl: null,
    open: false,
    placement: null,
    profilePic: ""
  };
  triggerInputFile() {
    this.fileInput.click();
  }
  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState((state) => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement,
    }));

  };
  componentDidMount() {
    if(localStorage.getItem("profilePic")!=="undefind"){
      this.setState({
        profilePic:localStorage.getItem("profilePic")
      })
    }
  }
  uploadImage(e) {
    let data = new FormData();
    data.append('file', e.target.files[0]);
    uploadProfilePic('/setProfilePic', data)
      .then((result) => {
        this.setState({
          profilePic: result.data.data
        })
      }).catch((err) => {
        alert(err);
      })
  }
  render() {
   
    const { anchorEl, open, placement } = this.state;
    const username = localStorage.getItem("UserName")
    const email = localStorage.getItem("Email")
    const initial = username.substring(0, 1);
    if (localStorage.getItem("isAuth") !== "true") {
      return (window.location.href = "/")
    } else {
      return (
        <div className='appbarProfileDiv'>
          <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper >


                  <div className="userProfile"
                    open={open}>

                    <div className="userProfileIconWithDetails">
                      <Avatar style={{ width: "90px", height: "90px", marginTop: "10px" }}
                        onClick={() => { this.triggerInputFile() }}
                      >
                        <input ref={fileInput => this.fileInput = fileInput}
                          type="file" style={{ 'display': 'none' }}
                          onChange={(e) => this.uploadImage(e)}
                        />
                        {this.state.profilePic !== "" ?
                          <img style={{
                            maxWidth: "100%",
                            height: "auto"
                          }} src={this.state.profilePic} alt="profileImage"></img>
                          :
                          <b style={{ fontSize: "33px" }}>{initial}</b>
                        }
                      </Avatar>

                      <div className="accountDetails">
                        <div >{username}</div>
                        <div >{email}</div>
                      </div>

                    </div>

                    <div onClick={this.clearLocslStorage} className="logoutButton">Logout</div>
                  </div>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Tooltip title={<div>
            <div id="AcountTooltip">Fundoo Account</div>
            <div>{localStorage.getItem("UserName")}</div>
            <div>{localStorage.getItem("Email")}</div>
          </div>}>
            <IconButton
              id="profileIconButton"
              onClick={this.handleClick("bottom-end")}
            >
              <Avatar style={{ width: "30px", height: "30px" }} >
                {this.state.profilePic !== "" ?
                  <img style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} src={this.state.profilePic}  alt="profileImage"></img>
                  :
                  initial
                }
              </Avatar>
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  }
}


UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(UserProfile);