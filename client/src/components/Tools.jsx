import React,{Component} from 'react';
import Reminder from './reminder';
import AddPerson from './addPerson';
import NoteColor from './noteColor';
import Upload from './upload';
import NoteArchive from './noteArchive';
import More from './noteMore';

class Tools extends Component{
    render(){
        return(
            <div className="cardTools"><Reminder /><AddPerson/><NoteColor /><Upload/><NoteArchive/><More/></div>
        )
    }
}

export default Tools;