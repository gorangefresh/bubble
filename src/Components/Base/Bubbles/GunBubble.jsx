import {MASK} from '../Gradients/GradientDefs';
import BubbleCircle from './BubbleCircle';

/** Пузырь орудия. */
function GunBubble({w, h, left = 0, top = 0, color}) {
    const height = h || w;

    return (
        <div className={'bubble-wrap'} style={{left: `${left}px`, top: `${top}px`}}>
            <svg
                viewBox={`0 0 ${w} ${height}`}
                style={{width: `${w}px`, height: `${height}px`, fill: color}}
            >
                <BubbleCircle mask={MASK.edge}/>
                <BubbleCircle mask={MASK.low}/>
            </svg>
        </div>
    );
}

export default GunBubble;
