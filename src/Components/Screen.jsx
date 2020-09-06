import React, {useState} from 'react';
import Tank from './Base/Tanks/Tank';
import Store from './Store';
import Playground from "./Playground";
import ExperienceBar from "./Base/ExperienceBar";
import MiniMap from "./Base/MiniMap";
import Light1 from "./Base/Tanks/Light1";
import Balanced1 from "./Base/Tanks/Balanced1";
import Heavy1 from "./Base/Tanks/Heavy1";
import Light2 from "./Base/Tanks/Light2";
import Balanced2 from "./Base/Tanks/Balanced2";
import Heavy2 from "./Base/Tanks/Heavy2";

const Tanks  = {
    0: <Tank/>,
    1: {light: <Light1/>, heavy: <Heavy1/>, balanced: <Balanced1/>},
    2: {light: <Light2/>, heavy: <Heavy2/>, balanced: <Balanced2/>},
    // 3: {light: <Light2/>, heavy: <Heavy2/>, balanced: <Balanced2/>},
    // 4: {light: <Light2/>, heavy: <Heavy2/>, balanced: <Balanced2/>},
};

function Screen() {
    const [position, setPosition] = useState('');

    const content = [];

    for (let i in Store.matrix) {
        let x = i.split('-');
        let y = x[1];
        x = x[0];

        content.push(<Playground key={i} x={x} y={y} obj={Store.matrix[i]}/>)
    }

    Store.screenUpdate = str => {
        setPosition(str);
    };

    return (
        <div id={'screen'} className={'screen'} onClick={onclick}>
            {Tanks[2].balanced}
            {content}
            <ExperienceBar/>
            <MiniMap matrix={Store.matrix} current={`${Store.x}-${Store.y}`} length={Store.matrixLength+1}/>
        </div>
    );
}

export default Screen;