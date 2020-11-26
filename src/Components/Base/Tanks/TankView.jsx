import React from 'react';
import Store from "../../Store";

class TankView extends React.Component {
    speed = 20;
    width = 40;

    type = 'hero';

    constructor(props) {
        super(props);

        Store.mainTank.R = this.width / 2;
        Store.mainTank.speed = this.speed;
        Store.mainTank.halfSpeed = this.speed * .66;
        Store.tankD = this.width;
    }

    view = () => {
        return 0;
    };

    render() {
        return this.view();
    }
}

export default TankView;