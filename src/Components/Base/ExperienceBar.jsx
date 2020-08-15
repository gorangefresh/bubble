import React, {useEffect, useState} from 'react';
import Store from '../Store';

import './ExperienceBar.scss';

function ExperienceBar() {
    const [exp, setExp] = useState(0);

    useEffect(() => {
        Store.setExp = setExp;
    });


    return (
        <div className={'experience-bar'}>
            <div className={'stripe'}>
                <div className={'inner-stripe'} style={{width: `${exp}%`}}>

                </div>
            </div>
        </div>
    );
}

export default ExperienceBar;