import React from 'react';
import { screen, csBox, headerStyle, box } from './style.js';
import { Tile } from "./tile.js";
import { Player } from './player.js';
import { DialogBox } from "./dialogBox.js";
import { InventoryBox } from './inventoryBox.js';
import { NPC } from './npc.js';
import { Object } from './object.js';

import { houseMap, outsideMap } from './gameMap.js';


import ghostPlayer from "./Dungeon/tile_0121.png";
import spookyWizardPlayer from './Dungeon/tile_0111.png';
import spiderPlayer from './Dungeon/tile_0122.png';
import witchNPC from './Dungeon/tile_0100.png';
import brownRatPlayer from './Dungeon/tile_0123.png';
import greyRatPlayer from './Dungeon/tile_0124.png';


import './kenney_fontpackage/Fonts/fonts.css';
import blackTile from './kenney_tinytown/Tiles/tile_0133.png';



const npcArray = [spiderPlayer, spookyWizardPlayer, ghostPlayer, witchNPC];
const npcTextColor = ['rgb(168, 134, 8)', 'rgb(162, 70, 8)', 'rgb(153, 153, 153)', 'rgb(22, 110, 147)'];


export class Interface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardState: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ]
        };
    }
    withinCurrMap(xCoord, yCoord) {
        if ((yCoord < this.props.currMap.getBkgrdMap().length) && (yCoord >= 0) && (xCoord < this.props.currMap.getBkgrdMap().length) && (xCoord >= 0)) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const npcPos = this.props.currMap.getNPCMap();
        const objPos = this.props.currMap.getObjMap();
        const bkgrdMap = this.props.currMap.getBkgrdMap();
        const objList = this.props.currMap.getObjList();
        return (
            <div>
                <h1 style={headerStyle}>A rat pun.</h1>
                <div style={screen}>
                    {(this.props.isInventory > 0) && <InventoryBox inventory={this.props.inventory}/> } 
                    {
                        this.state.boardState.map((item, index) => {
                            return <div 
                                style={csBox} 
                                key={"parent" + index}>
                                {
                                    item.map((item2, index2) => {
                                        const playerY = this.props.playerPos[1] - 1 +  index;
                                        const playerX = this.props.playerPos[0] - 2 + index2;

                                        return <div 
                                            style={box} 
                                            key={"child" + index + "." + index2}>
                                            {((index === 1) && (index2 === 2)) && 
                                                <Player playerSrc={greyRatPlayer} playerOrientation={this.props.playerOri} stopAnim={(this.props.dialogOn || (this.props.objDescOn !== 0) || this.props.isInventory)}/>}
                                            
                                            {((this.withinCurrMap(playerY, playerX)) && (npcPos[playerY][playerX] !== 0)) && 
                                                <NPC npcSrc = {npcArray[npcPos[playerY][playerX] - 1] }/>}

                                            {((this.withinCurrMap(playerY, playerX)) && (objPos[playerY][playerX] !== 0)) && 
                                                <Object objSrc = {objList[objPos[playerY][playerX] - 1].getImgURL()}/>}
                                            
                                            {(this.withinCurrMap(playerY, playerX)) && <Tile tileName={bkgrdMap[playerY][playerX]} />} 
                                            {(! this.withinCurrMap(playerY, playerX)) && <Tile tileName={blackTile} />}
                                        </div>
                                    })
                                }
                                {
                                    (((this.props.dialogOn !== 0) || (this.props.objDescOn !== 0)) && (index === 3) && <DialogBox 
                                        npcID = {(this.props.dialogOn !== 0) ? this.props.dialogOn : 4} 
                                        npcDialog = {this.props.result} 
                                        npcDialogColor = {(this.props.dialogOn !== 0)? npcTextColor[this.props.dialogOn - 1] : npcTextColor[3]} 
                                        npcChoices = {this.props.dialogChoices} 
                                        onDialogClick = { this.props.onDialogClick }/>)
                                }
                            </div>

                        })
                    }
                </div>
            </div>
        );
    }
}
