const OPENAI_KEY = 'YOUR_OPENAI_KEY';
const model = 'gpt-4'
// const model = 'gpt-3.5-turbo'


const constants = {
    BEGIN_MESSAGE: 'canvas-go',
    PARENT_ID: 'questions',
    QUESTION_CONTAINER_CLASS: 'question_holder',
    CLASS_NAME_THAT_IDENTIFIES_QUESTION_TYPE: 'question',
    TEXT_ONLY: 'text_only_question',
    MULTIPLE_CHOICE: 'multiple_choice_question',
    TEXTAREA_QUESTION: 'essay_question',
}
const isTesting = false;

export { constants, OPENAI_KEY, model, isTesting }