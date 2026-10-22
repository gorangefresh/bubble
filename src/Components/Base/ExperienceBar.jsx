import {useEffect, useState} from 'react';
import {bind, UI} from '../../game/ui';

import './ExperienceBar.scss';

function ExperienceBar() {
    const [exp, setExp] = useState(0);

    // Было: `Store.setExp = setExp` без отписки.
    useEffect(() => bind(UI.EXP, setExp), []);

    return (
        <div className={'experience-bar'}>
            <div className={'stripe'}>
                <div className={'inner-stripe'} style={{width: `${exp}%`}}/>
            </div>
        </div>
    );
}

export default ExperienceBar;
