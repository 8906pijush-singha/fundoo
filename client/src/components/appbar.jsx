import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
class AppBarComp extends Component{
    
    render(){
        return(
           <AppBar position="static" color="white">
               <Toolbar>
                   <IconButton>
                       <MenuIcon ></MenuIcon>
                   </IconButton>
                   <Typography variant="h6" style={{color : "gray" ,marginLeft : "30px"}}>Fundoo</Typography>
                   <IconButton style={{marginLeft : "50px"}}>
                        <SearchIcon ></SearchIcon>
                   </IconButton>
                   <InputBase placeholder="Search...."
                   style={{marginLeft:"40px"}}> 
                   </InputBase>
                   <Menu
                      id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    //   open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    </Menu>
               </Toolbar>
           </AppBar>
        )
    }
}

export default AppBarComp;