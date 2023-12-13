import React from 'react';
import { useEffect, useState } from 'react';
import { spiderNPC, wizardNPC, ghostNPC, witchNPC } from './dialogTrees.js';
import { Interface } from "./interface.js";
import { outsideMap, houseMap } from './gameMap.js';
// import {Configuration, OpenAIApi} from "openai";

const currGameMap = outsideMap;
const npcs = [spiderNPC, wizardNPC, ghostNPC, witchNPC];
const testing = false;

export function Game(props) {
    // Coordinates of Player in Current Map.
    const [playerCoord, setPlayerCoord] = useState([4, 7]); // [4, 7]
    // Orientation of Player (in degrees) in Current Map.
    // 0 = North
    // 90 = East
    // 180 = South
    // 270 = West
    const [playerOrientation, setPlayerOrientation] = useState(0);
    
    // True if Player Inventory is Open
    const [isInventory, setIsInventory] = useState(0);
    // Items in Player Inventory.
    const [playerInventory, setPlayerInventory] = useState([]);

    // True if Player is Conversing with an NPC or Examining an Object.
    const [isDialog, setIsDialog] = useState(0);
    // Object Description from GPT-3.
    const [isObjDesc, setIsObjDesc] = useState(0);
    // NPC Dialog from GPT-3.
    const [resultDialog, setResultDialog] = useState('');
    // Choices for Given NPC Dialog.
    const [dialogChoices, setDialogChoices] = useState([]);

    // Current Game Map
    const [currMap, setCurrMap] = useState(currGameMap);

    async function getDialog(npcNum) {
        console.log("Conversant: " + npcs[npcNum - 1].getName());
        console.log("Index of Conversation: " + npcs[npcNum - 1].getCurrConv());

        if (npcs[npcNum - 1].getCurrConversation().getIndex() !== -1) {
            if (testing) {
                const currentConveration = npcs[npcNum - 1].getCurrConv();
                setResultDialog(npcs[npcNum - 1].getConversationInd(currentConveration).getCurrentTurnPrompt());
                setDialogChoices(npcs[npcNum - 1].getCurrConversation().getCurrentTurnChoices());

            } else {
                console.log(npcNum);
                const currNPC = npcs[npcNum - 1];
                const testPrompt = currNPC.getDesc() + currNPC.getCurrConversation().getCurrentTurnPrompt();
                try {
                    // const openai = new OpenAI({
                    //     apiKey: process.env.OPENAI_API_KEY,
                    // });

                    // const chatCompletion = await openai.chat.completions.create({
                    //     messages: [{ role: "video game NPC", content: testPrompt }],
                    // model: "gpt-3.5-turbo",
                    // });


                    
                    // const dialogRequest = {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'Authorization': 'Bearer ' + String(process.env.REACT_APP_API_KEY),
                    //     },
                    //     body: JSON.stringify({
                    //         'model': 'text-curie-001',
                    //         'temperature': 0.7,
                    //         'max_tokens': 50,
                    //         'prompt': testPrompt,
                    //     })
                    // };
                    // const response = await fetch('https://api.openai.com/v1/completions', dialogRequest);
                    // const response = chatCompletion;

                    const dialogRequest = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + String(process.env.REACT_APP_API_KEY),
                        },
                        body: JSON.stringify({
                            'model': 'text-davinci-003',
                            'temperature': 0.7,
                            'max_tokens': 40,
                            'prompt': testPrompt,
                        })
                    };
                    const response = await fetch('https://api.openai.com/v1/completions', dialogRequest);
                    const data = await response.json();
                    console.log(data);
                    setResultDialog(data.choices[0].text);
                    console.log("Choices: " + currNPC.getCurrConversation().getCurrentTurnChoices());
                    setDialogChoices(currNPC.getCurrConversation().getCurrentTurnChoices());

                } catch (error) {
                    console.log("ERROR OCCURRED!");
                    console.error(error);
                    alert(console.message);
                }
            }
        } else {
            setIsDialog(0);
            setResultDialog('');
            setDialogChoices(['', '']);
        }
    }

    async function getObjDesc(objNum) {
        const obj = currMap.getObjList()[objNum - 1];
        console.log("Object Index: " + (objNum - 1));
        console.log("Object: " + obj);
        console.log("Object Name: " + obj.getName());
        if (testing) {
            setResultDialog(obj.getDesc());
            setDialogChoices(null)
        } else {
            const currObj = obj;
            const objPrompt = currObj.getDesc()
            try {
                const dialogRequest = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(process.env.REACT_APP_API_KEY),
                    },
                    body: JSON.stringify({
                        'model': 'text-davinci-003',
                        'temperature': 0.7,
                        'max_tokens': 40,
                        'prompt': objPrompt,
                    })
                };
                const response = await fetch('https://api.openai.com/v1/completions', dialogRequest);
                const data = await response.json();
                console.log("Object Description: " + data);
                setResultDialog(data.choices[0].text);
                setDialogChoices(null);
            } catch (error) {
                console.log("ERROR OCCURRED!");
                console.error(error);
                alert(console.message);
            }
        }
    }

    const addItemToInventory = (object) => {
        console.log("Player Inventory Before Add Item: " + JSON.stringify(playerInventory));
        var curInv = playerInventory;
        var countOfObject = 0;
        var index = 0;

        for (var i = 0; i < curInv.length; i++) {
            if (object === curInv[i].obj) {
                countOfObject += curInv[i].count;
                index = i;
            }
        }

        if (countOfObject <= 0) {
            curInv.push({
                obj: object,
                count: countOfObject + 1,
            });
            console.log("Current Inventory: " + JSON.stringify(curInv));
            setPlayerInventory(curInv);
        } else {
            console.log("Previous Inventory Item: " + JSON.stringify(curInv[index]));
            const preCount = curInv[index].count;
            curInv[index].count = preCount + 1;
            console.log("Current Inventory: " + JSON.stringify(curInv));
            setPlayerInventory(curInv);
        }

    }

    const changeMap = (mapIndToChange) => {
        // console.log("Map List? " + JSON.stringify(currMap.getConnectedMapList()));

        var newMap = currMap.getConnectedMapList()[mapIndToChange - 1];

        // console.log("New Map? " + JSON.stringify(newMap));

        setPlayerCoord(newMap.getPlayerPos());
        setPlayerOrientation(0);
        setCurrMap(newMap);
    }

    const onDialogClick = (dialogChosen) => {
        if (isDialog > -1) {
            const currNPC = npcs[isDialog - 1];
            console.log("Current Conversation: " + JSON.stringify(currNPC.getCurrConversation()));
            console.log("Current Conversation Index: " + currNPC.getCurrConversation().getIndex());
            currNPC.getCurrConversation().traverseConv(dialogChosen);

            console.log("New Conversation: " + JSON.stringify(currNPC.getCurrConversation()));

            getDialog(isDialog);
        }

    }



    const playerFacing = (currCoords, currOrientation) => {
        var coordsToCheck = currCoords;
        switch (currOrientation) {
            case 0:
                coordsToCheck = [currCoords[0], currCoords[1] + 1];
                break;
            case 90:
                coordsToCheck = [currCoords[0] - 1, currCoords[1]];
                break;
            case 180:
                coordsToCheck = [currCoords[0], currCoords[1] - 1];
                break;
            case 270:
                coordsToCheck = [currCoords[0] + 1, currCoords[1]];
                break;
        }

        return coordsToCheck;
    }

    const checkForNPC = (coordsToCheck) => {
        var npcInMovePos = 0;
        // console.log(coordsToCheck[0]);
        // console.log(coordsToCheck[1]);
        const npcMap = currMap.getNPCMap();

        if (npcMap[coordsToCheck[1]][coordsToCheck[0]] !== 0) {
            npcInMovePos = npcMap[coordsToCheck[1]][coordsToCheck[0]];
        }
        return npcInMovePos;
    }

    const checkForObj = (coordsToCheck) => {
        var objInMovePos = 0;
        // console.log(coordsToCheck[0]);
        // console.log(coordsToCheck[1]);
        const objMap = currMap.getObjMap();

        const objCoord = objMap[coordsToCheck[1]][coordsToCheck[0]];
        console.log("Coordinate: " + objMap[coordsToCheck[1]][coordsToCheck[0]])
        console.log("Object: " + JSON.stringify(currMap.getObjList()[objCoord - 1]));
        if ((objCoord !== 0) && (currMap.getObjList()[objCoord - 1].getInteractable() === true)) {
            objInMovePos = objMap[coordsToCheck[1]][coordsToCheck[0]];
        }
        return objInMovePos;
    }

    const checkForMap = (coordsToCheck) => {
        var mapInMovePos = 0;
        const mapMap = currMap.getConnectedMapMap();

        if (mapMap[coordsToCheck[1]][coordsToCheck[0]] !== 0) {
            mapInMovePos = mapMap[coordsToCheck[1]][coordsToCheck[0]];
        }

        return mapInMovePos;
    }


    const handleKeydown = (event) => {
        console.log(event.key);
        console.log("Player Dialog? " + isDialog);
        console.log("Player Object Description? " + isObjDesc);
        console.log("Player Inventory? " + isInventory);


        if ((isDialog === 0) && (isObjDesc === 0) && (isInventory === 0)) {
            if (event.key === 'w') {
                console.log("W key pressed.");

                if (playerOrientation === 180) {
                    console.log("Moving...");
                    if ((playerCoord[1] > 0) && (playerCoord[1] <= (currMap.getDims()[1] - 1))) {
                        const preMove = playerCoord;
                        const npcChecked = checkForNPC([preMove[0], (preMove[1] - 1)]);
                        const objChecked = checkForObj([preMove[0], (preMove[1] - 1)]);
                        const mapChecked = checkForMap([preMove[0], (preMove[1] - 1)]);
                        if (mapChecked !== 0) {
                            changeMap(mapChecked);
                        }
                        else if ((npcChecked === 0) && (objChecked === 0)) {
                            setPlayerCoord([preMove[0], (preMove[1] - 1)]);
                        }
                    }
                } else {
                    console.log("Turning...");
                    setPlayerOrientation(180);
                    console.log("New Player Orientation: " + playerOrientation);
                }

            }
            if (event.key === 's') {
                console.log("S key pressed.");

                if (playerOrientation === 0) {
                    console.log("Moving...");
                    if ((playerCoord[1] >= 0) && (playerCoord[1] < (currMap.getDims()[1] - 1))) {
                        const preMove = playerCoord;
                        const npcChecked = checkForNPC([preMove[0], (preMove[1] + 1)]);
                        const objChecked = checkForObj([preMove[0], (preMove[1] + 1)]);
                        const mapChecked = checkForMap([preMove[0], (preMove[1] + 1)]);
                        if (mapChecked !== 0) {
                            changeMap(mapChecked);
                        }
                        else if ((npcChecked === 0) && (objChecked === 0)) {
                            setPlayerCoord([preMove[0], (preMove[1] + 1)]);
                        }
                    }
                } else {
                    console.log("Turning...");
                    setPlayerOrientation(0);
                    console.log("New Player Orientation: " + playerOrientation);
                }
            }
            if (event.key === 'a') {
                console.log("A key pressed.");

                if (playerOrientation === 90) {
                    console.log("Moving...");
                    if ((playerCoord[0] > 0) && (playerCoord[0] <= (currMap.getDims()[0] - 1))) {
                        const preMove = playerCoord;
                        const npcChecked = checkForNPC([(preMove[0] - 1), (preMove[1])]);
                        const objChecked = checkForObj([(preMove[0] - 1), (preMove[1])]);
                        const mapChecked = checkForMap([(preMove[0] - 1), (preMove[1])]);
                        if (mapChecked !== 0) {
                            changeMap(mapChecked);
                        }
                        else if ((npcChecked === 0) && (objChecked === 0)) {
                            setPlayerCoord([(preMove[0] - 1), (preMove[1])]);
                        }
                    }
                } else {
                    console.log("Turning...");
                    setPlayerOrientation(90);
                    console.log("New Player Orientation: " + playerOrientation);

                }
            }
            if (event.key === 'd') {
                console.log("D key pressed.");

                if (playerOrientation === 270) {
                    console.log("Moving...");
                    if ((playerCoord[0] >= 0) && (playerCoord[0] < (currMap.getDims()[0] - 1))) {
                        const preMove = playerCoord;
                        const npcChecked = checkForNPC([(preMove[0] + 1), (preMove[1])]);
                        const objChecked = checkForObj([(preMove[0] + 1), (preMove[1])]);
                        const mapChecked = checkForMap([(preMove[0] + 1), (preMove[1])]);
                        if (mapChecked !== 0) {
                            changeMap(mapChecked);
                        }
                        if ((npcChecked === 0) && (objChecked === 0)) {
                            setPlayerCoord([(preMove[0] + 1), (preMove[1])]);
                        }
                    }
                } else {
                    console.log("Turning...");
                    setPlayerOrientation(270);
                    console.log("New Player Orientation: " + playerOrientation);

                }
            }
        }
        if ((isDialog === 0) && (isObjDesc === 0)) {
            if (event.key === 'f') {
                console.log("Object Descriptions? " + isObjDesc);
                if (isObjDesc === 0) {
                    console.log("F key pressed.");
                    console.log("Inventory Value? " + isInventory);
                    const preInventory = isInventory;
                    if (preInventory > 0) {
                        setIsInventory(0);
                        console.log("New Inventory Value: " + isInventory);
                    }
                    else {
                        setIsInventory(1);
                        console.log("New Inventory Value: " + isInventory);
                    }
                }
            }
        }
        if (isInventory === 0) {
            if (event.key === ' ') {
                console.log("Space key pressed.");
                const coordsToCheck = playerFacing(playerCoord, playerOrientation);
                const adjToNPC = checkForNPC(coordsToCheck);
                const adjToObj = checkForObj(coordsToCheck);
                if (adjToNPC !== 0) {
                    const preDialog = isDialog;
                    // Spacebar if is speaking with NPC.
                    if (preDialog !== 0) {
                        setIsDialog(0);
                        setResultDialog('');
                        setDialogChoices(['', '']);
                        // Spacebar if is speaking to NPC.
                    } else {
                        const currNPC = npcs[adjToNPC - 1];
                        console.log("NPC: " + currNPC);
                        console.log("Conversation: " + currNPC.getCurrConversation());

                        if (currNPC.getCurrConversation().getFinished() === true) {
                            setIsDialog(adjToNPC);
                            setResultDialog(currNPC.getDefault());
                            setDialogChoices(null);
                        } else {
                            setIsDialog(adjToNPC);
                            getDialog(adjToNPC);
                        }
                    }
                } else if (adjToObj !== 0) {
                    const preObjDesc = isObjDesc;
                    console.log("Currently speaking with...? " + isObjDesc);
                    console.log("Am adjacent to... " + adjToObj);
                    if (preObjDesc !== 0) {
                        setIsObjDesc(0);
                        setResultDialog('');
                        setDialogChoices(null);
                    } else {
                        console.log("Speaking to Obj.");
                        setIsObjDesc(adjToObj);
                        console.log("And again " + isObjDesc);
                        getObjDesc(adjToObj);
                        setDialogChoices(null);

                        if (currMap.getObjList()[adjToObj - 1].getCanPickUp() > 0) {
                            addItemToInventory(currMap.getObjList()[adjToObj - 1]);
                            console.log(playerInventory);

                            currMap.getObjList()[adjToObj - 1].pickUp();
                        }

                    }
                }
            }
        }
    }

    useEffect(() => {
        // console.log("Pre Move: [" + playerCoord[0] + ", " + playerCoord[1] + "]");
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
            // console.log("Moved: [" + playerCoord[0] + ", " + playerCoord[1] + "]");
            // console.log('Dialog: ' + isDialog);
        }
    }, [playerCoord, playerOrientation, isDialog, isObjDesc, isInventory, currMap]);

    return (
        <Interface
            playerPos={playerCoord}
            playerOri={playerOrientation}
            currMap={currMap}
            dialogOn={isDialog}
            objDescOn={isObjDesc}
            result={(resultDialog !== '') ? resultDialog : '...'}
            dialogChoices={dialogChoices}
            onDialogClick={onDialogClick}
            isInventory={isInventory}
            inventory={playerInventory}
        />
    );
}
