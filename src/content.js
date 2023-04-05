import { constants } from "./utils/constants.js";
import Screen from './chrome-objects/Screen'
var hasBeenClick = false

const eventListenerHandler = async (request, sendResponse) => {
    if (request.message = constants.BEGIN_MESSAGE && !hasBeenClick) {
        // hasBeenClick = true;
        const newScreen = new Screen(constants.PARENT_ID, constants.QUESTION_CONTAINER_CLASS, sendResponse);
        const response = newScreen.run();
        sendResponse(response);

    }
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        eventListenerHandler(request, sendResponse);
    });

