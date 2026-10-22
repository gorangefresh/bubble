import {CLASS_DESCRIPTION, CLASSES, MAX_LEVEL} from '../../config/progression';
import {chooseClass} from '../../game/progression';
import session from '../../game/session';

import './SelectionMenu.scss';

/** Меню выбора класса при повышении уровня. */
function SelectionMenu() {
    const {level} = session.hero;

    // На последнем уровне выбора нет — только Destroyer.
    const options =
        level >= MAX_LEVEL
            ? [{name: 'light', title: 'Destroyer', description: null}]
            : CLASSES.map(name => ({
                  name,
                  title: `${name[0].toUpperCase()}${name.slice(1)} ${level}`,
                  description: CLASS_DESCRIPTION[name][level]
              }));

    return (
        <div className={'selection-menu'}>
            {options.map(option => (
                <div className={'selection-menu-section'} key={option.name}>
                    <div className={'select-button'} onClick={() => chooseClass(option.name)}>
                        {option.title}
                    </div>
                    {option.description ? (
                        <div className={'description'}>{option.description}</div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

export default SelectionMenu;
