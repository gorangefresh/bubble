const levels = [
    {7: 7},
    {6: 6},
    {5: 5},
    {7: 7},
    {6: 6},
    {5: 5},
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
                xp: 3,
                R: 20
            },
            2: {
                type: 'secondEnemy',
                hp: 5,
                damage: 2,
                xp: 3,
                R: 20
            },
            3: {
                type: 'secondEnemy',
                hp: 5,
                damage: 2,
                xp: 3,
                R: 20
            },
            4: {
                type: 'secondEnemy',
                hp: 5,
                damage: 2,
                xp: 3,
                R: 20
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
                xp: 2,
                R: 20
            },
            2: {
                type: 'firstEnemy',
                hp: 3,
                damage: 0,
                xp: 2,
                R: 20
            },
            3: {
                type: 'firstEnemy',
                hp: 3,
                damage: 0,
                xp: 2,
                R: 20
            }
        }
    }
];

const lvl = {0: 0, 1: 20, 2: 60, 3: 200, 4: 500};

class Store {
    matrixLength = (levels.length - 1) * 2;

    tankD = 50;
    baseD = 800;
    baseR = this.baseD / 2;

    matrix;
    screen;

    mouse = {x: 0, y: 0};
    mainTank = {x: 0, y: 0, exp: 0, lvl: 0};
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

    setExp;

    changeBaseCords = (coordinates) => {
        this.currentBasePosition = ({x: coordinates.x + this.baseR, y: coordinates.y + this.baseR});
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
        this.current[type][id].coordinates = coordinates;
        this.current[type][id].burst = burst;

    };

    checkOut = (type, id) => {
        delete this.matrix[`${this.x}-${this.y}`][type][id];
    };

    getId = (type, parent) => {
        return `${type}-${parent ? parent : ''}-${Date.now()}`;
    };

    hit = (x, y, damage) => {
        for (let i in this.current.enemy) {
            let pos = this.current.enemy[i].coordinates;
            let R = this.current.enemy[i].R;
            if (pos.x - R < x && x < pos.x + R && pos.y - R < y && y < pos.y + R) {

                this.current.enemy[i].hp -= damage;
                if (this.current.enemy[i].hp <= 0) {
                    this.addExp(this.current.enemy[i].xp);
                    this.current.enemy[i].burst();
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
        this.current = this.matrix[`${this.x}-${this.y}`];
    };

    touchEdge = (x, y, r = 0) => {
        if (this.currentBasePosition.x === 0 && this.currentBasePosition.y === 0) return false;
        let R = Math.sqrt(x ** 2 + y ** 2);
        return R + r >= this.baseR;
    };

    changeLevel = () => {
        const getDirections = () => {
            const radiusDelta = (d) => {
                return ((this.baseR - Math.abs(d)) * 2 + this.tankD);
            };

            let x = this.mainTank.x - this.currentBasePosition.x;
            let y = this.mainTank.y - this.currentBasePosition.y;
            let a;
            if (+Math.abs(x) > +Math.abs(y)) {
                if (x > 0) {
                    if (this.y !== this.matrixLength) {
                        this.y = this.y + 1;
                    } else {
                        this.y = 0;
                    }
                    a = {x: -this.baseD + radiusDelta(x), y: 0};
                } else {
                    if (this.y !== 0) {
                        this.y = this.y - 1;
                    } else {
                        this.y = this.matrixLength;
                    }
                    a = {x: this.baseD - radiusDelta(x), y: 0}
                }
            } else {
                if (y > 0) {
                    if (this.x !== this.matrixLength) {
                        this.x = this.x + 1;
                    } else {
                        this.x = 0;
                    }
                    a = {x: 0, y: -this.baseD + radiusDelta(y)}
                } else {
                    if (this.x !== 0) {
                        this.x = this.x - 1;
                    } else {
                        this.x = this.matrixLength;
                    }
                    a = {x: 0, y: this.baseD - radiusDelta(y)}
                }
            }
            this.current = this.matrix[`${this.x}-${this.y}`];
            return a;
        };

        let delta = getDirections();
        this.screenUpdate();
        return delta;
    };

    addExp = (exp) => {
        this.mainTank.exp += exp;
        for (let i in lvl) {

            if (this.mainTank.exp < lvl[i] ) {
                this.mainTank.lvl = +i - 1;
                if (i > 0) {

                    if (lvl[+i+1]) {
                        exp = (this.mainTank.exp - lvl[this.mainTank.lvl]) / lvl[i] * 100;
                    } else {
                        exp = 100;
                    }
                } else {
                    exp = this.mainTank.exp / lvl[i] * 100;
                }
                this.setExp(exp);
                break
            }
        }
    };
}

export default new Store();