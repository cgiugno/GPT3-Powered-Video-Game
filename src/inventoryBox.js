import React from "react";
import { useEffect, useState } from 'react';
import { inventoryBoxStyle, inventoryStyle, inventoryCount, inventorySelected, inventoryTextStyle, inventoryCountTextStyle } from "./style";

import greenBox from "./uipack_fixed/PNG/green_button02.5.png";
import countBackground from "./uipack_fixed/PNG/green_circle.png";


const dialogTextColor = 'rgb(71, 131, 44)'

export function InventoryBox(props) {
    const [ind, setInd] = useState(0);

    console.log("Inventory: " + JSON.stringify(props.inventory));


    return <div>
        <div style={Object.assign({ backgroundImage: `url(${greenBox})` }, inventoryStyle)}>
            <h2 style={Object.assign({ color: dialogTextColor }, inventoryTextStyle)}>Inventory</h2>
            {

                props.inventory.slice(ind, ind + 3).map((item, index) => {
                    console.log("map " + index);
                    var styleSelected;
                    // if (index == ind) {
                    //     styleSelected = Object.assign({borderColor: dialogTextColor}, inventorySelected, { backgroundImage: `url(${props.inventoryBoxSrc[index]})` }, inventoryBoxStyle);
                    // } else {
                        console.log("Inventory? " + JSON.stringify(props.inventory[index]));
                        styleSelected = Object.assign({ backgroundImage: `url(${props.inventory[index].obj.getImgURL()})` }, inventoryBoxStyle);
                    // }
                    return <div key={"inventory " + index} style={styleSelected}>
                        <div style={Object.assign({ backgroundImage: `url(${countBackground})` }, inventoryCount)}>
                            <h2 style={Object.assign({ color: dialogTextColor }, inventoryCountTextStyle)}>{props.inventory[index].count}</h2>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}