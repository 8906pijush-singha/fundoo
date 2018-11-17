import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
class AppBarComp extends Component{
    
    render(){
        return(
           <AppBar position="static" color="white">
               <Toolbar>
                   <IconButton>
                       <MenuIcon ></MenuIcon>
                   </IconButton>
                   <Typography variant="h6" style={{color : "gray" ,marginLeft : "30px"}}>Fundoo</Typography>
                   <SearchIcon style={{marginLeft : "50px"}}></SearchIcon>
                   <InputBase placeholder="Search...."
                   style={{marginLeft:"40px"}}></InputBase>
               </Toolbar>
           </AppBar>
        )
    }
}

export default AppBarComp;