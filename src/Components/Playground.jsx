import React from 'react';
import BaseBubble from './Base/Bubbles/BaseBubble';
import Store from './Store';
import BulletsPlace from "./BulletsPlace";

class Playground extends React.Component {
    constructor(props) {
        super(props);

        this.position = false;
        this.listner = false;
        this.base = React.createRef();
    }


    componentDidMount() {
        if (this.position === 'center') {
            this.setCoordinates();
            window.addEventListener('resize', this.setCoordinates);
        }
    }

    componentDidUpdate() {
        if (this.position === 'center' && !this.listner) {
            setTimeout(() => {
                this.setCoordinates();
            }, 800);
            window.addEventListener('resize', this.setCoordinates);
            this.listner = true;
        } else if (this.position !== 'center' && this.listner) {
            window.removeEventListener('resize', this.setCoordinates);
            this.listner = false;
        }
    }

    componentWillUnmount() {
        if (this.listner) {
            window.removeEventListener('resize', this.setCoordinates);
        }
    }

    setCoordinates = () => {
        Store.changeBaseCords(this.base.current.getBoundingClientRect());
    };


    getPosition = (x, y) => {
        if (x === Store.x && y === Store.y) {
            this.top = '50%';
            this.left = '50%';
            return this.position = 'center';
        } else {
            if (x === Store.x) {
                this.top = '50%';
                if (
                    y === Store.y - 1 ||
                    (Store.y === 0 && y === Store.matrixLength)
                ) {
                    this.left = '-150%';
                    return this.position = 'left';
                }
                if (
                    y === Store.y + 1 ||
                    (y === 0 && Store.y === Store.matrixLength)
                ) {
                    this.left = '150%';
                    return this.position = 'right';
                }
            }
            if (y === Store.y) {
                this.left = '50%';
                if (
                    x === Store.x - 1 ||
                    (Store.x === 0 && x === Store.matrixLength)
                ) {
                    this.top = '-150%';
                    return this.position = 'top';
                }
                if (
                    x === Store.x + 1 ||
                    (x === 0 && Store.x === Store.matrixLength)
                ) {
                    this.top = '150%';
                    return this.position = 'bottom';
                }
            }
        }
        this.position = false;
    };

    render() {
        const {x, y} = this.props;
        this.getPosition(+x, +y);

        if (this.position) {
            let styles = {
                width: `${Store.baseD}px`,
                height: `${Store.baseD}px`,
                left: this.left,
                top: this.top
            };

            let place;
            if (this.position === 'center') place = <BulletsPlace/>;

            return (
                <div id={x + '-' + y} className={'playground'} ref={this.base} style={styles}>
                    <BaseBubble color={'#FFFFFF'} w={Store.baseD}/>
                    {place}
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Playground;