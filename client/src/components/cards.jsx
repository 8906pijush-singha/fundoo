import React, { Component } from 'react';
import { Card, Grid } from '@material-ui/core';
class Cards extends Component {
    render() {
        return (
            <div >

                <div style={{width:"300px"}}>
                    <Card className="cards">
                        Hi Pijush
                        </Card>
                </div>


                <div>
                    <Card className="cards">
                        Hello
                        </Card></div>



                <div>
                    <Card className="cards">
                        good morning
                        </Card></div>

                <div>
                    <Card className="cards">
                        good morning
                    </Card>
                </div>






            </div>


        )
    }

}
export default Cards;