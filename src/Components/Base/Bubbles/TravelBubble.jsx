import React from 'react';
import HighOpacity from "../Gradients/OpacityGradients/HighOpacity";

function TravelBubble(props) {
    const {w, h} = props;

    let viewBox = `0 0 ${w} ${h ? h : w}`;
    if (props.travel) {
        return (
            <div className={'bubble-wrap'} style={{zIndex: 1}}>
                <svg id={'travel'} viewBox={viewBox} style={{width: `${w}px`, height: `${h ? h : w}px`}}>
                    <HighOpacity color={'#fafafa'} />
                </svg>
            </div>
        );
    } else {
        return null;
    }

}

export default TravelBubble;