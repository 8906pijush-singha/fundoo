import React, { Component } from 'react';
import { IconButton, Tooltip, Card, ClickAwayListener } from '@material-ui/core';


const colorCodesAndNames = [{ name: "white", colorCode: "rgb(255, 255, 255)" },
{ name: "lightGreen", colorCode: "rgb(204, 255, 144)" },
{ name: "purple", colorCode: "rgb(215, 174, 251)" },
{ name: "red", colorCode: "rgb(242, 139, 130)" },
{ name: "Teal", colorCode: "rgb(167, 255, 235)" },
{ name: "pink", colorCode: "rgb(253, 207, 232)" },
{ name: "orange", colorCode: "rgb(251, 188, 4)" },
{ name: "blue", colorCode: "rgb(203, 240, 248)" },
{ name: "brown", colorCode: "rgb(230, 201, 168)" },
{ name: "yellow", colorCode: "rgb(255, 244, 117)" },
{ name: "darkBlue", colorCode: "rgb(174, 203, 250)" },
{ name: "gray", colorCode: "rgb(232, 234, 237)" }
]
class ColorPallete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            color: ""
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handelColor = this.handelColor.bind(this);
        this.getColor = this.getColor.bind(this);

    }
    getColor(){
        return this.state.color
    }
    handleMouseEnter() {
        this.setState({ open: true });
        // this.props.handleToggle(!this.state.open)
    }
    handleMouseLeave() {
        this.setState({ open: false });
        // this.props.handleToggle(!this.state.open)
    }
    handleToggle() {
        this.setState({ open: !this.state.open });
    }
    handelColor(e){
        this.props.ToolsProps(e.target.value,this.props.noteId)
        this.setState({
            open:false
        })
    }
    closeColorPallete(){
        this.setState({
            open:false
        })
    }
    render() {

        const changeCardColor = colorCodesAndNames.map((colorKey) =>

            <Tooltip title={colorKey.name} key ={colorKey.colorCode}>
                <IconButton style={{ backgroundColor: colorKey.colorCode, "margin": "2px", }}
                value={colorKey.colorCode}
                onClick={this.handelColor}>
                </IconButton>
            </Tooltip>
        );

        return (

            <div>
                <Tooltip title="Change Color">
                    <img
                        src={require('../assets/noteColor.svg')}
                        alt="change color"
                        onClick={this.handleToggle}
                    />
                </Tooltip>
                <div>
                    {this.state.open ?
                    <div>
                        <ClickAwayListener onClickAway={()=>this.closeColorPallete()}>
                        <Card className="colorPalleteCard">
                            {changeCardColor}
                        </Card>
                        </ClickAwayListener>

                </div>
                        : null}

                </div>
            </div>

        )
    }
}
export default ColorPallete;
