import React from 'react';
import LowOpacity from '../Gradients/OpacityGradients/LowOpacity';

function BulletBubble(props) {
    const {w, h, color} = props;
    let left = props.left ? props.left : 0;
    let top = props.top ? props.top : 0;

    return (
        <div className={`bubble-wrap ${props.className}`} style={{left: `${left}px`, top: `${top}px`}}>
            <svg style={{width: `${w}px`, height: `${h ? h : w}px`, fill: color}}>
                <LowOpacity color={color} w={w}/>
            </svg>
        </div>
    );
}

export default BulletBubble;