import React, {useState, useEffect} from 'react';
import FirstTank from './Base/Tanks/FirstTank';
import Store from './Store';
import Playground from "./Playground";
import BulletsPlace from "./BulletsPlace";


function Screen() {
    Store.screen = React.createRef();
    const [position, setPosition] = useState('');

    const content = [];

    for (let i in Store.matrix) {
        let x = i.split('-');
        let y = x[1];
        x = x[0];
        content.push(<Playground key={i} x={x} y={y} obj={Store.matrix[i]}/>)
    }
    

    const changeLevel = () => {
        setPosition(Store.getId('screen', '1'));
    };

    useEffect(() => {
        Store.screenUpdate = changeLevel;
    }, []);

    return (
        <div id={'screen'} className={'screen'} ref={Store.screen} onClick={onclick}>
            <FirstTank/>
            {content}
            <BulletsPlace/>
        </div>
    );
}

export default Screen;