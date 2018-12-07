import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import { getNotes } from '../services/notes';
import Tools from './Tools';
import pinIcon from '../assets/pin.svg'
class Cards extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        }
    }
    componentDidMount() {
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
    showCard() {

        const newCard = this.props.newCard();
        this.setState({
            notes: [...this.state.notes, newCard]
        })
    }


    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "cards";
        return (
            <div className="gridCards" >
                {Object.keys(this.state.notes).map((key) => {
                    // console.log(this.state.notes[key]._id);

                    return (
                        <div>
                            <Card className={changeCardStyle} style={{ backgroundColor: this.state.notes[key].color }}>
                                <div>
                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                        <b>{this.state.notes[key].title}</b>
                                        <img src={pinIcon} className="pinIcon"></img>
                                    </div>
                                    <div>
                                        {this.state.notes[key].description}
                                    </div>
                                </div>
                                <div className="noteicons">
                                    <Tools />

                                </div>
                            </Card>
                        </div>

                    )
                })}
            </div>


        )
    }

}
export default Cards;