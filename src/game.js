import React from 'react';
import { useEffect, useState } from 'react';
import { spiderNPC, wizardNPC, ghostNPC } from './dialogTrees.js';
import { Interface } from "./interface.js";
import { beeHive, tallGreenTree, smallyellowtree, house } from './ObjectLogic/objsInGame.js';

// const configuration = new Configuration({
//     organization: "org-lCoICPkqEqYQHQq9xT7TXP53",
//     apiKey: process.env.REACT_APP_API_KEY,
// });

const npcs = [spiderNPC, wizardNPC, ghostNPC];
const objs = [
    house.getObjFromSub(7), // 1                // 0
    house.getObjFromSub(8),  // 2               // 1 
    house.getObjFromSub(10), // 3               // 2
    house.getObjFromSub(4), // 4                // 3
    house.getObjFromSub(5), // 5                // 4
    house.getObjFromSub(6), // 6                // 5
    house.getObjFromSub(0), // 7                // 6
    house.getObjFromSub(1), // 8                // 7
    house.getObjFromSub(3), // 9                // 8
    house.getObjFromSub(2), // 10               // 9
    null, // 11                                 // 10
    house.getObjFromSub(9), //12                // 11
    null, // 13                                 // 12
    tallGreenTree.getObjFromSub(0), // 14       // 13
    tallGreenTree.getObjFromSub(1), // 15       // 14
    null, // 16                                 // 15
    null, // 17                                 // 16
    null, // 18                                 // 17
    smallyellowtree, // 19                      // 18
    beeHive, // 20                              // 19
]
const testing = false;

export function Game(props) {
    const [playerCoord, setPlayerCoord] = useState([4, 7]);
    const [isDialog, setIsDialog] = useState(0);
    const [isObjDesc, setIsObjDesc] = useState(0);
    const [resultDialog, setResultDialog] = useState('');
    const [dialogChoices, setDialogChoices] = useState([]);
    const [npcMap, setNpcMap] = useState([
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
    ]);
    const [objMap, setObjMap] = useState([
        [0, 0, 0, 19, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 7, 8, 10, 9, 0, 0, 0, 0, 0],
        [0, 4, 5, 5, 6, 0, 0, 0, 0, 0],
        [0, 1, 2, 12, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 14, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 15, 20],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

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
                    const dialogRequest = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + String(process.env.REACT_APP_API_KEY),
                        },
                        body: JSON.stringify({
                            'model': 'text-davinci-003',
                            'temperature': 0.7,
                            'max_tokens': 50,
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
        console.log("Object Index: " + (objNum - 1));
        console.log("Object: " + objs[objNum - 1]);
        console.log("Object Name: " + objs[objNum - 1].getName());
        if (testing) {
            setResultDialog(objs[objNum - 1].getDesc());
            setDialogChoices(null)
        } else {
            const currObj = objs[objNum - 1];
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
                        'max_tokens': 50,
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


    // async function getDialog(npcNum) {
    //     try {
    //         const response = await fetch("./dialogFetch.js", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ npcPrompt: npcPrompts[0]}),
    //         });
    //         // const data = await response.json();
    //         // if (response.status !== 200) {
    //         //     throw data.error || new Error(`Request failed with status ${response.status}`);
    //         // }

    //         // setResultDialog(data.result);
    //     } catch(error) {
    //         console.log("ERROR OCCURED!");
    //         console.error(error);
    //         alert(error.message);
    //     }
    // }

    const checkForNPC = (coordsToCheck) => {
        var npcInMovePos = false;
        // console.log(coordsToCheck[0]);
        // console.log(coordsToCheck[1]);
        // console.log(npcMap);
        if (npcMap[coordsToCheck[1]][coordsToCheck[0]] !== 0) {
            npcInMovePos = true;
        }
        return npcInMovePos;
    }

    const checkForObj = (coordsToCheck) => {
        var objInMovePos = 0;
        // console.log(coordsToCheck[0]);
        // console.log(coordsToCheck[1]);
        // console.log(npcMap);
        const objCoord = objMap[coordsToCheck[1]][coordsToCheck[0]];
        console.log("Coordinate: " + objMap[coordsToCheck[1]][coordsToCheck[0]])
        console.log("Object: " + JSON.stringify(objs[objCoord - 1]));
        if ((objCoord !== 0) && (objs[objCoord - 1].getInteractable() === true)) {
            objInMovePos = objMap[coordsToCheck[1]][coordsToCheck[0]];
        }
        return objInMovePos;
    }

    const isAdjNPC = (coordsToCheck) => {
        var adjNPC = 0;
        if ((coordsToCheck[1] + 1 <= 9) && (npcMap[coordsToCheck[1] + 1][coordsToCheck[0]] !== 0)) {
            adjNPC = npcMap[coordsToCheck[1] + 1][coordsToCheck[0]];
        } else if ((coordsToCheck[1] - 1 >= 0) && (npcMap[coordsToCheck[1] - 1][coordsToCheck[0]] !== 0)) {
            adjNPC = npcMap[coordsToCheck[1] - 1][coordsToCheck[0]];
        } else if ((coordsToCheck[0] + 1 <= 9) && (npcMap[coordsToCheck[1]][coordsToCheck[0] + 1] !== 0)) {
            adjNPC = npcMap[coordsToCheck[1]][coordsToCheck[0] + 1];
        } else if ((coordsToCheck[0] - 1 >= 0) && (npcMap[coordsToCheck[1]][coordsToCheck[0] - 1] !== 0)) {
            adjNPC = npcMap[coordsToCheck[1]][coordsToCheck[0] - 1];
        }
        return adjNPC;
    }

    const isAdjObj = (coordsToCheck) => {
        var adjObj = 0;
        if ((coordsToCheck[1] + 1 <= 9) && (objMap[coordsToCheck[1] + 1][coordsToCheck[0]] !== 0)) {
            adjObj = objMap[coordsToCheck[1] + 1][coordsToCheck[0]];
        } else if ((coordsToCheck[1] - 1 >= 0) && (objMap[coordsToCheck[1] - 1][coordsToCheck[0]] !== 0)) {
            adjObj = objMap[coordsToCheck[1] - 1][coordsToCheck[0]];
        } else if ((coordsToCheck[0] + 1 <= 9) && (objMap[coordsToCheck[1]][coordsToCheck[0] + 1] !== 0)) {
            adjObj = objMap[coordsToCheck[1]][coordsToCheck[0] + 1];
        } else if ((coordsToCheck[0] - 1 >= 0) && (objMap[coordsToCheck[1]][coordsToCheck[0] - 1] !== 0)) {
            adjObj = objMap[coordsToCheck[1]][coordsToCheck[0] - 1];
        }
        console.log("Adjacent to Object? " + adjObj);
        return adjObj;
    }

    const handleKeydown = (event) => {
        console.log(event.key);

        if (isDialog === 0) {
            if (event.key === 'w') {
                console.log("W key pressed.");

                if ((playerCoord[1] > 0) && (playerCoord[1] <= 9)) {
                    const preMove = playerCoord;
                    const npcChecked = checkForNPC([preMove[0], (preMove[1] - 1)]);
                    const objChecked = checkForObj([preMove[0], (preMove[1] - 1)]);
                    if ((npcChecked === false) && (objChecked === 0)) {
                        setPlayerCoord([preMove[0], (preMove[1] - 1)]);
                    }
                }
            }
            if (event.key === 's') {
                console.log("S key pressed.");

                if ((playerCoord[1] >= 0) && (playerCoord[1] < 9)) {
                    const preMove = playerCoord;
                    const npcChecked = checkForNPC([preMove[0], (preMove[1] + 1)]);
                    const objChecked = checkForObj([preMove[0], (preMove[1] + 1)]);

                    if ((npcChecked === false) && (objChecked === 0)) {
                        setPlayerCoord([preMove[0], (preMove[1] + 1)]);
                    }
                }
            }
            if (event.key === 'a') {
                console.log("A key pressed.");

                if ((playerCoord[0] > 0) && (playerCoord[0] <= 9)) {
                    const preMove = playerCoord;
                    const npcChecked = checkForNPC([(preMove[0] - 1), (preMove[1])]);
                    const objChecked = checkForObj([(preMove[0] - 1), (preMove[1])]);

                    if ((npcChecked === false) && (objChecked === 0)) {
                        setPlayerCoord([(preMove[0] - 1), (preMove[1])]);
                    }
                }
            }
            if (event.key === 'd') {
                console.log("D key pressed.");

                if ((playerCoord[0] >= 0) && (playerCoord[0] < 9)) {
                    const preMove = playerCoord;
                    const npcChecked = checkForNPC([(preMove[0] + 1), (preMove[1])]);
                    const objChecked = checkForObj([(preMove[0] + 1), (preMove[1])]);

                    if ((npcChecked === false) && (objChecked === 0)) {
                        setPlayerCoord([(preMove[0] + 1), (preMove[1])]);
                    }
                }
            }
        }
        if (event.key === ' ') {
            console.log("Space key pressed.");
            const adjToNPC = isAdjNPC(playerCoord);
            const adjToObj = isAdjObj(playerCoord);
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
    }, [playerCoord, isDialog, isObjDesc]);

    return (
        <Interface 
            playerPos={playerCoord} 
            npcPos={npcMap} 
            objPos={objMap} 
            dialogOn={isDialog} 
            objDescOn={isObjDesc}
            result={(resultDialog !== '') ? resultDialog : '...'} 
            dialogChoices={dialogChoices} 
            onDialogClick={onDialogClick} 
        />
    );
}