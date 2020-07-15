import React, {useRef, useEffect} from 'react';
import HighOpacity from '../Gradients/OpacityGradients/HighOpacity';
import './BaseBubble.scss';
import Store from "../../Store";

function BaseBubble(props) {
    const base = useRef(null);
    const {w, h, left} = props;
    let viewBox = `0 0 ${w} ${h ? h : w}`;

    useEffect(() => {
        setCoordinates();
        window.addEventListener('resize', setCoordinates);
        return () => window.removeEventListener('resize', setCoordinates);
    }, [left]);

    const setCoordinates = () => {
        Store.changeBaseCords(base.current.getBoundingClientRect());
    };


    return (
        <div className={'bubble-wrap'} ref={base} style={{left: `${left}%` , top: `50%`}}>
            <svg viewBox={viewBox} style={{width: `${w}px`, height: `${h ? h : w}px`}}>
                <HighOpacity color={'#FFFFFF'}/>
            </svg>
        </div>
    );
}

export default BaseBubble;