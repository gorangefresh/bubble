import React, {useEffect, useState} from 'react';
import Bubble from './Bubbles/Bubble';

import './MiniMap.scss';
const baseColor = '#FFFFFF';
const currentColor = '#3247CB';
const width = 300;
const padding = 5;

function MiniMap(props) {
    const {matrix, current, length} = props;

    let bubbleWidth = (width - padding * 2) / length;

    let map = [];
    for (let i in matrix) {
        let color = i === current ? currentColor : baseColor;
        map.push(<Bubble key={i} color={color} w={bubbleWidth}/>)
    }

    let styles = {width: `${width}px`, height: `${width}px`, padding: `${padding}px`};

    return (
        <div className={'mini-map'} style={styles}>
            {map}
        </div>
    );
}

export default MiniMap;