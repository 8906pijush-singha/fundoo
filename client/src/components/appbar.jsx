import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, MenuItem, Drawer, MuiThemeProvider, createMuiTheme, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import UserProfile from './userProfile';

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                top: 66,
                width: 300,
                background: "white"
                
            },
            paperAnchorDockedLeft: {
                borderColor: "white"
            }
        },
        MuiMenuItem: {
            root: {
                borderBottomRightRadius: "24px",
                borderTopRightRadius: "24px",
            }
        },
        MuiInputBase: {
            input: {
                width: 585
            }

        }

    },
});
class AppBarComp extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
        this.handleDrawer = this.handleDrawer.bind(this);
    }
    handleDrawer() {
        this.setState({ open: !this.state.open })
    }
    render() {
        if (localStorage.getItem("isAuth") !== "true") {
            return (window.location.href = "/")
        } else {
            return (
                <MuiThemeProvider theme={theme} >
                    <AppBar position="static" id="appbar" >
                        <Toolbar >
                            <Tooltip title="Menu">
                                <IconButton onClick={this.handleDrawer}>
                                    <MenuIcon  ></MenuIcon>
                                </IconButton>
                            </Tooltip>

                            <div style={{ color: "gray", marginLeft: "30px", fontSize: "25px", fontFamily: "TimesNewRoman" }}>Fundoose</div>

                            <div style={{ marginLeft: "50px", border: "1px solid lightgrey", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px" }} id="abcde">
                                <Tooltip title="Search">
                                    <IconButton style={{ marginLeft: "5px" }}>
                                        <SearchIcon ></SearchIcon>
                                    </IconButton>
                                </Tooltip>

                                <InputBase placeholder="Search...."
                                    style={{ marginLeft: "1px", padding: "11px 16px 11px 16px" }}
                                >
                                </InputBase>
                            </div>

                            <Tooltip title="refresh">
                                <IconButton style={{ marginRight: "10px", marginLeft: "5px" }}>
                                    <img src={require('../assets/refresh_grey_27x27.png')} alt="refresh icon" ></img>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="setting">
                                <IconButton style={{ marginRight: "10px" }}>
                                    <img src={require('../assets/gear.png')} alt="setting icon" ></img>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="List View">
                                <IconButton style={{ marginRight: "0px" }}>
                                    <img src={require('../assets/view-agenda.svg')} alt="setting icon" ></img>
                                </IconButton>
                            </Tooltip>
                            
                            <UserProfile />

                        </Toolbar>


                    </AppBar>
                        <Drawer
                            open={this.state.open}
                            variant="persistent"
                        // containerStyle={{ 'top': 70, "boxShadow": 0 }}
                        >
                            <MenuItem><img src={require('../assets/note.svg')} alt="Note icon" style={{ marginRight: "55px" }}></img>Notes</MenuItem>
                            <MenuItem><img src={require('../assets/icons8-alarm-24.png')} alt="Reminder icon" style={{ marginRight: "55px" }}></img>Reminders</MenuItem>
                            <div style={{ height: "92px", borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                                <div style={{ fontSize: "85%", marginLeft: "10px", marginTop: "10px", color: "grey", fontFamily: "georgia" }}>
                                    LABELS
                                    </div>
                                <MenuItem style={{ marginBottom: "100px" }}>
                                    <img src={require('../assets/edit.svg')} alt="edit icon" style={{ marginRight: "55px" }}></img>
                                    Edit labels
                                </MenuItem>
                            </div>
                            <MenuItem><img src={require('../assets/baseline-archive-24px.svg')} alt="archive icon" style={{ marginRight: "55px" }}></img>Archive</MenuItem>
                            <MenuItem><img src={require('../assets/icons8-trash-24.png')} alt="trash icon" style={{ marginRight: "55px" }}></img>Trash</MenuItem>


                        </Drawer>

                </MuiThemeProvider>


            )
        }
    }
}

export default AppBarComp;