import React,{Component} from 'react';
import Reminder from './reminder';
import AddPerson from './addPerson';
import Upload from './upload';
import NoteArchive from './noteArchive';
import More from './noteMore';
import ColorPallete from './colorPallete';

class Tools extends Component{
    getColor(){
       return this.toolsToPallete.current.getColor()
    }
    render(){
        let ampm = parseInt(new Date().getHours())>=8 ? "PM" : "AM";
        return(
            <div className="cardTools"><Reminder parentProps={ampm}/><AddPerson/>
            <ColorPallete ToolsProps={this.props.createNoteProps} />
            <Upload  /><NoteArchive /><More /></div>
        )
    }
}

export default Tools;