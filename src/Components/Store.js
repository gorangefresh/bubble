class Store {
    playgound;
    mouse = {x: 0, y: 0};
    mainTank = {x: 0, y: 0};
    baseD = 800;
    currentBaseCords = {x: 0, y: 0};
    tank = {};
    bullet = {};
    bullets = {};
    setBullet;

    changeBaseCords = (cordinates) => {
        this.currentBaseCords =  ({x: cordinates.x + this.baseD / 2, y: cordinates.y + this.baseD / 2 });
    };

    changeTankCoordinates = (id, coordinates) => {
        this.tank[id].coordinates = coordinates;
    };

    setMouse = e => {
        this.mouse = {x: e.x, y: e.y}
    };

    setMainTank = (position) => {
        this.mainTank.x = position.x;
        this.mainTank.y = position.y;
    };

    checkIn = (type, id, coordinates, damage) => {
        this[type][id] = {coordinates, damage}
    };

    checkOut = (type, id) => {
        delete this[type][id];
    };

    getId = (type, parent) => {
        return `${type}-${parent ? parent : ''}-${Date.now()}`;
    };

    setBulletPosition = (id, position) => {
        this.bullet[id].coordinates = position;
    }

}

export default new Store();