import { Obj, CompObj } from "./interactableObj";
import { objHouseArray, objOutsideArray } from './objImgImports';

export var beeHive = new Obj();
beeHive.setName("Beehive");
beeHive.setDesc("Describe a large beehive that is full of honey in the style of Lewis Carroll's Alice In Wonderland using two or less sentences.");
beeHive.setImgURL(objOutsideArray[20 - 1]);
beeHive.setObjPos(9, 8);
beeHive.setInteractable(true);
beeHive.setCanPickUp(1);

export var tallGreenTree = new CompObj();
tallGreenTree.setName("Tall Green Tree");
tallGreenTree.setDesc("Describe a tall green tree that smells like pine in the style of Lewis Carroll's Alice In Wonderland using two or less sentences.");
tallGreenTree.setInteractable(true);
tallGreenTree.setCanPickUp(0);

tallGreenTree.addObjToSub(objOutsideArray[14 - 1], 8, 7);
tallGreenTree.addObjToSub(objOutsideArray[15 - 1], 8, 8);

export var smallyellowtree = new Obj();
smallyellowtree.setName("Small Yellow Tree");
smallyellowtree.setDesc("Describe a small tree with shining golden leaves in the style of Lewis Carroll's Alice In Wonderland using two or less sentences.");
smallyellowtree.setImgURL(objOutsideArray[19 - 1]);
smallyellowtree.setObjPos(3, 0);
smallyellowtree.setInteractable(true);
smallyellowtree.setCanPickUp(0);

export var house = new CompObj();
house.setName("Small Haunted House");
house.setDesc("Describe a squat cottage with a short stone chimney spitting out smoke in the style of Lewis Carroll's Alice in Wonderland using two or less sentences.");
house.setInteractable(true);
house.setCanPickUp(0);

house.addObjToSub(objOutsideArray[7 - 1], 1, 2); // 0
house.addObjToSub(objOutsideArray[8 - 1], 2, 2); // 1
house.addObjToSub(objOutsideArray[10 - 1], 3, 2); // 2
house.addObjToSub(objOutsideArray[9 - 1], 4, 2); // 3

house.addObjToSub(objOutsideArray[4 - 1], 1, 3); // 4
house.addObjToSub(objOutsideArray[5 - 1], 2, 3); // 5
house.addObjToSub(objOutsideArray[6 - 1], 4, 3);// 6

house.addObjToSub(objOutsideArray[1 - 1], 1, 4); // 7
house.addObjToSub(objOutsideArray[2 - 1], 2, 4); // 8
house.addObjToSub(objOutsideArray[12 - 1], 3, 4); // 9
house.addObjToSub(objOutsideArray[3 - 1], 4, 4); // 10

export var mushroom = new Obj();
mushroom.setName("Mushroom");
mushroom.setDesc("Describe a small red white-polka-dotted mushroom in whimsical language, using two or less sentences.");
mushroom.setImgURL(objOutsideArray[21 - 1]);
mushroom.setInteractable(true);
mushroom.setCanPickUp(2);

export var key = new Obj();
key.setName("Enigmatic Key");
key.setDesc("Describe a small rusted gray key in ominous language, using two or less sentences.");
key.setImgURL(objOutsideArray[22 - 1]);
key.setInteractable(true);
key.setCanPickUp(1);

export const objs = [
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
    mushroom, // 21                             // 20
    key, // 22                                  // 21
]

export var gargoyleBasin = new Obj();
gargoyleBasin.setName("Gargoyle Basin.");
gargoyleBasin.setDesc("Describe water flowing out of a gargoyle's mouth into a basin in ominous language, in two sentences or less.");
gargoyleBasin.setImgURL(objHouseArray[26 - 1]);
gargoyleBasin.setInteractable(true);
gargoyleBasin.setCanPickUp(0);

export var squigglyStaff = new Obj();
squigglyStaff.setName("Twisting Staff");
squigglyStaff.setDesc("Describe a twisty, knotted staff topped with a gemstone in the style of Stephen King in two sentences or less.");
squigglyStaff.setImgURL(objHouseArray[8 - 1]);
squigglyStaff.setInteractable(true);
squigglyStaff.setCanPickUp(0);

export var bookcase = new Obj();
bookcase.setName("Bookcase");
bookcase.setDesc("Describe a tall bookcase crammed with knicknacks and spellbooks in the style of Stephen King in two sentences or less.");
bookcase.setImgURL(objHouseArray[3 - 1]);
bookcase.setInteractable(true);
bookcase.setCanPickUp(0);

export var cauldron = new Obj();
cauldron.setName("Cauldron");
cauldron.setDesc("Describe a squat witch's cauldron churning with an unidentifiable liquid in ominous language in two sentences or less.");
cauldron.setImgURL(objHouseArray[9 - 1]);
cauldron.setInteractable(true);
cauldron.setCanPickUp(0);

export var purplePotion = new Obj();
purplePotion.setDesc("Describe a vivid violet liquid sloshing about in a narrow bottle in two sentences or less.");
purplePotion.setImgURL(objHouseArray[4 - 1]);
purplePotion.setInteractable(true);
purplePotion.setCanPickUp(0);

export var greenPotion = new Obj();
greenPotion.setDesc("Describe a glimmering green liquid inside of a clear glass bottle in two sentences or less.");
greenPotion.setImgURL(objHouseArray[5 - 1]);
greenPotion.setInteractable(true);
greenPotion.setCanPickUp(0);

export var redPotion = new Obj();
redPotion.setDesc("Describe a rich red-amber liquid inside the narrow glass of a bottle in two sentences or less.");
redPotion.setImgURL(objHouseArray[6 - 1]);
redPotion.setInteractable(true);
redPotion.setCanPickUp(0);

export var bluePotion = new Obj();
bluePotion.setDesc("Describe a deep, clear blue liquid still inside of a bottle in two sentences or less.");
bluePotion.setImgURL(objHouseArray[7 - 1]);
bluePotion.setInteractable(true);
bluePotion.setCanPickUp(0);

export var internalHouse = new CompObj();
internalHouse.setName("Inside of House.");
internalHouse.setDesc("Describe the inside of a squat, cobwebbed house with stone walls in ominous language in two setnences or less.")
internalHouse.setInteractable(true);
internalHouse.setCanPickUp(0);

internalHouse.addObjToSub(objHouseArray[10 - 1], 0, 0); // 0
internalHouse.addObjToSub(objHouseArray[11 - 1], 0, 1); // 1
internalHouse.addObjToSub(objHouseArray[12 - 1], 0, 6); // 2
internalHouse.addObjToSub(objHouseArray[21 - 1], 1, 0); // 3
internalHouse.addObjToSub(objHouseArray[19 - 1], 1, 1); // 4
internalHouse.addObjToSub(objHouseArray[14 - 1], 1, 3); // 5
internalHouse.addObjToSub(objHouseArray[16 - 1], 1, 4); // 6
internalHouse.addObjToSub(objHouseArray[20 - 1], 1, 5); // 7
internalHouse.addObjToSub(objHouseArray[22 - 1], 1, 6); // 8
internalHouse.addObjToSub(objHouseArray[23 - 1], 6, 0); // 9
internalHouse.addObjToSub(objHouseArray[24 - 1], 6, 1); // 10
internalHouse.addObjToSub(objHouseArray[25 - 1], 6, 6); // 11

export const objsHouse = [
    null, // Table
    null, // Chair
    bookcase,
    purplePotion,
    greenPotion,
    redPotion,
    bluePotion,
    squigglyStaff,
    cauldron,
    internalHouse.getObjFromSub(0), // WallTopLeftCorner
    internalHouse.getObjFromSub(1), // WallTop
    internalHouse.getObjFromSub(2), // WallTopRight
    null, // WallLowerTopLeft
    internalHouse.getObjFromSub(5), // Wall LowerTop
    null,
    internalHouse.getObjFromSub(6), // WallLowerTopClosedDoor
    null, // WallLowerTopAjarDoor
    null, // WallLowerTopOpenDoor
    internalHouse.getObjFromSub(4), // WallLowerTopGargoyleHead
    internalHouse.getObjFromSub(7), // WallLowerTopTapestry
    internalHouse.getObjFromSub(3), // WallLeft
    internalHouse.getObjFromSub(8), // WallRight
    internalHouse.getObjFromSub(9), // WallBottomLeft
    internalHouse.getObjFromSub(10), // WallBottom
    internalHouse.getObjFromSub(11), // WallBottomRight
    gargoyleBasin,
];