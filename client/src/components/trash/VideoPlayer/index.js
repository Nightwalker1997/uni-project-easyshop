import React, {Component} from 'react';

import './index.css';

class videoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            playing: false
        }


        this.keyPress = this.keyPress.bind(this);


    }

    componentDidMount() {
        document.addEventListener("keypress", this.keyPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.keyPress, false);
    }

    keyPress(e){
        const video = document.getElementById('videoTag');

        switch (e.keyCode){
            case 32:
                e.preventDefault();
                if (this.state.playing){
                    video.pause();
                    this.setState({playing: false});
                } else {
                    video.play();
                    this.setState({playing: true});
                }
                return null;
            case 13:
                video.currentTime = 0;
                if (!this.state.playing){
                    video.play();
                    this.setState({playing: false});
                }
                return 0;
            case 39:
                console.log("hey!");
                return 0;
            default:
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className={"container m-4"} align={"center"}>
                <video
                    id={"videoTag"}
                    height={"240"}
                    width={"360"}
                    poster={process.env.PUBLIC_URL + '/img/1.jpg'}
                    controls={true}
                    preload={"auto"}
                       // auto 	    load the entire video when the page loads
                       // metadata 	load only metadata when the page loads
                       // none 	    NOT load the video when the page loads
                >
                    <source src={this.props.videoSrc}/>
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }
}

export default videoPlayer;
