import React from 'react';
import { dialogStyle, dialogTextStyle } from './style.js';


import yellowDialog from './uipack_fixed/PNG/yellow_panel.png';
import redDialog from './uipack_fixed/PNG/red_panel.png';
import greyDialog from './uipack_fixed/PNG/grey_panel.png';

const npcDialog = [yellowDialog, redDialog, greyDialog];


export class DialogBox extends React.Component {
    render () {
        return (
            <div style= {Object.assign({backgroundImage: `url(${npcDialog[this.props.npcID - 1]})`}, dialogStyle) } >
               <p style={ Object.assign({color: this.props.npcDialogColor}, dialogTextStyle)}>{ this.props.npcDialog }</p> 
            </div>
        );
    }
}