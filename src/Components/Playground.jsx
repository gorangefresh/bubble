import React, {useEffect, useState} from 'react';
import BaseBubble from './Base/Bubbles/BaseBubble';
import FirstTank from './Base/Tanks/FirstTank';
import Store from './Store';
import BulletsPlace from "./BulletsPlace";


function Playground() {
    const playground = React.createRef();

    useEffect(() => {
        Store.playgound = playground.current;
    });

    return (
        <div id={'playground'} className={'playground'} ref={playground}>
            <BaseBubble w={Store.baseD} left={50}/>
            <FirstTank/>
            <BulletsPlace/>
        </div>
    );
}

export default Playground;