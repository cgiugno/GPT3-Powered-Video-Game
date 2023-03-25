import React from 'react';
import { useEffect, useState } from 'react';
import { dialogStyle, dialogTextStyle, dialogChoiceContainer, dialogChoiceStyle, dialogOutline, dialogDefaultStyle } from './style.js';


import yellowDialog from './uipack_fixed/PNG/yellow_button00.png';
import redDialog from './uipack_fixed/PNG/red_button00.png';
import greyDialog from './uipack_fixed/PNG/grey_button00.png';

import yellowDialogHover from './uipack_fixed/PNG/yellow_button01.png';
import redDialogHover from './uipack_fixed/PNG/red_button01.png';
import greyDialogHover from './uipack_fixed/PNG/grey_button01.png';

const npcDialog = [yellowDialog, redDialog, greyDialog];
const npcDialogHover = [yellowDialogHover, redDialogHover, greyDialogHover];


export function DialogBox(props) {
    const [isHover, setIsHover] = useState(0);

    if (props.npcChoices !== null) {
        console.log("Choices Printed: " + props.npcChoices);
        return <div style={dialogOutline}>
            <div style={Object.assign({ backgroundImage: `url(${npcDialog[props.npcID - 1]})` }, dialogStyle)} >
                <p style={Object.assign({ color: props.npcDialogColor }, dialogTextStyle)}>{props.npcDialog}</p>
            </div>
            <div style={dialogChoiceContainer}>
                <div
                    onMouseEnter={() => setIsHover(1)}
                    onMouseLeave={() => setIsHover(0)}
                    onClick={() => props.onDialogClick(0)}
                    style={Object.assign({ backgroundImage: (((isHover === 1) && props.npcChoices[0]) ? `url(${npcDialog[props.npcID - 1]})` : `url(${npcDialogHover[props.npcID - 1]})`) }, dialogChoiceStyle)}>
                    <p style={Object.assign({ color: props.npcDialogColor }, dialogTextStyle)}>
                        {props.npcChoices[0]}
                    </p>
                </div>
                <div
                    onMouseEnter={() => setIsHover(2)}
                    onMouseLeave={() => setIsHover(0)}
                    onClick={() => props.onDialogClick(1)}
                    style={Object.assign({ backgroundImage: (((isHover === 2) && (props.npcChoices[1] !== "")) ? `url(${npcDialog[props.npcID - 1]})` : `url(${npcDialogHover[props.npcID - 1]})`) }, dialogChoiceStyle)}>
                    <p style={Object.assign({ color: props.npcDialogColor }, dialogTextStyle)}>
                        {props.npcChoices[1]}
                    </p>
                </div>
            </div>
        </div>
    } else {
        return <div style={dialogOutline}>
            <div style={Object.assign({ backgroundImage: `url(${npcDialog[props.npcID - 1]})` }, dialogDefaultStyle)} >
                <p style={Object.assign({ color: props.npcDialogColor }, dialogTextStyle)}>{props.npcDialog}</p>
            </div>
        </div>
    }

}