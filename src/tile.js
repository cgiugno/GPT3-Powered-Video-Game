import React from 'react';
import {tileStyle} from './style.js';



export class Tile extends React.Component {
    render () {
        return (
            <img style= { tileStyle } src = { this.props.tileName }/>
        );
    }
}