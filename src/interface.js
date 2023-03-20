import React from 'react';
import { screen, csBox, headerStyle, box } from './style.js';
import { Tile } from "./tile.js";
import { Player } from './player.js';
import { DialogBox } from "./dialogBox.js";
import { NPC } from './npc.js';
import { Object } from './object.js';

import greenPlain from './kenney_tinytown/Tiles/tile_0000.png';
import grassGreen from './kenney_tinytown/Tiles/tile_0001.png';
import greenFlowers from './kenney_tinytown/Tiles/tile_0002.png';
import groundTopLeft from './kenney_tinytown/Tiles/tile_0012.png';
import groundTopCenter from './kenney_tinytown/Tiles/tile_0013.png';
import groundTopRight from './kenney_tinytown/Tiles/tile_0014.png';
import groundCenterLeft from './kenney_tinytown/Tiles/tile_0024.png';
import groundCenterCenter from './kenney_tinytown/Tiles/tile_0025.png';
import groundCenterRight from './kenney_tinytown/Tiles/tile_0026.png';
import groundLowerLeft from './kenney_tinytown/Tiles/tile_0036.png';
import groundLowerCenter from './kenney_tinytown/Tiles/tile_0037.png';
import groundLowerRight from './kenney_tinytown/Tiles/tile_0038.png';
import groundUpperLeftCorner from './kenney_tinytown/Tiles/tile_0039.png';
import groundUpperRightCorner from './kenney_tinytown/Tiles/tile_0040.png';
import groundLowerRightCorner from './kenney_tinytown/Tiles/tile_0041.png';
import groundLowerLeftCorner from './kenney_tinytown/Tiles/tile_0042.png';
import greyTile from "./kenney_tinytown/Tiles/tile_0132.png";
import blackTile from './kenney_tinytown/Tiles/tile_0133.png';

import top_yellow_tree from './kenney_tinytown/Tiles/tile_0003.png';
import bottom_yellow_tree from './kenney_tinytown/Tiles/tile_0015.png';

import top_green_tree from './kenney_tinytown/Tiles/tile_0004.png';
import bottom_green_tree from './kenney_tinytown/Tiles/tile_0016.png';

import smol_funky_grass from './kenney_tinytown/Tiles/tile_0017.png';
import smol_yellow_tree from './kenney_tinytown/Tiles/tile_0027.png';
import smol_green_tree from './kenney_tinytown/Tiles/tile_0028.png';
import shrooms from './kenney_tinytown/Tiles/tile_0029.png';
import beehive from './kenney_tinytown/Tiles/tile_0094.png';

import house_bottom_left from './kenney_tinytown/Tiles/tile_0072.png';
import house_bottom_center from './kenney_tinytown/Tiles/tile_0073.png';
import house_door from './kenney_tinytown/Tiles/tile_0085.png';
import house_window from './kenney_tinytown/Tiles/tile_0084.png';
import house_bottom_right from './kenney_tinytown/Tiles/tile_0075.png';

import roof_bottom_left from './kenney_tinytown/Tiles/tile_0060.png';
import roof_bottom_center from './kenney_tinytown/Tiles/tile_0061.png';
import roof_bottom_right from './kenney_tinytown/Tiles/tile_0062.png';
import roof_gable from './kenney_tinytown/Tiles/tile_0063.png';

import roof_top_left from './kenney_tinytown/Tiles/tile_0048.png';
import roof_top_center from './kenney_tinytown/Tiles/tile_0049.png';
import roof_top_right from './kenney_tinytown/Tiles/tile_0050.png';
import roof_chimney from './kenney_tinytown/Tiles/tile_0051.png';

import bluePlayer from './uipack_fixed/PNG/blue_sliderDown.png';

import yellowPlayer from './uipack_fixed/PNG/yellow_sliderDown.png';
import redPlayer from './uipack_fixed/PNG/red_sliderDown.png';
import greyPlayer from './uipack_fixed/PNG/grey_sliderDown.png';

import ghostPlayer from "./Dungeon/tile_0121.png";
import spookyWizardPlayer from './Dungeon/tile_0111.png';
import spiderPlayer from './Dungeon/tile_0122.png';
import brownRatPlayer from './Dungeon/tile_0123.png';
import greyRatPlayer from './Dungeon/tile_0124.png';


import './kenney_fontpackage/Fonts/fonts.css';

const npcArray = [spiderPlayer, spookyWizardPlayer, ghostPlayer];
const npcTextColor = ['rgb(168, 134, 8)', 'rgb(162, 70, 8)', 'rgb(153, 153, 153)'];

const objArray = [
    // 1
    house_bottom_left,
    // 2
    house_bottom_center,
    // 3
    house_bottom_right,

    // 4
    roof_bottom_left,
    // 5
    roof_bottom_center,
    // 6
    roof_bottom_right,

    // 7
    roof_top_left,
    // 8
    roof_top_center,
    // 9
    roof_top_right,

    // 10
    roof_chimney,
    // 11
    roof_gable,

    // 12
    house_door,
    // 13
    house_window,

    // 14
    top_green_tree,
    // 15
    bottom_green_tree,
    // 16
    smol_green_tree,

    // 17
    top_yellow_tree,
    // 18
    bottom_yellow_tree,
    // 19
    smol_yellow_tree,

    // 20
    beehive,
];

// const squareArray = [greenPlain, grassGreen, greenFlowers, groundTopLeft, groundTopCenter, groundTopRight, groundCenterLeft, groundCenterCenter, groundCenterRight, groundLowerLeft, groundLowerCenter, groundLowerRight, groundUpperLeftCorner, groundUpperRightCorner, groundLowerRightCorner, groundLowerLeftCorner];

// const currMap = [
//     [0, 1, 1, 0, 1, 0, 0, 1, 1, 0],
//     [0, 3, 4, 4, 4, 4, 4, 4, 5, 0],
//     [1, 6, 7, 7, 7, 7, 7, 7, 8, 1],
//     [1, 6, 7, 7, 7, 7, 7, 7, 8, 0],
//     [1, 6, 7, 7, 7, 7, 7, 7, 8, 0],
//     [0, 6, 7, 7, 7, 7, 7, 7, 8, 0],
//     [0, 9, 10, 15, 7, 7, 14, 10, 11, 1],
//     [0, 1, 1, 6, 7, 7, 8, 0, 1, 1],
//     [0, 0, 1, 6, 7, 7, 8, 0, 0, 0],
//     [0, 0, 0, 9, 10, 10, 11, 0, 0, 0],
// ];

const currMap = [
    [greenPlain, grassGreen, grassGreen, greenPlain, grassGreen, greenPlain, greenPlain, grassGreen, grassGreen, greenPlain],
    [greenPlain, groundTopLeft, groundTopCenter, groundTopCenter, groundTopCenter, groundTopCenter, groundTopCenter, groundTopCenter, groundTopRight, greenPlain],
    [grassGreen, groundCenterLeft, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterRight, grassGreen],
    [grassGreen, groundCenterLeft, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterRight, greenPlain],
    [grassGreen, groundCenterLeft, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterRight, greenPlain],
    [greenPlain, groundCenterLeft, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterCenter, groundCenterRight, greenPlain],
    [greenPlain, groundLowerLeft, groundLowerCenter, groundLowerLeftCorner, groundCenterCenter, groundCenterCenter, groundLowerRightCorner, groundLowerCenter, groundLowerRight, grassGreen],
    [greenPlain, grassGreen, grassGreen, groundCenterLeft, groundCenterCenter, groundCenterCenter, groundCenterRight, greenPlain, grassGreen, grassGreen],
    [greenPlain, greenPlain, grassGreen, groundCenterLeft, groundCenterCenter, groundCenterCenter, groundCenterRight, greenPlain, greenPlain, greenPlain],
    [greenPlain, greenPlain, greenPlain, groundLowerLeft, groundLowerCenter, groundLowerCenter, groundLowerRight, greenPlain, greenPlain, greenPlain],
];

function withinCurrMap(xCoord, yCoord) {
    if ((xCoord < 10) && (xCoord >= 0) && (yCoord < 10) && (yCoord >= 0)) {
        return true;
    } else {
        return false;
    }
}

export class Interface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardState: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                
                // [greenPlain, groundTopLeft, groundTopCenter, groundTopRight, greenPlain],
                // [grassGreen, groundCenterLeft, groundCenterCenter, groundCenterRight, grassGreen],
                // [grassGreen, groundCenterLeft, groundCenterCenter, groundCenterRight, grassGreen],
                // [greenPlain, groundLowerLeft, groundLowerCenter, groundLowerRight, greenPlain],
            ]
        };
    }

    

    render() {
        return (
            <div>
                <h1 style={headerStyle}>You are now a normal rat.</h1>
                <div style={screen}>
                    {
                        this.state.boardState.map((item, index) => {
                            return <div style={csBox} key={"parent" + index}>
                                {
                                    item.map((item2, index2) => {
                                        const playerY = this.props.playerPos[1] - 1 +  index;
                                        const playerX = this.props.playerPos[0] - 2 + index2;
                                        console.log(`IND: ${index2}, ${index}`);
                                        console.log(`POS: ${playerX}, ${playerY}`);
                                        console.log(`PLAYER? ${((index === 1) && (index2 === 2))}`);
                                        if (withinCurrMap(playerX, playerY)) {
                                            console.log(`NPC: ${this.props.npcPos[playerY][playerX]}`);
                                        } else {
                                            console.log('NPC outside range.');
                                        }
                                        console.log("");

                                        return <div style={box} key={"child" + index + "." + index2}>
                                            {((index === 1) && (index2 === 2)) && <Player playerSrc={greyRatPlayer} stopAnim={this.props.dialogOn}/>}
                                            
                                            {((withinCurrMap(playerY, playerX)) && (this.props.npcPos[playerY][playerX] !== 0)) && <NPC npcSrc = {npcArray[this.props.npcPos[playerY][playerX] - 1] }/>}

                                            {((withinCurrMap(playerY, playerX)) && (this.props.objPos[playerY][playerX] !== 0)) && <Object objSrc = {objArray[this.props.objPos[playerY][playerX] - 1]}/>}
                                            
                                            {(withinCurrMap(playerY, playerX)) && <Tile tileName={currMap[playerY][playerX]} />} 
                                            {(! withinCurrMap(playerY, playerX)) && <Tile tileName={blackTile} />}
                                        </div>
                                    })
                                }
                                {
                                    ((this.props.dialogOn !== 0) && (index === 3) && <DialogBox npcID = { this.props.dialogOn } npcDialog = {this.props.result} npcDialogColor = {npcTextColor[this.props.dialogOn - 1]}/>)
                                }
                            </div>


                        })
                    }
                    {/* <div style={csBox}>
                        <Tile tileName= {greenPlain} />
                        <Tile tileName = { groundTopLeft } />
                        <Tile tileName = { groundTopCenter } />
                        <Tile tileName = { groundTopRight } />
                        <Tile tileName = { greenPlain } />
                    </div>
                    <div style={csBox}>
                        <Tile tileName = { grassGreen } />
                        <Tile tileName = { groundCenterLeft } />
                        <Tile tileName = { groundCenterCenter } />
                        <Tile tileName = { groundCenterRight } />
                        <Tile tileName = { grassGreen } />
                    </div>
                    <div style={csBox}>
                        <Tile tileName = { grassGreen } />
                        <Tile tileName = { groundCenterLeft } />
                        <Tile tileName = { groundCenterCenter } />
                        <Tile tileName = { groundCenterRight } />
                        <Tile tileName = { grassGreen } />
                    </div>
                    <div style={csBox}>
                        <Tile tileName = { greenPlain } />
                        <Tile tileName = { groundLowerLeft } />
                        <Tile tileName = { groundLowerCenter } />
                        <Tile tileName = { groundLowerRight } />
                        <Tile tileName = { greenPlain } />
                    </div> */}
                </div>
            </div>
        );
    }
}