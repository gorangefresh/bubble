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

    const getPosition = (x, y) => {
        if (x === Store.x && y === Store.y) {
            this.top = '50%';
            this.left = '50%';
            return this.position = 'center';
        } else {
            if (x === Store.x) {
                this.top = '50%';
                if (
                    y === Store.y - 1 ||
                    (Store.y === 0 && y === Store.matrixLength)
                ) {
                    this.left = '-150%';
                    return this.position = 'left';
                }
                if (
                    y === Store.y + 1 ||
                    (y === 0 && Store.y === Store.matrixLength)
                ) {
                    this.left = '150%';
                    return this.position = 'right';
                }
            }
            if (y === Store.y) {
                this.left = '50%';
                if (
                    x === Store.x - 1 ||
                    (Store.x === 0 && x === Store.matrixLength)
                ) {
                    this.top = '-150%';
                    return this.position = 'top';
                }
                if (
                    x === Store.x + 1 ||
                    (x === 0 && Store.x === Store.matrixLength)
                ) {
                    this.top = '150%';
                    return this.position = 'bottom';
                }
            }
        }
        this.position = false;
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