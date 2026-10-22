import React from 'react';
import Menu from './Components/Menu';
import Loop from './engine/Loop';
import input from './game/input';
import session from './game/session';
import Sounds from './game/sounds';

import './App.scss';

class App extends React.Component {
    /** Пауза поставлена именно потерей фокуса, а не меню апгрейда. */
    pausedByBlur = false;

    constructor(props) {
        super(props);
        if (!session.matrix) session.init();
    }

    componentDidMount() {
        Sounds.load();
        input.attach();
        Loop.start();

        window.addEventListener('blur', this.pauseOn);
        window.addEventListener('focus', this.pauseOff);
    }

    componentWillUnmount() {
        window.removeEventListener('blur', this.pauseOn);
        window.removeEventListener('focus', this.pauseOff);

        input.detach();
        Loop.stop();
    }

    /**
     * Было: слушатель focus добавлялся и снимался на ходу внутри самих
     * обработчиков, а состояние паузы было одним общим флагом — поэтому
     * возврат фокуса мог снять паузу, поставленную меню выбора класса.
     * Теперь обработчики постоянны, а снимать паузу имеет право только тот,
     * кто её поставил.
     */
    pauseOn = () => {
        if (session.pause) return;

        this.pausedByBlur = true;
        session.setPaused(true);
    };

    pauseOff = () => {
        if (!this.pausedByBlur) return;

        this.pausedByBlur = false;
        session.setPaused(false);
    };

    render() {
        return <Menu/>;
    }
}

export default App;
