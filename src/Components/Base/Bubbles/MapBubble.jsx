import {MASK} from '../Gradients/GradientDefs';
import BubbleCircle from './BubbleCircle';

/** Пузырь миникарты. Зачищенные уровни рисуются плотнее. */
function MapBubble({color, w, empty}) {
    const bubbleWidth = w * 0.8;

    return (
        <div className={'map-bubble'} style={{width: `${w}px`, height: `${w}px`}}>
            <svg
                viewBox={`0 0 ${bubbleWidth} ${bubbleWidth}`}
                style={{width: `${bubbleWidth}px`, height: `${bubbleWidth}px`, fill: color}}
            >
                <BubbleCircle mask={empty ? MASK.medium : MASK.low}/>
                <BubbleCircle mask={MASK.edge}/>
            </svg>
        </div>
    );
}

export default MapBubble;
