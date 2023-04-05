import Question from '../Question.js';

class TextOnly extends Question {
    constructor(element, type, childCount, parent) {
        super(element, type, childCount, parent);
        const question_text_div = element.getElementsByClassName('question_text');
        this.text = question_text_div[0].innerText;
    }

    getType() {
        return this.type;
    }

    getText() {
        return this.text;
    }

    render() {
        const prompt = `For the following questions this information could potentially be relevant: ${this.getText()}`
        super.gpt4('system', prompt, false);
    }
}

export default TextOnly;