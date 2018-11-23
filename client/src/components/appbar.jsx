import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem, Drawer, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import UserProfile from './userProfile';

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                top: 66,
                width: 230,
                background: "white"
            }
        }

    },
});
// const theme1 = createMuiTheme({
//     overrides: {
//         typography: {
//             useNextVariants: true,
//           }
//     },
// });
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

                            <IconButton onClick={this.handleDrawer}>
                                <MenuIcon  ></MenuIcon>
                            </IconButton>

                            <div  style={{ color: "gray", marginLeft: "30px", fontSize:"25px",fontFamily:"TimesNewRoman" }}>Fundoose</div>

                            <IconButton style={{ marginLeft: "50px" }}>
                                <SearchIcon ></SearchIcon>
                            </IconButton>

                            <InputBase placeholder="Search...."
                                style={{ marginLeft: "40px", width: "640px" }}
                            >
                            </InputBase>

                            <UserProfile />

                        </Toolbar>

                        <Drawer
                            open={this.state.open}
                            variant="persistent"
                            // containerStyle={{ 'top': 70, "boxShadow": 0 }}
                        >
                            <MenuItem>Notes</MenuItem>
                            <MenuItem>Reminders</MenuItem>

                        </Drawer>

                    </AppBar>

                </MuiThemeProvider>


            )
        }
    }
}

export default AppBarComp;