import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountCircle from '@material-ui/icons/AccountCircle'
import { IconButton, Fade, Popper, Paper, Tooltip, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';


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
  };

  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState((state) => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement,
    }));

  };
  render() {
    const { classes } = this.props;
    const { anchorEl, open, placement } = this.state;
    const username = localStorage.getItem("UserName")
    const email = localStorage.getItem("Email")
    const initial = username.substring(0, 1);
    if (localStorage.getItem("isAuth") !== "true") {
      return (window.location.href = "/")
    } else {
      return (
        <div className={classes.root}>
          <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper >


                  <div className="userProfile"
                    open={open}>

                    <div className="userProfileIconWithDetails">
                      <Avatar style={{ width: "100px", height: "100px", float: "left", paddingTop: "20px" }} >
                        {initial}
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
              style={{ marginLeft: "100px" }}
              onClick={this.handleClick("bottom-end")}
            >
              <Avatar style={{ width: "30px", height: "30px" }} >
                {initial}
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