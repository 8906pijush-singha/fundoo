import React, { Component } from "react";
import CreateNote from "../components/createNote";
import AppBarComp from "../components/appbar";
import Cards from "../components/cards";

class Note extends Component {
    constructor(){
        super();
        this.state={
            createNote:false,
        }
        this.createNoteClick = React.createRef();
        this.handleClick=this.handleClick.bind(this);
        // this.parentFunction=this.parentFunction.bind(this);
    }
    // parentFunction(){
    //     this.setState({createNote:this.createNoteClick.current.getCreateNote()})
    // }
    handleClick(e){
        console.log(e.target.id);
        // console.log("parent call");
        if(this.createNoteClick.current.getCreateNoteStatus()){
            this.createNoteClick.current.setOnCreateNoteClickFalse(e);
        }
        // else{
        //     this.createNoteClick.current.setOnCreateNoteClickTrue(e);
        // }
        e.preventDefault();
    }
    render() {
        if (localStorage.getItem("isAuth") !== "true") {
            return (window.location.href = "/")
        } else {
            return (
                <div id="card-layout" onClick={this.handleClick} style={{height:"800px"}}>
                    <AppBarComp />
                    <div className="dashBoard">
                    <CreateNote ref={this.createNoteClick} />
                    <Cards />
                    </div>                    
                    {/* <CreateNote createNote={this.state.createNote} ref={this.createNoteClick} parentFunction={this.parentFunction} /> */}
                </div>
            )
        }
    }
}
export default Note;