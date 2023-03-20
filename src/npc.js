import React from 'react';
import {npcStyle, charAnimStyle} from './style.js';



export class NPC extends React.Component {
    

    render () {
        return (
            <img style= {npcStyle } src = { this.props.npcSrc }/>
        );
    }
}