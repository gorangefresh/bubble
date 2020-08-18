import React, {useState} from 'react';
import FirstTank from './Base/Tanks/FirstTank';
import Store from './Store';
import Playground from "./Playground";
import ExperienceBar from "./Base/ExperienceBar";
import MiniMap from "./Base/MiniMap";


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

    Store.screenUpdate = () => {
        setPosition(Math.random());
    };

    return (
        <div id={'screen'} className={'screen'} ref={Store.screen} onClick={onclick}>
            <FirstTank/>
            {content}
            <ExperienceBar/>
            <MiniMap matrix={Store.matrix} current={`${Store.x}-${Store.y}`} length={Store.matrixLength+1}/>
        </div>
    );
}

export default Screen;