const levels = [
    {4: 4},
    {3: 3},
    {2: 2},
    {
        'level': 1,
        enemy: {
            1: {
                type: 'secondEnemy',
                hp: 5,
                damage: 2,
                xp: 3
            },
            2: {
                type: 'secondEnemy',
                hp: 5,
                damage: 2,
                xp: 3
            },
            3: {
                type: 'secondEnemy',
                hp: 5,
                damage: 2,
                xp: 3
            },
            4: {
                type: 'secondEnemy',
                hp: 5,
                damage: 2,
                xp: 3
            }
        }
    },
    {
        'level': 0,
        enemy: {
            1: {
                type: 'firstEnemy',
                hp: 3,
                damage: 0,
                xp: 2
            },
            2: {
                type: 'firstEnemy',
                hp: 3,
                damage: 0,
                xp: 2
            },
            3: {
                type: 'firstEnemy',
                hp: 3,
                damage: 0,
                xp: 2
            }
        }
    }
];

// const level = [];

class Store {
    matrixLength = (levels.length - 1) * 2;

    tankD = 50;
    baseD = 800;

    matrix;
    screen;

    mouse = {x: 0, y: 0};
    mainTank = {x: 0, y: 0, xp: 0, level: 0};
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

    checkIn = (type, id, coordinates, burst) => {
        let level = `${this.x}-${this.y}`;
        this.matrix[level][type][id].coordinates = coordinates;
        this.matrix[level][type][id].burst = burst;

    };

    checkOut = (type, id) => {
        let level = `${this.x}-${this.y}`;
        this.mainTank.xp += this.matrix[level][type][id].xp;
        delete this.matrix[level][type][id];
    };

    getId = (type, parent) => {
        return `${type}-${parent ? parent : ''}-${Date.now()}`;
    };

    hit = (x, y, damage) => {
        let level = `${this.x}-${this.y}`;

        for (let i in this.matrix[level].enemy) {
            let pos = this.matrix[level].enemy[i].coordinates;

            if (pos.x - pos.R < x && x < pos.x + pos.R && pos.y - pos.R < y && y < pos.y + pos.R) {

                this.matrix[level].enemy[i].hp -= damage;
                if (this.matrix[level].enemy[i].hp <= 0) {
                    this.matrix[level].enemy[i].burst();
                }
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
                    if (this.y !== this.matrixLength) {
                        this.y = this.y + 1;
                    } else {
                        this.y = 0;
                    }
                    return {x: -this.baseD + radiusDelta(x), y: 0}

                } else {
                    if (this.y !== 0) {
                        this.y = this.y - 1;
                    } else {
                        this.y = this.matrixLength;
                    }
                    return {x: this.baseD - radiusDelta(x), y: 0}
                }
            } else {
                if (y > 0) {
                    if (this.x !== this.matrixLength) {
                        this.x = this.x + 1;
                    } else {
                        this.x = 0;
                    }
                    return {x: 0, y: -this.baseD + radiusDelta(y)}
                } else {
                    if (this.x !== 0) {
                        this.x = this.x - 1;
                    } else {
                        this.x = this.matrixLength;
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