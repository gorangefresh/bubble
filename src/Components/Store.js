const levels = [{4: 4}, {3: 3}, {2: 2}, {1: 1}, {0: 0}];

class Store {
    tankD = 50;
    baseD = 800;

    matrix;
    screen;

    mouse = {x: 0, y: 0};
    mainTank = {x: 0, y: 0};
    currentBaseCords = {x: 0, y: 0};
    currentLevel = {y: 0, x: 0};

    tank = {};

    bullet = {};
    bullets = {};
    setBullet;

    screenUpdate;

    travel = false;

    changeBaseCords = (coordinates) => {
        this.currentBaseCords = ({x: coordinates.x + this.baseD / 2, y: coordinates.y + this.baseD / 2});
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
    };

    init = () => {
        const a = levels.length;

        const number = (x, y) => `${x}-${y}`;

        let r = a * 2 - 1;
        let m = [];
        for (let i = 0; i < r; i++) {
            for (let j = 0; j < r; j++) {
                m[number(i, j)] = JSON.parse(JSON.stringify(levels[0]));
            }
        }
        for (let i = 1; i < a; i++) {
            for (let j = 1; j < a; j++) {
                if (j >= i) {
                    m[number(i, j)] = JSON.parse(JSON.stringify(levels[i]));

                    m[number(i, r - 1 - j)] = JSON.parse(JSON.stringify(levels[i]));

                    m[number(r - 1 - i, j)] = JSON.parse(JSON.stringify(levels[i]));

                    m[number(r - 1 - i, r - 1 - j)] = JSON.parse(JSON.stringify(levels[i]));
                }
                if (j < i) {
                    m[number(i, j)] = JSON.parse(JSON.stringify(levels[j]));

                    m[number(i, r - 1 - j)] = JSON.parse(JSON.stringify(levels[j]));

                    m[number(r - 1 - i, j)] = JSON.parse(JSON.stringify(levels[j]));

                    m[number(r - 1 - i, r - 1 - j)] = JSON.parse(JSON.stringify(levels[j]));
                }
            }
        }

        this.matrix = m;
        this.currentLevel = {x: +a - 1, y: +a - 1};
    };

    touchEdge = (x, y) => {
        if (this.currentBaseCords.x === 0 && this.currentBaseCords.y === 0) return false;
        let a = x - this.currentBaseCords.x;
        let b = y - this.currentBaseCords.y;
        let R = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return R >= this.baseD / 2;
    };

    changeLevel = () => {
        const getDirections = () => {
            const radiusDelta = (d) => {
                return ((this.baseD / 2 - Math.abs(d)) * 2 + this.tankD);
            };

            let x = this.mainTank.x - this.currentBaseCords.x;
            let y = this.mainTank.y - this.currentBaseCords.y;

            if (+Math.abs(x) > +Math.abs(y)) {
                if (x > 0) {
                    if (this.currentLevel.y !== (levels.length - 1) * 2) {
                        this.currentLevel.y = this.currentLevel.y + 1;
                    } else {
                        this.currentLevel.y = 0;
                    }
                    console.log(this.currentLevel);
                    return {x: -this.baseD + radiusDelta(x), y: 0}

                } else {
                    if (this.currentLevel.y !== 0) {
                        this.currentLevel.y = this.currentLevel.y - 1;
                    } else {
                        this.currentLevel.y = (levels.length - 1) * 2;
                    }
                    console.log(this.currentLevel);
                    return {x: this.baseD - radiusDelta(x), y: 0}
                }
            } else {
                if (y > 0) {
                    if (this.currentLevel.x !== (levels.length - 1) * 2) {
                        this.currentLevel.x = this.currentLevel.x + 1;
                    } else {
                        this.currentLevel.x = 0;
                    }
                    console.log(this.currentLevel);
                    return {x: 0, y: -this.baseD + radiusDelta(y)}
                } else {
                    if (this.currentLevel.x !== 0) {
                        this.currentLevel.x = this.currentLevel.x - 1;
                    } else {
                        this.currentLevel.x = (levels.length - 1) * 2;
                    }
                    console.log(this.currentLevel);
                    return {x: 0, y: this.baseD - radiusDelta(y)}
                }
            }
        };
        let delta = getDirections();
        this.screenUpdate();
        return delta;
    };


}

export default new Store();