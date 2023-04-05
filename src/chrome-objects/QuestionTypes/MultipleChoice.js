import Question from '../Question.js';
import MCAnswer from './QuestionTypeHelpers/MCAnswer.js';

class MultipleChoice extends Question {
    constructor(element, type, childCount, parent) {
        super(element, type, childCount, parent);
        this.inputs = this.getRows();
        this.questionText = super.getQuestionText();
    }

    getRows() {
        const rows = this.element.getElementsByClassName('answer_row');
        const inputs = [];
        for (let row of rows) {
            const mc = new MCAnswer(row);
            inputs.push(mc);
        }
        return inputs;
    }

    getInputsText() {
        const resArr = [];
        for (let input of this.inputs) {
            const inputText = input.getText();
            resArr.push(inputText);
        }
        return resArr;
    }

    formatNumberedListHelper(arr) {
        let output = '';
        arr.forEach((item, index) => {
            output += `${index + 1}: ${item}\n`;
        });
        return output.trim();
    }

    render() {
        const inputsText = this.getInputsText();
        var returnVal = false;
        const prompt = `This is question ${this.childCount}. Correct answer will only be counted if just a number is returned corresponding to answer by only returning a number. What is the answer to the following multiple choice question. \nPROMPT: ${this.questionText}\nANSWER CHOICES:\n${this.formatNumberedListHelper(inputsText)}`
        super.gpt4("user", prompt).then((res) => {
            if (res && res.length < 3) {
                const newRes = res.replace(/[^0-9]/g, '');
                if (newRes.length >= 1) {
                    const answer = parseInt(newRes);
                    if (answer <= this.inputs.length) {
                        this.inputs[answer - 1].makeInputSelected();
                        returnVal = true;
                    }
                }
            }
        });
        return returnVal;
    }

}

export default MultipleChoice;