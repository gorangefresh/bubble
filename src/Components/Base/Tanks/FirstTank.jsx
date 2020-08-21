import React from 'react';
import Tank from "./Tank";
import BaseGun from '../Guns/BaseGun';


class FirstTank extends Tank {
    speed = 20;
    width  = 50;

    view = () => {
        return <>
            <BaseGun parent={this.type} position={{left: '0px', top: '0px'}}/>
        </>
    };
}

export default FirstTank;