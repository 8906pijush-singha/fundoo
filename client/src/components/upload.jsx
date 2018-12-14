import React, { Component } from 'react';


class Upload extends Component {
    triggerInputFile() {
        console.log("galat hai")
        this.fileInput.click();
    }
    handlerclick(event){
        console.log(event);
    }
    render() {
        return (
            <div>
            <span>
                <img src={require('../assets/notePictures.svg')}
                    alt="upload pic icon"
                    onClick={() => { this.triggerInputFile() }} />

                <input ref={fileInput => this.fileInput = fileInput}
                    type="file" style={{ 'display': 'none' }}
                />
                
                   {/* <input type="file" name="pic" accept="image/*" onClick={this.handlerclick}/>

               <input type="file" name="myFile" onClick={(e) => {
                    console.log('parent');
                    this.handlerclick;
                }}/> */}

            </span></div>
        )
    }
}
export default Upload