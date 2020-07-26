import React from 'react';
import Menu from './Components/Menu';
import Store from './Components/Store';

import './App.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        if (!Store.matrix) Store.init();
    }

    render() {
        return (<Menu/>);
    }

}

export default App;