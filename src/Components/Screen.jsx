import {useEffect, useRef, useState} from 'react';
import GradientDefs from './Base/Gradients/GradientDefs';
import ExperienceBar from './Base/ExperienceBar';
import MiniMap from './Base/MiniMap';
import SelectionMenu from './Base/SelectionMenu';
import Tank from './Base/Tanks/Tank';
import Playground from './Playground';
import session from '../game/session';
import {bind, UI} from '../game/ui';

function Screen() {
    const [cellKey, setCellKey] = useState(session.key);
    const [selecting, setSelecting] = useState(false);
    const screen = useRef(null);

    // Было: сеттеры присваивались в поля Store без отписки.
    useEffect(() => bind(UI.SCREEN, setCellKey), []);
    useEffect(() => bind(UI.SELECT, setSelecting), []);

    useEffect(() => {
        const measure = () => {
            const node = screen.current;
            if (!node) return;

            const rect = node.getBoundingClientRect();
            session.setFieldCenter(rect.x + rect.width / 2, rect.y + rect.height / 2);
        };

        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    return (
        <div id={'screen'} className={'screen'} ref={screen}>
            <GradientDefs/>

            {selecting ? <SelectionMenu/> : null}

            <Tank/>

            {session.visibleCells().map(cell => (
                <Playground
                    key={cell.key}
                    cellKey={cell.key}
                    position={cell.position}
                    left={cell.left}
                    top={cell.top}
                />
            ))}

            <ExperienceBar/>
            <MiniMap current={cellKey}/>
        </div>
    );
}

export default Screen;
