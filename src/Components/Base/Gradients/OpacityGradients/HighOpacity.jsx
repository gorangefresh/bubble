import React from 'react';

function HighOpacity(props) {
    const {color} = props;
    return (
        <>
            <defs>
                <radialGradient
                    id={`opacity--high-${color}`}
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


                <mask id={`mask--high-${color}`}>
                    <rect
                        fill={`url(#opacity--high-${color})`}
                          width="100%" height="100%"></rect>
                </mask>

            </defs>

            <circle r="50%" cx="50%" cy="50%"
                    fill={color}
                    mask={`url(#mask--high-${color})`}>
            </circle>

        </>
    );
}

export default HighOpacity;