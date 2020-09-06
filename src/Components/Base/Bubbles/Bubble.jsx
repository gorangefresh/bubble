import React from 'react';
import LowOpacity from '../Gradients/OpacityGradients/LowOpacity';
import Edge from '../Gradients/OpacityGradients/Edge';

function Bubble(props) {
    const {color, w, h, left, top} = props;

    let viewBox = `0 0 ${w} ${h ? h : w}`;

    return (
        <div className={`bubble-wrap ${props.class ? props.class : ''}`} style={{left: `${left}px`, top: `${top}px`}}>
            <svg viewBox={viewBox} style={{width: `${w}px`, height: `${h ? h : w}px`}}>
                <LowOpacity color={color} w={w}/>
                <Edge color={color} w={w}/>
            </svg>
        </div>
    );
}

export default Bubble;