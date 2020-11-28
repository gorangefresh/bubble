import React from 'react';

function LowOpacity(props) {
    const {color, w} = props;
    return (
        <>
            <defs>
                <radialGradient
                    id={`opacity--low-${color}-${w ? w : ''}`}
                    fx="30%"
                    fy="30%"
                >
                    <stop offset="0%" stopColor="black" stopOpacity=".7"/>
                    <stop offset="40%" stopColor="white" stopOpacity=".5"/>
                    <stop offset="100%" stopColor="white" stopOpacity=".9"/>
                </radialGradient>

                <mask id={`mask--low-${color}-${w ? w : ''}`}>
                    <rect
                        fill={`url(#opacity--low-${color}-${w ? w : ''})`}
                        width="100%"
                        height="100%"
                    ></rect>
                </mask>
            </defs>

            <circle
                className={props.className}
                r="50%" cx="50%" cy="50%"
                // fill={color}
                mask={`url(#mask--low-${color}-${w ? w : ''})`}
            >
            </circle>
        </>
    );
}

export default LowOpacity;