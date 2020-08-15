import React from 'react';
import LowOpacity from '../Gradients/OpacityGradients/LowOpacity';
import Edge from '../Gradients/OpacityGradients/Edge';

function Bubble(props) {
    const {color, w} = props;

    let bubbleWidth = w *.8;
    let viewBox = `0 0 ${bubbleWidth} ${bubbleWidth}`;
    return (
        <div className={'map-bubble'} style={{width: `${w}px`, height: `${w}px`}}>
            <svg viewBox={viewBox} style={{width: `${bubbleWidth}px`, height: `${bubbleWidth}px`}}>
                <LowOpacity color={color}/>
                <Edge color={color}/>
            </svg>
        </div>
    );
}

export default Bubble;