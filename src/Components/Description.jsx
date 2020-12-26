import React from 'react';
import './Playground.scss';

class Description extends React.Component {

    render() {
        if (this.props.center) {
            return <div className={'level-description'}>
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
            </div>
        } else {
            return <div className={'level-description'}>
                <div className={'level-description-text'}>
                    you have jumped to a<br/> new bubblefield!
                </div>
                <div className={'level-description-text'}>
                    destroy enemy bubble tanks to grow!
                </div>
            </div>
        }

    }
}

export default Description;