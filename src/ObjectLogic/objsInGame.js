import { Obj, CompObj } from "./interactableObj";

export var beeHive = new Obj();
beeHive.setName("Beehive");
beeHive.setDesc("Describe a large beehive that is full of honey in the style of Lewis Carroll's Alice In Wonderland using two or less sentences.");
beeHive.setImgURL(20);
beeHive.setObjPos(9, 8);
beeHive.setInteractable(true);
beeHive.setCanPickUp(1);

export var tallGreenTree = new CompObj();
tallGreenTree.setName("Tall Green Tree");
tallGreenTree.setDesc("Describe a tall green tree that smells like pine in the style of Lewis Carroll's Alice In Wonderland using two or less sentences.");
tallGreenTree.setInteractable(true);
tallGreenTree.setCanPickUp(0);

tallGreenTree.addObjToSub(14, 8, 7);
tallGreenTree.addObjToSub(15, 8, 8);

export var smallyellowtree = new Obj();
smallyellowtree.setName("Small Yellow Tree");
smallyellowtree.setDesc("Describe a small tree with shining golden leaves in the style of Lewis Carroll's Alice In Wonderland using two or less sentences.");
smallyellowtree.setImgURL(19);
smallyellowtree.setObjPos(3, 0);
smallyellowtree.setInteractable(true);
smallyellowtree.setCanPickUp(0);

export var house = new CompObj();
house.setName("Small Haunted House");
house.setDesc("Describe a squat cottage with a short stone chimney spitting out smoke in the style of Lewis Carroll's Alice in Wonderland using two or less sentences.");
house.setInteractable(true);
house.setCanPickUp(0);

house.addObjToSub(7, 1, 2); // 0
house.addObjToSub(8, 2, 2); // 1
house.addObjToSub(10, 3, 2); // 2
house.addObjToSub(9, 4, 2); // 3

house.addObjToSub(4, 1, 3); // 4
house.addObjToSub(5, 2, 3); // 5
house.addObjToSub(6, 4, 3);// 6

house.addObjToSub(1, 1, 4); // 7
house.addObjToSub(2, 2, 4); // 8
house.addObjToSub(12, 3, 4); // 9
house.addObjToSub(3, 4, 4); // 10

