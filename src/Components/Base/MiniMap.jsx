import React from 'react';
import MapBubble from './Bubbles/MapBubble';

import './MiniMap.scss';
const baseColor = '#d4f4f0';
const currentColor = '#0c3e3e';
const width = 300;
const padding = 5;

function MiniMap(props) {
    const {matrix, current, length} = props;

    let bubbleWidth = (width - padding * 2) / length;

    let map = [];
    for (let i in matrix) {
        let color = i === current ? currentColor : baseColor;
        let empty = matrix[i].empty && i !== current;
        map.push(<MapBubble key={i} color={color} w={bubbleWidth} empty={empty}/>)
    }

    let styles = {width: `${width}px`, height: `${width}px`, padding: `${padding}px`};

    return (
        <div className={'mini-map'} style={styles}>
            {map}
        </div>
    );
}

export default MiniMap;