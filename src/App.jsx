import React from 'react';
import Menu from './Components/Menu';
import Store from './Components/Store';

import './App.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        if (!Store.matrix) Store.init();
    }

    componentDidMount() {
        window.addEventListener('blur', this.pauseOn)
    }

    componentWillUnmount() {
        window.removeEventListener('blur', this.pauseOn);
        window.removeEventListener('focus', this.pauseOff);
    }

    pauseOn = () => {
        if (!Store.pause){
            window.addEventListener('focus', this.pauseOff);
            Store.pause = true;
        }
    }

    pauseOff = () => {
        Store.pause = false;
        window.removeEventListener('focus', this.pauseOff)
    }

    render() {
        return (<Menu/>);
    }

}

export default App;