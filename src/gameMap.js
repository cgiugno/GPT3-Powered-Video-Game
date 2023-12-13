import { objs, objsHouse } from './ObjectLogic/objsInGame.js';


// Background for Outside of House.
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

// Background For Inside of House.
import blankFloor from './Dungeon/tile_0048.png';
import pebbleFloor from './Dungeon/tile_0049.png';
import shadowFloor from './Dungeon/tile_0050.png';
import shadowPebbleFloor from './Dungeon/tile_0051.png';
import shadowCornerRight from './Dungeon/tile_0052.png';
import shadowCornerLeft from './Dungeon/tile_0052.5.png';


export class Map {
    constructor(thisDims, thisBkgrdMap, thisPlayerPos, thisNPCMap, thisObjList, thisObjMap, thisConnectedMapList, thisConnectedMapMap) {
        this.dims = thisDims;
        this.bkgrdMap = thisBkgrdMap;
        this.playerPos = thisPlayerPos;
        this.npcMap = thisNPCMap;
        this.objList = thisObjList;
        this.objMap = thisObjMap;
        this.connectedMapList = thisConnectedMapList;
        this.connectedMapMap = thisConnectedMapMap;
    }

    // Getters for Dimensions
    getDims() {
        return this.dims;
    }

    getXDim() {
        return this.dims[1];
    }

    getYDim() {
        return this.dims[0];
    }

    // Setters and Getters for Player Position
    setPlayerPos(newPlayerPos) {
        this.playerPos = newPlayerPos;
    }

    setXPlayerPos(newXPos) {
        this.playerPos[1] = newXPos;
    }

    setYPlayerPos(newYPos) {
        this.playerPos[0] = newYPos;
    } 
    
    getPlayerPos() {
        return this.playerPos;
    }

    getXPlayerPos() {
        return this.playerPos[1];
    }

    getYPlayerPos() {
        return this.playerPos[0];
    }



    // Setter and Getter for the Background Tiles Map.
    setBkgrdMap(newBkgrdMap) {
        this.bkgrdMap = newBkgrdMap;
    }
    getBkgrdMap() {
        return this.bkgrdMap;
    }

    // Setter and Getter for the NPC Location Map.
    setNPCMap(newNPCMap) {
        this.npcMap = newNPCMap;
    }
    getNPCMap() {
        return this.npcMap;
    }

    // Adder, Remover and Getter for List of Objects.
    addObject(newObject) {
        this.objList.push(newObject);
    }
    removeObject(objToRemove) {
        const index = this.objList.lastIndexOf(objToRemove);

        this.objList[index] = null;

        for (var i = 0; i < this.objMap.length; i++) {
            for (var j = 0; j < this.objMap[i].length; j++) {
                if (this.objMap[i][j] === index) {
                    this.objMap[i][j] = 0;
                }
            }
        }
    }
    getObjList() {
        return this.objList;
    }

    // Setter, Adder, Remover and Getter for the Object Location Map.
    addObjToMap(xCoord, yCoord, objToAdd) {
        const objIndex =  this.objList.lastIndexOf(objToAdd);
        if ((yCoord < this.objMap.length) && (this.objMap.length > 0) && (xCoord > this.objMap[0].length)) {
            this.objMap[xCoord][yCoord] = objIndex;
        }
    }
    removeObjFromMap(objToRemove) {
        const objIndex =  this.objList.lastIndexOf(objToRemove);
        for (var i = 0; i < this.objMap.length; i++) {
            for (var j = 0; j < this.objMap[i].length; j++) {
                if (this.objMap[i][j] === objIndex) {
                    this.objMap[i][j] = 0;
                }
            }
        }
    }
    setObjMap(newObjMap) {
        this.objMap = newObjMap;
    }
    getObjMap() {
        return this.objMap;
    }

    // Setters and Getters for the List of Connected Maps.

    setConnectedMapList(newConnectedMapList) {
        this.connectedMapList = newConnectedMapList;
    }
    getConnectedMapList() {
        return this.connectedMapList;
    }

    // Setter at index, General Setter, and Getter for the Map of Connections to other Maps.
    setConnectedMapAt(xIndex, yIndex, newValue) {
        if ((yIndex < this.connectedMapMap.length) && (this.connectedMapMap.length > 0) && (xIndex > this.connectedMapMap[0].length)) {
            this.connectedMapMap[yIndex][xIndex] = newValue;
        }
    }
    setConnectedMapMap(newConnectedMapMap) {
        this.connectedMapMap = newConnectedMapMap;
    }
    getConnectedMapMap() {
        return this.connectedMapMap;
    }
}

var npcMapOutside = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var objMapOutside = [
    [0, 0, 22, 19, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 7, 8, 10, 9, 0, 0, 0, 0, 0],
    [0, 4, 5, 5, 6, 0, 0, 0, 21, 0],
    [0, 1, 2, 12, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 14, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 15, 20],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var grdMap = [
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

var outsideConnectedMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export var outsideMap = new Map(
    [10, 10],
    grdMap,
    [3, 5],
    npcMapOutside,
    objs,
    objMapOutside,
    [null],
    outsideConnectedMap,
);

var houseBkgrdMap = [
    [blankFloor, blankFloor, blankFloor, blankFloor, blankFloor, blankFloor, blankFloor],
    [blankFloor, blankFloor, blankFloor, blankFloor, blankFloor, blankFloor, blankFloor],
    [blankFloor, shadowCornerLeft, shadowPebbleFloor, shadowFloor, shadowFloor, shadowPebbleFloor, blankFloor],
    [blankFloor, blankFloor, blankFloor, blankFloor, pebbleFloor, blankFloor, blankFloor],
    [blankFloor, pebbleFloor, blankFloor, blankFloor, blankFloor, blankFloor, blankFloor],
    [blankFloor, blankFloor, blankFloor, blankFloor, blankFloor, pebbleFloor, blankFloor],
    [blankFloor, blankFloor, blankFloor, blankFloor, blankFloor, blankFloor, blankFloor],
];

var houseNPCMap = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

var houseObjMap = [
    [10, 11, 11, 11, 11, 11, 12],
    [21, 19, 14, 14, 16, 20, 22],
    [21, 26,  0,  0,  0,  4, 22],
    [21,  8,  0,  0,  0,  5, 22],
    [21,  3,  9,  0,  0,  6, 22],
    [21,  0,  0,  0,  0,  7, 22],
    [23, 24, 24, 24, 24, 24, 25],
]

var houseConnectedMap = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],

]

export var houseMap = new Map(
    [7, 7],
    houseBkgrdMap,
    [4, 2],
    houseNPCMap,
    objsHouse,
    houseObjMap,
    [outsideMap],
    houseConnectedMap,
);

outsideMap.setConnectedMapList([houseMap]);