import React, { Component } from 'react';
import { Card } from '@material-ui/core';
class Cards extends Component {

    render() {
        let changeCardStyle = this.props.parentProps ? "verticalCards" : "_cards";
        return (
            <div className="gridCards" >

                <div >
                    <Card className={changeCardStyle}>
                        Hi Pijush
                        </Card>
                </div>


                <div>
                    <Card className={changeCardStyle}>
                        Hello
                        </Card></div>



                <div>
                    <Card className={changeCardStyle}>
                        good morning
                        </Card></div>

                <div>
                    <Card className={changeCardStyle}>
                        good morning
                    </Card>
                </div>






            </div>


        )
    }

}
export default Cards;