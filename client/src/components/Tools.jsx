import React,{Component} from 'react';
import Reminder from './reminder';
import AddPerson from './addPerson';
import NoteColor from './noteColor';
import Upload from './upload';
import NoteArchive from './noteArchive';
import More from './noteMore';

class Tools extends Component{
    render(){
        let ampm = parseInt(new Date().getHours())>=8 ? "PM" : "AM";
        return(
            <div className="cardTools"><Reminder parentProps={ampm}/><AddPerson/><NoteColor /><Upload/><NoteArchive/><More/></div>
        )
    }
}

export default Tools;