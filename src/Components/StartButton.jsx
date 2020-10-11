import React from 'react';

function StartButton(props) {

    return (
        <div className={'start-button'} onClick={props.onclick}>Start</div>
    );
}

export default StartButton;