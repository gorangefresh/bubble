import React from 'react';

function LowOpacity(props) {
    const {color} = props;
    return (
        <>
            <defs>
                <radialGradient
                    id={`opacity--low-${color}`}
                    fx="30%"
                    fy="30%"
                >
                    <stop offset="0%" stopColor="black" stopOpacity=".7"/>
                    <stop offset="40%" stopColor="white" stopOpacity=".5"/>
                    <stop offset="100%" stopColor="white" stopOpacity=".9"/>
                </radialGradient>

                <mask id={`mask--low-${color}`}>
                    <rect
                        fill={`url(#opacity--low-${color})`}
                        width="100%"
                        height="100%"
                    ></rect>
                </mask>
            </defs>

            <circle r="50%" cx="50%" cy="50%"
                    fill={color}
                    mask={`url(#mask--low-${color})`}>
            </circle>
        </>
    );
}

export default LowOpacity;