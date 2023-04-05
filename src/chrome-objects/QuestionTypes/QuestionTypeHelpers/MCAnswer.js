
class MCAnswer {
    constructor(answerRow) {
        this.answerRow = answerRow;
        this.text = this.findText();
    }

    getText() {
        return this.text;
    }

    findText() {
        const text = this.answerRow.getElementsByClassName('answer_label');
        return text[0].innerText;
    }

    makeInputSelected() {
        const input = this.answerRow.getElementsByClassName('question_input');
        input[0].checked = true;
        const event = new Event('change', { bubbles: true });
        input[0].dispatchEvent(event);
    }

    render() { }
}

export default MCAnswer;