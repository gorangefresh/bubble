import React from 'react';
import LowOpacity from '../Gradients/OpacityGradients/LowOpacity';
import Edge from '../Gradients/OpacityGradients/Edge';

function MainBubble(props) {
    const {w, h} = props;

    let viewBox = `0 0 ${w} ${h ? h : w}`;
    return (
        <div className={'bubble-wrap'}>
            <svg id={'main-bubble'} viewBox={viewBox} style={{width: `${w}px`, height: `${h ? h : w}px`}}>
                <LowOpacity color={'#234ecd'}/>
                <Edge color={'#234ecd'}/>
            </svg>
        </div>
    );
}

export default MainBubble;