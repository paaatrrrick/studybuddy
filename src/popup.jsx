import { useEffect, useState } from 'react';
import React from 'react';
import { render } from 'react-dom';
import { constants } from './utils/constants';
import './styles/popup.css';

function Popup() {
    const [isLoading, setIsLoading] = useState(false);
    const buttonClick = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, { message: constants.BEGIN_MESSAGE }, (response) => { });
        // do something with response here, not outside the function
    };
    return (
        <div className='popup'>
            <h1>Canvas Quiz Solver</h1>
            {!isLoading ? <button onClick={buttonClick} className='button'>Run</button> :
                <div className="loader-div">
                    <span className="loader"></span>
                </div>
            }
        </div>
    );
}




render(<Popup />, document.getElementById("react-target"));