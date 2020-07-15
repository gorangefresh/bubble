import React from 'react';
import LowOpacity from '../Gradients/OpacityGradients/LowOpacity';
import Edge from '../Gradients/OpacityGradients/Edge';

function GunBubble(props) {
    const {w, h, left, top} = props;
    let viewBox = `0 0 ${w} ${h ? h : w}`;

    console.log(a.length);
    return (
        <div className={'bubble-wrap'} style={{left: `${left}px`, top: `${top}px`}}>

            <svg viewBox={viewBox}
                 style={{width: `${w}px`, height: `${h ? h : w}px`}}>
                <Edge color={'#cba815'}/>
                <LowOpacity color={'#cba815'}/>
            </svg>

        </div>
    );
}

export default GunBubble;