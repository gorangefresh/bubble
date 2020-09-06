import React from 'react';

function Edge(props) {
    const {color, w} = props;
    return (
        <>
            <defs>
                <radialGradient
                    id={`gradient--edge-${color}-${w ? w : ''}`}
                    fx="30%"
                    fy="30%"
                >
                    <stop offset="0%" stopColor="black"/>
                    <stop offset="90%" stopColor="black" stopOpacity=".6"/>
                    <stop offset="100%" stopColor="white" stopOpacity=".9"/>
                </radialGradient>

                <mask id={`mask--edge-${color}-${w ? w : ''}`}>
                    <rect
                        fill={`url(#gradient--edge-${color}-${w ? w : ''})`}
                        width="100%"
                        height="100%"
                    ></rect>
                </mask>
            </defs>

            <circle r="50%" cx="50%" cy="50%"
                    fill={color}
                    mask={`url(#mask--edge-${color}-${w ? w : ''})`}>
            </circle>
        </>
    );
}

export default Edge;