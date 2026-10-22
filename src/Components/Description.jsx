import './Playground.scss';

/** Подсказки на стартовом уровне и на соседних с ним. */
const text = {
    start: (
        <>
            <div className={'level-description-text'}>
                use
                <div className={'text-wasd'}>w <br/>a s d</div>
                keys to move<br/>
                use your mouse to aim<br/>
                hold to shoot<br/>
            </div>
            <div className={'level-description-text'}>
                try moving outside of this bubble
            </div>
        </>
    ),
    next: (
        <>
            <div className={'level-description-text'}>
                you have jumped to a<br/> new bubblefield!
            </div>
            <div className={'level-description-text'}>
                destroy enemy bubble tanks to grow!
            </div>
        </>
    )
};

function Description({kind}) {
    return <div className={'level-description'}>{text[kind]}</div>;
}

export default Description;
