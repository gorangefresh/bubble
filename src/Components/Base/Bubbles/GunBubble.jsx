import React from 'react';
import LowOpacity from '../Gradients/OpacityGradients/LowOpacity';
import Edge from '../Gradients/OpacityGradients/Edge';
import cst from "../../../const";

function GunBubble(props) {
    const {w, h, left, top, color} = props;
    let viewBox = `0 0 ${w} ${h ? h : w}`;

    return (
        <div className={'bubble-wrap'} style={{left: `${left}px`, top: `${top}px`}}>
            <svg viewBox={viewBox} style={{width: `${w}px`, height: `${h ? h : w}px`, fill: color}}>
                <Edge color={color}/>
                <LowOpacity color={color} w={w}/>
            </svg>
        </div>
    );
}

export default GunBubble;