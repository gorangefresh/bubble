import React from 'react';
import './SelectionMenu.scss';
import Store from "../Store";

const description = {
    light: {
        1: 'light machine gun',
        2: 'twin light machine gun',
        3: 'heavy machine gun',
    },
    heavy: {
        1: 'heavy cannon',
        2: 'twin heavy cannon',
        3: 'twin heavy cannon and mine layer',
    },
    balanced: {
        1: 'twin cannon',
        2: 'rocket launcher',
        3: 'twin rocket launcher'
    }
};


function SelectionMenu() {
    const {lvl} = Store.mainTank;

    if (lvl <= 3) {
        return <div className={'selection-menu'}>
            <div className={'selection-menu-section'}>
                <div className={'select-button'} onClick={() => Store.changeClass('light')}>
                    Light {lvl}
                </div>
                <div className={'description'}>
                    {description.light[lvl]}
                </div>
            </div>
            <div className={'selection-menu-section'}>
                <div className={'select-button'} onClick={() => Store.changeClass('heavy')}>
                    Heavy {lvl}
                </div>
                <div className={'description'}>
                    {description.heavy[lvl]}
                </div>
            </div>
            <div className={'selection-menu-section'}>
                <div className={'select-button'} onClick={() => Store.changeClass('balanced')}>
                    Balanced {lvl}
                </div>
                <div className={'description'}>
                    {description.balanced[lvl]}
                </div>
            </div>
        </div>;
    } else {
        return <div className={'selection-menu'}>
            <div className={'selection-menu-section'}>
                <div className={'select-button'} onClick={() => Store.changeClass('light')}>
                    Destroyer
                </div>
            </div>
        </div>;
    }

}

export default SelectionMenu;