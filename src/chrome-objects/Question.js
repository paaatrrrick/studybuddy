import { OPENAI_KEY, isTesting, model } from "../utils/constants";
import { Configuration, OpenAIApi } from "openai";

class Question {
    constructor(element, type, childCount, parent) {
        this.element = element;
        this.childCount = childCount;
        this.type = type
        this.Configuration = new Configuration({
            apiKey: OPENAI_KEY
        });
        this.openai = new OpenAIApi(this.Configuration);
        this.parent = parent;
    }

    getQuestionText() {
        const questionText = this.element.getElementsByClassName('question_text');
        return questionText[0].innerText;
    }

    getelement() {
        return this.element;
    }

    getType() {
        return this.type;
    }

    //system, user, assistant

    async gpt4(role, content, shouldCallGpt = true) {
        if (isTesting) return '1';
        if (shouldCallGpt) {
            try {
                const gptChat = this.parent.getGptChat();
                const completion = await this.openai.createChatCompletion({
                    model: model,
                    messages: [{ "role": role, "content": content }, ...gptChat],
                });
                var output = completion.data.choices[0].message.content;
                //trim whitespace
                output = output.trim();
                if (output) {
                    this.parent.pushToGptChat(role, content);
                    this.parent.pushToGptChat('assistant', output);
                }
                return output;
            } catch (e) {
                return false;
            }
        } else {
            this.parent.pushToGptChat(role, content);
        }
    }

}
export default Question;