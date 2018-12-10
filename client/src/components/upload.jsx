import React, { Component } from 'react';


class Upload extends Component {
    triggerInputFile() {
        console.log("galat hai")
        this.fileInput.click();
    }
    render() {
        return (
            <span>
                <img src={require('../assets/notePictures.svg')}
                    alt="upload pic icon"
                    onClick={() => { this.triggerInputFile() }} />

                <input ref={fileInput => this.fileInput = fileInput}
                    type="file" style={{ 'display': 'none' }}

                />

            </span>
        )
    }
}
export default Upload