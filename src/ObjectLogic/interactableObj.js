import blackTile from '../kenney_tinytown/Tiles/tile_0133.png';

export class Obj {
    name;
    desc;
    imgURL;
    objPos;
    interactable;
    numTimesToPickUp;

    constructor() {
        this.name = "";
        this.desc = "";
        this.imgURL = blackTile;
        this.objPos = [];
        this.interactable = false;
        this.numTimesToPickUp = 0;

    }
    setName(newName) {
        this.name = newName;
    }
    getName() {
        return this.name;
        
    }

    setDesc(newDesc) {
        this.desc = newDesc;
    }
    getDesc() {
        return this.desc;
    }

    setImgURL(newImgURL) {
        this.imgURL = newImgURL;
    }

    getImgURL() {
        return this.imgURL;
    }

    setObjPos(newObjPosX, newObjPosY) {
        this.objPos = [newObjPosX, newObjPosY];
    }

    setInteractable(newInteractable) {
        this.interactable = newInteractable;
    }
    getInteractable() {
        return this.interactable;
    }

    pickUp() {
        var currNumTimesToPickUp = this.numTimesToPickUp;
        this.numTimesToPickUp = currNumTimesToPickUp - 1;
    }

    setCanPickUp(newCanPickUp) {
        this.numTimesToPickUp = newCanPickUp;
    }
    getCanPickUp() {
        return this.numTimesToPickUp;
    }
}

export class CompObj {
    name;
    desc;
    subObjs;
    interactable;
    numTimesToPickUp;

    constructor() {
        this.name = "";
        this.desc = "";
        this.id = -1;
        this.subObjs = [];
        this.interactable = false;
        this.numTimesToPickUp = 0;

    }
    setName(newName) {
        this.name = newName;
        for (let i = 0; i < this.subObjs.length; i++) {
            if (this.subObjs[i].getName() !== newName) {
                this.subObjs[i].setName(newName);
            }
        }
    }
    getName() {
        return this.name;
        
    }

    setDesc(newDesc) {
        this.desc = newDesc;
        for (let i = 0; i < this.subObjs.length; i++) {
            if (this.subObjs[i].getDesc() !== newDesc) {
                this.subObjs[i].setDesc(newDesc);
            }
        }
    }
    getDesc() {
        return this.desc;
    }

    addObjToSub(imgURL, objPosX, objPosY) {
        var newObj = new Obj();
        newObj.setName(this.name);
        newObj.setDesc(this.desc);
        newObj.setInteractable(this.interactable);
        newObj.setCanPickUp(this.numTimesToPickUp);

        newObj.setImgURL(imgURL);
        newObj.setObjPos(objPosX, objPosY);
        
        this.subObjs.push(newObj);

    }

    getObjFromSub(index) {
        return this.subObjs[index];
    }

    setInteractable(newInteractable) {
        this.interactable = newInteractable;
        for (let i = 0; i < this.subObjs.length; i++) {
            if (this.subObjs[i].getInteractable() !== newInteractable) {
                this.subObjs[i].setInteractable(newInteractable);
            }
        }
    }
    getInteractable() {
        return this.interactable;
    }

    setCanPickUp(newCanPickUp) {
        this.numTimesToPickUp = newCanPickUp;
        for (let i = 0; i < this.subObjs.length; i++) {
            if (this.subObjs[i].getCanPickUp() !== newCanPickUp) {
                this.subObjs[i].setCanPickUp(newCanPickUp);
            }
        }
    }
    getCanPickUp() {
        return this.canPickUp;
    }

    // Add objects to array. Objects are used in objectArray in game.js
    // Eventually some sort of function that translates objects to map.
}