import React, {useEffect} from 'react';
import BaseBubble from './Base/Bubbles/BaseBubble';
import FirstTank from './Base/Tanks/FirstTank';
import Store from './Store';
import BulletsPlace from "./BulletsPlace";


function Screen() {
    const playground = React.createRef();

    useEffect(() => {
        Store.playgound = playground.current;
    });

    return (
        <div id={'screen'} className={'screen'} ref={playground}>
            <FirstTank/>
        </div>
    );
}

export default Screen;