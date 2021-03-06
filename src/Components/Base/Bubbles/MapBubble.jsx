import React from 'react';
import LowOpacity from '../Gradients/OpacityGradients/LowOpacity';
import MediumOpacity from '../Gradients/OpacityGradients/MediumOpacity';
import Edge from '../Gradients/OpacityGradients/Edge';

function MapBubble(props) {
    const {color, w, empty} = props;

    let bubbleWidth = w *.8;
    let viewBox = `0 0 ${bubbleWidth} ${bubbleWidth}`;
    let gradient = empty ? <MediumOpacity color={color} w={bubbleWidth}/> : <LowOpacity color={color}/>;

    return (
        <div className={'map-bubble'} style={{width: `${w}px`, height: `${w}px`}}>
            <svg viewBox={viewBox} style={{width: `${bubbleWidth}px`, height: `${bubbleWidth}px`, fill: color}}>
                {gradient}
                <Edge color={color} w={w}/>
            </svg>
        </div>
    );
}

export default MapBubble;