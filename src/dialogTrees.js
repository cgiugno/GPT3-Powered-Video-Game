export class SpecNPC {
    constructor() {
        this.name = "";
        this.desc = "";
        this.currConv = 0;
        this.numTimesConversed = 0;
        this.conds = [];
        this.conversations = [];

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
    
    setCurrConv(newCurrConv) {
        this.currConv = newCurrConv;
    }
    getCurrConv() {
        return this.currConv;
    }

    getNumTimesConversed() {
        return this.numTimesConversed;
    }

    addNumTimesConversed() {
        const prevTimesConversed = this.numTimesConversed;
        this.numTimesConversed = prevTimesConversed +1;
    }

    resetNumTimesConversed() {
        this.numTimesConversed = 0;
    }

    setCondInd(index, toSet) {
        this.conds[index] = toSet;
    }
    setConds(toSet) {
        this.conds = toSet;
    }
    getCondInd(index) {
        return this.conds[index];
    }
    getConds() {
        return this.conds;
    }

    getConversations() {
        return this.conversations;
    }
    getConversationInd(index) {
        return this.conversations[index];
    }
    getCurrConversation() {
        return this.conversations[this.currConv];
    }
    addConversation(convToAdd) {
        this.conversations.push(convToAdd);
    }

}

export class Conv {
    constructor() {
        this.index = 0;
        this.finished = false;
        this.conds = [];
        this.turns = [];
        this.turnHistory = [];
    }

    setFinished(newFinished) {
        this.finished = newFinished;
    }

    getFinished() {
        return this.finished;
    }

    setIndex(toInd) {
        this.index = toInd;
    }
    getIndex() {
        return this.index;
    }

    setCondInd(index, toSet) {
        this.conds[index] = toSet;
    }
    setConds(toSet) {
        this.conds = toSet;
    }
    getCondInd(index) {
        return this.conds[index];
    }
    getConds() {
        return this.conds;
    }

    getCurrentTurnPrompt() {
        return this.turns[this.index].prompt;
    }

    getCurrentTurnChoices() {
        console.log("Index: " + this.index)
        return [this.turns[this.index].choices[0].choice, this.turns[this.index].choices[1].choice];
    }

    addTurn(newPrompt, choice1, choice1Ind, condsChoice1, setCondsChoice1, choice2, choice2Ind, condsChoice2, setCondsChoice2) {
        this.turns.push({
            prompt: newPrompt,
            choices: [{
                choice: choice1,
                ind: choice1Ind,
                conds: condsChoice1,
                setConds: setCondsChoice1,
            }, {
                choice: choice2,
                ind: choice2Ind,
                conds: condsChoice2,
                setConds: setCondsChoice2,
            }],
        })
    }

    addTurnToHistory(currInd, choiceInd) {
        this.turnHistory.push({
            index: currInd,
            choice: choiceInd,
        });
    }

    traverseConv(choiceNum) {
        const thisDialogTurn = this.index;
        const thisTurn = this.turns[thisDialogTurn];
        
        if (this.index < this.turns.length) {
            console.log("New Conversation Index is..." + thisTurn.choices[choiceNum].ind);
            this.index = thisTurn.choices[choiceNum].ind;
            this.addTurnToHistory(thisDialogTurn, choiceNum);
            if (thisTurn.choices[choiceNum].ind === -1) {
                this.setFinished(true);
            }
        }
        for (var i = 0; i < this.conds.length; i++) {
            if (thisTurn.choices[choiceNum].setConds[i] !== 0) {
                this.conds[i] = thisTurn.choices[choiceNum].setConds[i];
            }
        }
        
        
    }
}

export var spiderNPC = new SpecNPC();
spiderNPC.setName('Murmur');
spiderNPC.setDesc('Pretend you are a friendly tarantula named Murmur who lives in a small mountain town named \'Tailwind\', and likes to see newcomers.');
spiderNPC.setConds([false]);


var helloConv = new Conv();
helloConv.setIndex(0);
helloConv.addTurn("Say hello in a friendly, considerate way, and introduce yourself as Murmur the spider.", "Hello to you!", 1, [], [true],  "Where am I?", 2, [], [true]);
helloConv.addTurn("Paraphrase 'It's good to see a newcomer around these parts.'", "Thank you. Hope I'll like it here.", -1, [], [true], "", -1, [], [true]);
helloConv.addTurn("Paraphrase 'You're in a small mountain town named 'Tailwind'.'", "Thank you. Hope I'll like it here.", -1, [], [true], "", -1, [], [true]);

spiderNPC.addConversation(helloConv);

export var wizardNPC = new SpecNPC();
wizardNPC.setName('Naenaerius');
wizardNPC.setDesc('Pretend you are a grumpy yet mysterious old wizard named \'Naenaerius\' who lives in a small shack in a small mountain town named \'Tailwind\'. You don\'t like newcomers to the town.');
wizardNPC.setConds([false, false]);

export var wizHello = new Conv();
wizHello.setIndex(0);
wizHello.addTurn('Say that you don\'t like newcomers but introduce yourself as Naenaerius the wizard.', "Uh, hello.", 1, [], [true, false], "Don't want to be here either.", 2, [], [true, true]);
wizHello.addTurn('Paraphrase \'Mmph. You\'ll be fine here if you keep to yourself.\'', 'Alright, then...', -1, [], [true, false], "", -1, [], [true, false]);
wizHello.addTurn("Paraphrase 'That wasn't nice! I hope you leave town soon or I'll cast a spell on you!'", "Yikes! (Better go)", -1, [], [true, true], "", -1, [], [true, true]);

wizardNPC.addConversation(wizHello);


export var ghostNPC = new SpecNPC();
ghostNPC.setName('Spoopy');
ghostNPC.setDesc('Pretend you are a goofy, whimsical ghost that talks in an old-fashioned style. Your name is \'Spoopy\' and you haunt the house on the northwestern side of small mountain town \'Tailwind\'.');
ghostNPC.setConds([false]);

export var ghostHello = new Conv();
ghostHello.setIndex(0);
ghostHello.addTurn('Say hello in a whimsical fashion in the style of Lewis Carroll\'s Alice in Wonderland.', "Hello back!", 1, [], [true], "A ghost?!", 2, [], [true]);
ghostHello.addTurn('Paraphrase \'You are now in a town called \'Tailwind\'.\' in a whimsical fashion reminiscent of Lewis Carroll\'s Alice in Wonderland.', "Oh, sounds good.", -1, [], [true], "", -1, [], [true]);
ghostHello.addTurn('Paraphrase \'I am a ghost that haunts the house on the north side of town\'.\' in a whimsical fashion reminiscent of Lewis Carroll\'s Alice in Wonderland.', "Oh...Well, good to meet you then." -1, [], [true], "", -1, [], [true]);

ghostNPC.addConversation(ghostHello);