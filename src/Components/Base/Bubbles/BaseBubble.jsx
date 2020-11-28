import React from 'react';
import HighOpacity from '../Gradients/OpacityGradients/HighOpacity';

function BaseBubble(props) {
    const {w, h, color} = props;
    let viewBox = `0 0 ${w} ${h ? h : w}`;

    return (
        <div className={'base-bubble-wrap'}>
            <svg viewBox={viewBox} style={{width: `${w}px`, height: `${h ? h : w}px`, fill: color}}>
                <HighOpacity color={color} w={w}/>
            </svg>
        </div>
    );
}

export default BaseBubble;