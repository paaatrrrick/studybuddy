import { constants } from "../utils/constants";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import TextOnly from "./QuestionTypes/TextOnly";
import Textarea from "./QuestionTypes/Textarea";

class Screen {
    constructor(parentID, childrenClass, sendResponse) {
        this.loading = true;
        this.childCount = 0;
        this.parentID = parentID
        this.childrenClass = childrenClass;
        this.parent = this.findParent(parentID);
        this.children = this.findParentsChildren(childrenClass);
        this.sendResponse = sendResponse;
        this.gptChat = [
            { "role": "system", "content": "You are the worlds smartest assistant who solve all questions. You do not say anything else other than the answer. Have no whitespace." },
        ]
    }

    pushToGptChat(role, content) {
        this.gptChat.push({ "role": role, "content": content });
    }
    getGptChat() {
        return this.gptChat;
    }

    findParent(parentID) {
        const parent = document.getElementById(parentID);
        return parent;
    }

    findChildType(child) {
        try {
            const childTypeDiv = child.getElementsByClassName(constants.CLASS_NAME_THAT_IDENTIFIES_QUESTION_TYPE);
            const firstChild = childTypeDiv[0];
            //turn this into an array and get every element that has the class 'question' or just get one TODO
            const childTypeDivClasses = firstChild.getAttribute('class');
            const childType = childTypeDivClasses.split(' ');
            this.childCount += 1;
            if (childType.includes(constants.TEXT_ONLY)) {
                this.childCount -= 1;
                return new TextOnly(firstChild, constants.TEXT_ONLY, this.childCount, this);
            } else if (childType.includes(constants.MULTIPLE_CHOICE)) {
                return new MultipleChoice(firstChild, constants.MULTIPLE_CHOICE, this.childCount, this);
            } else if (childType.includes(constants.TEXTAREA_QUESTION)) {
                return new Textarea(firstChild, constants.TEXTAREA_QUESTION, this.childCount, this);
            }
            return false;
        } catch (e) {
            console.log(e);
            return false
        }
    }

    findParentsChildren(childrenClass) {
        const children = this.parent.getElementsByClassName(childrenClass);
        const resArr = [];
        for (let child of children) {
            const childObject = this.findChildType(child)
            if (childObject) {
                resArr.push(childObject);
            }
        }
        return resArr;
    }

    run() {
        const resArr = [];
        for (let child of this.children) {
            const res = child.render();
            resArr.push(res);
        }
        return resArr;
    }
}

export default Screen;