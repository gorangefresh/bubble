import React from 'react';

function HighOpacity(props) {
    const {color, w} = props;
    return (
        <>
            <defs>
                <radialGradient
                    id={`opacity--high-${color}-${w ? w : ''}`}
                    fy="10%">
                    <stop offset="60%"
                          stopColor="black"
                          stopOpacity="0"/>
                    <stop offset="100%"
                          stopColor="white"
                          stopOpacity=".25"/>
                    <stop offset="100%"
                          stopColor="black"/>
                </radialGradient>


                <mask id={`mask--high-${color}-${w ? w : ''}`}>
                    <rect
                        fill={`url(#opacity--high-${color}-${w ? w : ''})`}
                          width="100%" height="100%"></rect>
                </mask>

            </defs>

            <circle
                r="50%" cx="50%" cy="50%"
                mask={`url(#mask--high-${color}-${w ? w : ''})`}
            >
            </circle>

        </>
    );
}

export default HighOpacity;