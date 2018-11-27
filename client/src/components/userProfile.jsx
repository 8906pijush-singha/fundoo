import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountCircle from '@material-ui/icons/AccountCircle'
import { IconButton, Fade, Popper, Paper, Tooltip } from '@material-ui/core'
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
  // constructor(){
  //   super();
  //   this.state = {
  //     anchorEl: null,
  //     open: false,
  //     placement: null,
  //   };
  //   this.handleClick=this.handleClick.bind(this);
  // }
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
  // handleClick =(event) => {
  //   const { currentTarget } = event;
  //   this.setState(() => ({
  //     anchorEl: currentTarget,
  //     open:!this.state.open
  //   }));

  // };

  // handleClick(){
  //   const { currentTarget } = event;
  //   this.setState({open:!this.state.open})
  //   this.setState({anchorEl: currentTarget})
  // }


  render() {
    const { classes } = this.props;
    const { anchorEl, open, placement } = this.state;
    const username = localStorage.getItem("UserName")
    const email = localStorage.getItem("Email")

    if (localStorage.getItem("isAuth") !== "true") {
      return (window.location.href = "/")
    } else {
      return (
        <div className={classes.root}>
          <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper >
                  <div style={{ width: "300px", height: "150px" }}
                    open={open}>
                    {/* <IconButton> */}
                    <AccountCircle style={{ width: "100px", height: "150px", float: "left" }} /><br />
                    <div style={{ float: "right", marginRight: "10px", marginLeft: "10px", lineHeight: "1", paddingBottom: "0px 0px " }}>{username}</div>
                    <div style={{ float: "right", marginRight: "2px", marginLeft: "10px" }}>{email}</div><br /><br /><br /><br /><br /><br />
                    <div style={{ float: "right", marginRight: "2px", marginLeft: "10px" }} onClick={this.clearLocslStorage}>Logout</div>
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
              <AccountCircle style={{ width: "30px", height: "30px" }} />
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