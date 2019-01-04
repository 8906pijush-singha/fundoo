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
    typography: {
    useNextVariants: true,
    }
});
class AppBarComp extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            searchNote: ""
        }
        this.handleDrawer = this.handleDrawer.bind(this);
        this.setView = this.setView.bind(this);
        this.handelRefresh = this.handelRefresh.bind(this);
        this.handleSearchNote = this.handleSearchNote.bind(this);

    }
    handleDrawer() {
        this.props.slideNotes();
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
            searchNote: e.target.value
        })
        this.props.getSearchNote(e.target.value);

    }
    searchLabels(value) {
        this.props.searchLabels(value)
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
                            <div id="appbarTitle">fundooNotes</div>
                            <div className='appBarIconsDiv' >
                            <div  id="serachBar">
                                <Tooltip title="Search">
                                    <IconButton  id ="searchBarIconButton">
                                        <SearchIcon ></SearchIcon>
                                    </IconButton>
                                </Tooltip>

                                <InputBase placeholder="Search...."
                                    id="searchBarInput"
                                    fullWidth
                                    value={this.state.searchNote}
                                    onChange={this.handleSearchNote}
                                >
                                </InputBase>
                            </div>

                            <Tooltip title="refresh">
                                <IconButton id="refreshButton">
                                    <img src={require('../assets/refresh_grey_27x27.png')} alt="refresh icon" onClick={this.handelRefresh} ></img>
                                </IconButton>
                            </Tooltip>

                            <Settings />
                           
                            <ViewCards style={{marginLeft:'auto'}} parentProps={this.setView} />
                           
                            <UserProfile />
                            </div>
                        </Toolbar>


                    </AppBar>
                        
                    <MenuDrawer closeLabelOption={this.props.closeLabelOption} parentProps={this.state.open} handleNavigation={this.props.handleNavigation} searchLabels={(value)=>this.searchLabels(value)}/>
                </MuiThemeProvider>
                


            )
        }
    }
}

export default AppBarComp;