import React from 'react';
import {playerStyle, charAnimStyle} from './style.js';



export class Player extends React.Component {
    render () {
        var playerSty = {};
        // console.log("Stop Animation?" + this.props.stopAnim);
        if (this.props.stopAnim !== 0) {
            playerSty = playerStyle;
        } else {
            Object.assign(playerSty, playerStyle, charAnimStyle) 
        }
        return (
            <img style= { playerSty } src = { this.props.playerSrc }/>
        );
    }
}