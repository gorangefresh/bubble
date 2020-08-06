import React from 'react';
import HighOpacity from '../Gradients/OpacityGradients/HighOpacity';
import './BaseBubble.scss';

function BaseBubble(props) {
    const {w, h} = props;
    let viewBox = `0 0 ${w} ${h ? h : w}`;


    return (
        <div className={'base-bubble-wrap'}>
            <svg viewBox={viewBox} style={{width: `${w}px`, height: `${h ? h : w}px`}}>
                <HighOpacity color={'#FFFFFF'}/>
            </svg>
        </div>
    );
}

export default BaseBubble;