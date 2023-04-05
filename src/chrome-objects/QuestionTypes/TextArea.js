import Question from '../Question.js';

class TextArea extends Question {
    constructor(element, type, childCount, parent) {
        super(element, type, childCount, parent);
        this.body = this.findBody();
        this.questionText = super.getQuestionText();
    }

    findBody() {
        const iframe = this.element.getElementsByClassName('tox-edit-area__iframe')[0];
        const theBody = iframe.contentWindow.document.body;
        return theBody;
    }

    writeToBody(text) {
        var paragraph = this.body.querySelectorAll('p');
        paragraph[0].textContent = text;
        const event = new Event('change', { bubbles: true });
        this.body.dispatchEvent(event);
    }

    render() {
        var returnVal = false;
        const prompt = `Answer the following question. Question ${this.childCount} (Free response): ${this.questionText}`
        super.gpt4("user", prompt).then((res) => {
            this.writeToBody(res);
            returnVal = true;
        });
        return returnVal;
    }
}

export default TextArea;