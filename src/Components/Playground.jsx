import React from 'react';
import BaseBubble from './Base/Bubbles/BaseBubble';
import Store from './Store';

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
        if (x === Store.currentLevel.x && y === Store.currentLevel.y) {
            this.top = '50%';
            this.left = '50%';
            return this.position = 'center';
        } else {
            if (x === Store.currentLevel.x) {
                this.top = '50%';
                if (y === Store.currentLevel.y - 1) {
                    this.left = '-150%';
                    return this.position = 'left';
                }
                if (y === Store.currentLevel.y + 1) {
                    this.left = '150%';
                    return this.position = 'right';
                }
            }
            if (y === Store.currentLevel.y) {
                this.left = '50%';
                if (x === Store.currentLevel.x - 1) {
                    this.top = '-150%';
                    return this.position = 'top';
                }
                if (x === Store.currentLevel.x + 1) {
                    this.top = '150%';
                    return this.position = 'bottom';
                }
            }
        }
        this.position = false;
    };

    render() {
        const {x, y, obj} = this.props;
        this.getPosition(+x, +y);

        let styles = {
            width: `${Store.baseD}px`,
            height: `${Store.baseD}px`,
            left: this.left,
            top: this.top
        };

        if (this.position) {
            return (
                <div id={'playground'} className={'playground'} ref={this.base} style={styles}>
                    <BaseBubble w={Store.baseD}/>
                </div>
            );
        } else {
            return null;
        }

    }
}

export default Playground;

// function Playground(props) {
//     const {x, y, obj} = props;
//     const base = useRef(null);
//
//     const setCoordinates = () => {
//         Store.changeBaseCords(base.current.getBoundingClientRect());
//     };
//
//     useEffect(() => {
//         if (props.current) {
//             setCoordinates();
//             window.addEventListener('resize', setCoordinates);
//         }
//         return () => window.removeEventListener('resize', setCoordinates);
//     }, [x, y]);
//
//
//
//
//     const styles = {
//         width: `${Store.baseD}px`,
//         height: `${Store.baseD}px`,
//         left: `${left}%`,
//         top: `${top}%`,
//     };
//
//     return (
//         <div id={'playground'} className={'playground'} ref={base} style={styles}>
//             <BaseBubble w={Store.baseD}/>
//         </div>
//     );
// }
//
// export default Playground;