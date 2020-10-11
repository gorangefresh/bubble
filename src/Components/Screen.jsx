import React, {useState, useEffect} from 'react';
import Tank from './Base/Tanks/Tank';
import Store from './Store';
import Playground from "./Playground";
import SelectionMenu from "./Base/SelectionMenu";
import ExperienceBar from "./Base/ExperienceBar";
import MiniMap from "./Base/MiniMap";
import Light1 from "./Base/Tanks/Light1";
import Light2 from "./Base/Tanks/Light2";
import Light3 from "./Base/Tanks/Light3";
import Balanced1 from "./Base/Tanks/Balanced1";
import Balanced2 from "./Base/Tanks/Balanced2";
import Balanced3 from "./Base/Tanks/Balanced3";
import Heavy1 from "./Base/Tanks/Heavy1";
import Heavy2 from "./Base/Tanks/Heavy2";
import Heavy3 from "./Base/Tanks/Heavy3";
import Destroyer from "./Base/Tanks/Destroyer";

const Tanks = {
    0: {light: <Tank/>, heavy: <Tank/>, balanced: <Tank/>},
    1: {light: <Light1/>, heavy: <Heavy1/>, balanced: <Balanced1/>},
    2: {light: <Light2/>, heavy: <Heavy2/>, balanced: <Balanced2/>},
    3: {light: <Light3/>, heavy: <Heavy3/>, balanced: <Balanced3/>},
    4: {light: <Destroyer/>, heavy: <Destroyer/>, balanced: <Destroyer/>},
};

function Screen() {
    const [position, setPosition] = useState('');
    const [lvl, setLvl] = useState(0);
    const [select, setSelect] = useState(false);

    const content = [];

    for (let i in Store.matrix) {
        let x = i.split('-');
        let y = x[1];
        x = x[0];

        content.push(<Playground key={i} x={x} y={y} obj={Store.matrix[i]}/>)
    }

    useEffect(() => {
        Store.upgrade = setLvl;

        Store.select = setSelect;

        Store.screenUpdate = setPosition;
    }, []);

    let selectionMenu = select ? <SelectionMenu/> : null;

    return (
        <div id={'screen'} className={'screen'} onClick={onclick}>
            {selectionMenu}
            {Tanks[lvl][Store.tankClass]}
            {content}
            <ExperienceBar/>
            <MiniMap matrix={Store.matrix} current={`${Store.x}-${Store.y}`} length={Store.matrixLength + 1}/>
        </div>
    );
}

export default Screen;