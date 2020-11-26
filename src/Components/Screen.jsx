import React, {useState, useEffect} from 'react';
import Tank from './Base/Tanks/Tank';
import Store from './Store';
import Playground from "./Playground";
import SelectionMenu from "./Base/SelectionMenu";
import ExperienceBar from "./Base/ExperienceBar";
import MiniMap from "./Base/MiniMap";

function Screen() {
    const [position, setPosition] = useState('');
    const [select, setSelect] = useState(false);

    const content = [];

    for (let i in Store.matrix) {
        let x = i.split('-');
        let y = x[1];
        x = x[0];

        content.push(<Playground key={i} x={x} y={y} obj={Store.matrix[i]}/>)
    }

    useEffect(() => {
        Store.select = setSelect;

        Store.screenUpdate = setPosition;
    }, []);

    let selectionMenu = select ? <SelectionMenu/> : null;

    return (
        <div id={'screen'} className={'screen'} onClick={onclick}>
            {selectionMenu}
            <Tank/>
            {content}
            <ExperienceBar/>
            <MiniMap matrix={Store.matrix} current={`${Store.x}-${Store.y}`} length={Store.matrixLength + 1}/>
        </div>
    );
}

export default Screen;