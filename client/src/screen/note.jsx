import React,{ Component } from "react";
import { Button } from "@material-ui/core";
import { auth } from "../services/auth";

class Note extends Component
{
    clearLocslStorage(e){
        e.preventDefault();
        localStorage.clear();
        window.location.href="/";
    }
    componentWillMount(){
        auth();
    }
    render(){
        if(localStorage.getItem("isAuth")===null){
           return( window.location.href="/")
        }else{
        return(
            <form onSubmit={this.clearLocslStorage}>
                <Button variant="contained"
                type="submit"
              >Logout</Button>

            </form>
        )
    }
    }
}
export default Note;