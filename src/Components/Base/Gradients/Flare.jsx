import React from 'react';

function Flare(props) {

    let radius = props.D / 2;

    const rotate = `rotate(-45, ${radius}, ${radius})`;

    return (
        <>
            <defs>
                <radialGradient id="gradient--flare" fy="20%">
                    <stop offset="10%"
                          stopColor="white"
                          stopOpacity=".7"/>
                    <stop offset="90%"
                          stopColor="white"
                          stopOpacity="0"/>
                </radialGradient>
            </defs>

            <ellipse rx="15%" ry="7%" cx="50%" cy="15%"
                     fill="url(#gradient--flare)"
                     transform={rotate}
            >
            </ellipse>
        </>
    );
}

export default Flare;