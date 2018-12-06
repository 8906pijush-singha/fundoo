import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import { getNotes } from '../services/notes';
class Cards extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        }
    }
    componentWillMount() {
        getNotes()
            .then((result) => {
                this.setState({
                    notes: result
                })
            })
            .catch((error) => {
                alert(error)
            });

    }
    showCard(){
        
        const newCard=this.props.newCard();
        this.state.notes.push(newCard);
        console.log("dffgfg",newCard);
    }
    
    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "_cards";
        return (
            <div className="gridCards" >
                {Object.keys(this.state.notes).map((key) => {
                    // console.log(this.state.notes[key]._id);

                    return (
                        <div>
                            <Card className={changeCardStyle}>
                                <div>
                                    {this.state.notes[key].title}
                                </div>
                                <div>
                                    {this.state.notes[key].description}
                                </div>
                            </Card></div>

                    )
                })}
            </div>


        )
    }

}
export default Cards;