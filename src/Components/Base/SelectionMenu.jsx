import React from 'react';
import './SelectionMenu.scss';
import Store from "../Store";

function SelectionMenu() {

    return <div className={'selection-menu'}>
        <div className={'select-button'} onClick={() => Store.changeClass('light')}>Light</div>
        <div className={'select-button'} onClick={() => Store.changeClass('heavy')}>Heavy</div>
        <div className={'select-button'} onClick={() => Store.changeClass('balanced')}>Balanced</div>
    </div>;
}

export default SelectionMenu;