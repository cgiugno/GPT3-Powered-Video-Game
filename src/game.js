import React from 'react';
import { useEffect, useState } from 'react';
import { spiderNPC, wizardNPC, ghostNPC } from './dialogTrees.js';
import { Interface } from "./interface.js";

// const configuration = new Configuration({
//     organization: "org-lCoICPkqEqYQHQq9xT7TXP53",
//     apiKey: process.env.REACT_APP_API_KEY,
// });

const npcPrompts = ["Say hello in a bright cheery way.", "Say hello in a angry way.", 'Say hello in a goofy, whimsical way.'];
const npcs = [spiderNPC, wizardNPC, ghostNPC];
const testing = false;

export function Game(props) {
    const [playerCoord, setPlayerCoord] = useState([4, 7]);
    const [isDialog, setIsDialog] = useState(0);
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
        var objInMovePos = false;
        // console.log(coordsToCheck[0]);
        // console.log(coordsToCheck[1]);
        // console.log(npcMap);
        if (objMap[coordsToCheck[1]][coordsToCheck[0]] !== 0) {
            objInMovePos = true;
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

    const handleKeydown = (event) => {
        console.log(event.key);

        if (isDialog === 0) {
            if (event.key === 'w') {
                console.log("W key pressed.");

                if ((playerCoord[1] > 0) && (playerCoord[1] <= 9)) {
                    const preMove = playerCoord;
                    const npcChecked = checkForNPC([preMove[0], (preMove[1] - 1)]);
                    const objChecked = checkForObj([preMove[0], (preMove[1] - 1)]);
                    if ((npcChecked === false) && (objChecked === false)) {
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

                    if ((npcChecked === false) && (objChecked === false)) {
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

                    if ((npcChecked === false) && (objChecked === false)) {
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

                    if ((npcChecked === false) && (objChecked === false)) {
                        setPlayerCoord([(preMove[0] + 1), (preMove[1])]);
                    }
                }
            }
        }
        if (event.key === ' ') {
            console.log("Space key pressed.");
            const adjToNPC = isAdjNPC(playerCoord);
            if (adjToNPC !== 0) {
                const preDialog = isDialog;
                if (preDialog !== 0) {
                    setIsDialog(0);
                    setResultDialog('');
                } else {
                    setIsDialog(adjToNPC);
                    getDialog(adjToNPC);
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
    }, [playerCoord, isDialog]);

    return (
        <Interface playerPos={playerCoord} npcPos={npcMap} objPos={objMap} dialogOn={isDialog} result={(resultDialog !== '') ? resultDialog : '...'} dialogChoices={dialogChoices} onDialogClick={onDialogClick} />
    );
}