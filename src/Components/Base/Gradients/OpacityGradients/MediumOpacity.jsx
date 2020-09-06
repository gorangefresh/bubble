import React from 'react';

function MediumOpacity(props) {
    const {color, w} = props;
    return (
        <>
            <defs>
                <radialGradient
                    id={`opacity--medium-${color}-${w ? w : ''}`}
                    fx="25%"
                    fy="25%"
                >
                    <stop offset="0%" stopColor="black"/>
                    <stop offset="30%" stopColor="black" stopOpacity=".2"/>
                    <stop offset="97%" stopColor="white" stopOpacity=".4"/>
                    <stop offset="100%" stopColor="black"/>
                </radialGradient>

                <mask id={`mask--medium-${color}-${w ? w : ''}`}>
                    <rect
                        fill={`url(#opacity--medium-${color}-${w ? w : ''})`}
                        width="100%"
                        height="100%"
                    ></rect>
                </mask>
            </defs>

            <circle r="50%" cx="50%" cy="50%"
                    fill={color}
                    mask={`url(#mask--medium-${color}-${w ? w : ''})`}>
            </circle>
        </>
    );
}

export default MediumOpacity;