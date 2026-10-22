import {useState} from 'react';
import StartButton from './StartButton';
import Screen from './Screen';

import './Menu.scss';

function Menu() {
    const [started, setStarted] = useState(false);

    // Было: состояние-строка 'menu' | 'play', и если бы значение оказалось
    // любым другим, компонент вернул бы undefined — в React 18 это ошибка
    // рендера, а не пустой экран.
    if (!started) return <StartButton onClick={() => setStarted(true)}/>;

    return <Screen/>;
}

export default Menu;
