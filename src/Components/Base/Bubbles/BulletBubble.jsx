import React from 'react';
import LowOpacity from '../Gradients/OpacityGradients/LowOpacity';

function BulletBubble(props) {
    const {w, h, color} = props;
    let left = props.left ? props.left : 0;
    let top = props.top ? props.top : 0;
    // let viewBox = `0 0 ${w} ${h ? h : w}`;

    return (
        <div className={'bubble-wrap'} style={{left: `${left}px`, top: `${top}px`}}>
            <svg style={{width: `${w}px`, height: `${h ? h : w}px`}}>
                <LowOpacity color={color} w={w}/>
            </svg>
        </div>
    );
}

export default BulletBubble;