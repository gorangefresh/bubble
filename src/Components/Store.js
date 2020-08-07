const levels = [
    {4: 4},
    {3: 3},
    {2: 2},
    {1: 1},
    {
        'level': 0,
        enemy: {
            1: {
                type: 'firstEnemy',
                hp: 3,
                damage: 0,
                bubbles: 2
            }
        }
    }];

class Store {
    tankD = 50;
    baseD = 800;

    matrix;
    screen;

    mouse = {x: 0, y: 0};
    mainTank = {x: 0, y: 0};
    currentBasePosition = {x: 0, y: 0};
    
    // Координаты текущего уровня
    y = 0;
    x = 0;

    tank = {};
    enemy = {};

    bullets = {};
    setBullet;

    screenUpdate;

    travel = false;

    changeBaseCords = (coordinates) => {
        this.currentBasePosition = ({x: coordinates.x + this.baseD / 2, y: coordinates.y + this.baseD / 2});
    };

    changeTankCoordinates = (id, coordinates, R) => {
        this.tank[id] = {coordinates, R};
    };

    setMouse = e => {
        this.mouse = {x: e.x, y: e.y}
    };

    setMainTank = (position) => {
        this.mainTank.x = position.x;
        this.mainTank.y = position.y;
    };

    checkIn = (type, id, coordinates, damage, burst, hp) => {
        this[type][id] = {coordinates, damage, burst, hp}
    };

    checkOut = (type, id) => {
        delete this[type][id];
    };

    getId = (type, parent) => {
        return `${type}-${parent ? parent : ''}-${Date.now()}`;
    };

    hit = (x, y, damage) => {
        for (let i in this.enemy) {
            let pos = this.enemy[i].coordinates;
            // console.log(pos.x - pos.R < x, x < pos.x + pos.R, pos.y - pos.R < y, y < pos.y + pos.R);
            if (pos.x - pos.R < x && x < pos.x + pos.R && pos.y - pos.R < y && y < pos.y + pos.R) {
                this.enemy[i].hp = this.enemy[i].hp - damage;
                if (this.enemy[i].hp <= 0) this.enemy[i].burst();
                return true;
            }
        }
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
        this.x = +a - 1;
        this.y = +a - 1;
    };

    touchEdge = (x, y) => {
        if (this.currentBasePosition.x === 0 && this.currentBasePosition.y === 0) return false;
        let R = Math.sqrt(x ** 2 + y ** 2);
        return R >= this.baseD / 2;
    };

    changeLevel = () => {
        const getDirections = () => {
            const radiusDelta = (d) => {
                return ((this.baseD / 2 - Math.abs(d)) * 2 + this.tankD);
            };

            let x = this.mainTank.x - this.currentBasePosition.x;
            let y = this.mainTank.y - this.currentBasePosition.y;

            if (+Math.abs(x) > +Math.abs(y)) {
                if (x > 0) {
                    if (this.y !== (levels.length - 1) * 2) {
                        this.y = this.y + 1;
                    } else {
                        this.y = 0;
                    }
                    return {x: -this.baseD + radiusDelta(x), y: 0}

                } else {
                    if (this.y !== 0) {
                        this.y = this.y - 1;
                    } else {
                        this.y = (levels.length - 1) * 2;
                    }
                    return {x: this.baseD - radiusDelta(x), y: 0}
                }
            } else {
                if (y > 0) {
                    if (this.x !== (levels.length - 1) * 2) {
                        this.x = this.x + 1;
                    } else {
                        this.x = 0;
                    }
                    return {x: 0, y: -this.baseD + radiusDelta(y)}
                } else {
                    if (this.x !== 0) {
                        this.x = this.x - 1;
                    } else {
                        this.x = (levels.length - 1) * 2;
                    }
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