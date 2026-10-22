/**
 * Все градиенты и маски «пузырей» — один раз на документ.
 *
 * Было: каждый пузырь рендерил собственный <defs> с градиентом и маской,
 * а id склеивался из цвета и ширины — хотя ни градиент, ни маска от них
 * не зависят вовсе: цвет задаётся через `fill` на самом svg, а геометрия
 * маски берётся из bounding box элемента, который на неё ссылается.
 *
 * На одной только миникарте из 225 пузырей это давало порядка 900 лишних
 * элементов с дублирующимися id — причём id содержали символ '#' из hex
 * цвета, то есть ссылки вида url(#opacity--low-#d4f4f0-40).
 *
 * maskContentUnits="objectBoundingBox" с прямоугольником 1x1 даёт ровно ту
 * же картинку, что исходный rect 100%x100% в userSpaceOnUse, но не зависит
 * от viewBox конкретного svg — поэтому маску можно переиспользовать.
 */
export const MASK = {
    low: 'bubble-mask--low',
    medium: 'bubble-mask--medium',
    high: 'bubble-mask--high',
    edge: 'bubble-mask--edge'
};

const GRADIENT = {
    low: 'bubble-gradient--low',
    medium: 'bubble-gradient--medium',
    high: 'bubble-gradient--high',
    edge: 'bubble-gradient--edge'
};

function Mask({id, gradient}) {
    return (
        <mask id={id} maskContentUnits={'objectBoundingBox'}>
            <rect fill={`url(#${gradient})`} width={'1'} height={'1'}/>
        </mask>
    );
}

function GradientDefs() {
    return (
        <svg aria-hidden={'true'} width={'0'} height={'0'} className={'gradient-defs'}>
            <defs>
                <radialGradient id={GRADIENT.low} fx={'30%'} fy={'30%'}>
                    <stop offset={'0%'} stopColor={'black'} stopOpacity={'.7'}/>
                    <stop offset={'40%'} stopColor={'white'} stopOpacity={'.5'}/>
                    <stop offset={'100%'} stopColor={'white'} stopOpacity={'.9'}/>
                </radialGradient>

                <radialGradient id={GRADIENT.medium} fx={'25%'} fy={'25%'}>
                    <stop offset={'0%'} stopColor={'black'}/>
                    <stop offset={'30%'} stopColor={'black'} stopOpacity={'.2'}/>
                    <stop offset={'97%'} stopColor={'white'} stopOpacity={'.4'}/>
                    <stop offset={'100%'} stopColor={'black'}/>
                </radialGradient>

                <radialGradient id={GRADIENT.high} fy={'10%'}>
                    <stop offset={'60%'} stopColor={'black'} stopOpacity={'0'}/>
                    <stop offset={'100%'} stopColor={'white'} stopOpacity={'.25'}/>
                    <stop offset={'100%'} stopColor={'black'}/>
                </radialGradient>

                <radialGradient id={GRADIENT.edge} fx={'30%'} fy={'30%'}>
                    <stop offset={'0%'} stopColor={'black'}/>
                    <stop offset={'90%'} stopColor={'black'} stopOpacity={'.6'}/>
                    <stop offset={'100%'} stopColor={'white'} stopOpacity={'.9'}/>
                </radialGradient>

                <Mask id={MASK.low} gradient={GRADIENT.low}/>
                <Mask id={MASK.medium} gradient={GRADIENT.medium}/>
                <Mask id={MASK.high} gradient={GRADIENT.high}/>
                <Mask id={MASK.edge} gradient={GRADIENT.edge}/>
            </defs>
        </svg>
    );
}

export default GradientDefs;
