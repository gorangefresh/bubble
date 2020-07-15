import React from 'react';
import LowOpacity from '../Gradients/OpacityGradients/LowOpacity';
import Edge from '../Gradients/OpacityGradients/Edge';

function BulletBubble(props) {
    const {w, h} = props;
    let viewBox = `0 0 ${w} ${h ? h : w}`;

    return (
        <div className={'bubble-wrap'}>
            <svg viewBox={viewBox} style={{width: `${w}px`, height: `${h ? h : w}px`}}>
                <Edge color={'#530900'}/>
                <LowOpacity color={'#530900'}/>
            </svg>
        </div>
    );
}

export default BulletBubble;