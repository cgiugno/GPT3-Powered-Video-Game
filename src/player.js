import React from 'react';
import {playerStyle, charAnimStyle, rotate180Deg} from './style.js';



export class Player extends React.Component {
    render () {
        var playerSty = {};
        // console.log("Stop Animation?" + this.props.stopAnim);
        if (this.props.stopAnim !== 0) {
            Object.assign(playerSty, playerStyle, { rotate: `${this.props.playerOrientation}deg`});
        } else {
            Object.assign(playerSty, playerStyle, { rotate: `${this.props.playerOrientation}deg`}, charAnimStyle) 
        }
        return (
            <img style= { playerSty } src = { this.props.playerSrc }/>
        );
    }
}