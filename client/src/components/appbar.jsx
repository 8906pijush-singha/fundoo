import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, MuiThemeProvider, createMuiTheme, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import UserProfile from './userProfile';
import MenuDrawer from './menuDrawer';
import ViewCards from './cardsView';
import Settings from './settings';

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                top: 66,
                width: 280,
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
            open: false,
            searchNote:""
        }
        this.handleDrawer = this.handleDrawer.bind(this);
        this.setView = this.setView.bind(this);
        this.handelRefresh = this.handelRefresh.bind(this);
        this.handleSearchNote = this.handleSearchNote.bind(this);
       
    }
    handleDrawer() {
        this.setState({ open: !this.state.open })
    }
    setView() {
        this.props.parentProps();
    }
    handelRefresh(e) {
        e.preventDefault();
        window.location.reload();
    }
    handleSearchNote(e) {
        this.setState({
            searchNote:e.target.value
        })
        this.props.getSearchNote(e.target.value);

    }

    render() {
        if (localStorage.getItem("isAuth") !== "true") {
            return (window.location.href = "/")
        } else {
            return (
                <MuiThemeProvider theme={theme} >
                    <AppBar position="fixed"
                        id="appbar" >
                        <Toolbar >
                            <Tooltip title="Menu">
                                <IconButton onClick={this.handleDrawer}>
                                    <MenuIcon  ></MenuIcon>
                                </IconButton>
                            </Tooltip>
                            <img src={require('../assets/keepIcon.svg')} alt="keep logo"></img>
                            <div style={{ color: "gray", marginLeft: "30px", fontSize: "25px", fontFamily: "TimesNewRoman" }}>Fundoo Notes</div>

                            <div style={{ marginLeft: "50px", border: "1px solid lightgrey", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px" }} id="abcde">
                                <Tooltip title="Search">
                                    <IconButton style={{ marginLeft: "5px" }}>
                                        <SearchIcon ></SearchIcon>
                                    </IconButton>
                                </Tooltip>

                                <InputBase placeholder="Search...."
                                    style={{ marginLeft: "1px", padding: "11px 16px 11px 16px" }}
                                    value={this.state.searchNote}
                                    onChange={this.handleSearchNote}
                                >
                                </InputBase>
                            </div>

                            <Tooltip title="refresh">
                                <IconButton style={{ marginRight: "10px", marginLeft: "5px" }}>
                                    <img src={require('../assets/refresh_grey_27x27.png')} alt="refresh icon" onClick={this.handelRefresh} ></img>
                                </IconButton>
                            </Tooltip>

                            <Settings />

                            <ViewCards parentProps={this.setView} />

                            <UserProfile />

                        </Toolbar>


                    </AppBar>
                    <MenuDrawer parentProps={this.state.open} handleNavigation={this.props.handleNavigation} />

                </MuiThemeProvider>


            )
        }
    }
}

export default AppBarComp;