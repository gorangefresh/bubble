const enemies = {
    'plainEnemy': {
        type: 'plainEnemy',
        hp: 2,
        xp: 2,
        R: 15
    },
    'lightEnemy': {
        type: 'lightEnemy',
        hp: 3,
        xp: 3,
        R: 20
    },
    'heavyEnemy': {
        type: 'heavyEnemy',
        hp: 8,
        xp: 5,
        R: 30
    },
    'minerEnemy': {
        type: 'minerEnemy',
        hp: 10,
        xp: 5,
        R: 25
    },
    'machineGunEnemy': {
        type: 'machineGunEnemy',
        hp: 5,
        xp: 5,
        R: 25
    },
};

const levels = [
    {
        'level': 7,
        enemies: {
            'machineGunEnemy': 4,
            'heavyEnemy': 4,
        },
    },
    {
        'level': 6,
        enemies: {
            'machineGunEnemy': 1,
            'lightEnemy': 6,
            'heavyEnemy': 3,
        },
    },
    {
        'level': 5,
        enemies: {
            'machineGunEnemy': 1,
            'lightEnemy': 5,
            'heavyEnemy': 2,
        },
    },
    {
        'level': 4,
        enemies: {
            'machineGunEnemy': 1,
            'lightEnemy': 5,
            'heavyEnemy': 1,
        },
    },
    {
        'level': 3,
        enemies: {
            'heavyEnemy': 3,
            'lightEnemy': 1,
            'minerEnemy': 1,
            'plainEnemy': 1
        },
    },
    {
        'level': 2,
        enemies: {
            'lightEnemy': 4,
            'plainEnemy': 2
        },
    },
    {
        'level': 1,
        enemies: {
            'plainEnemy': 4,
        },
    },
    {
        'level': 0,
        enemies: {
            // 'machineGunEnemy': 1
        },
        empty: true
    }
];

const lvl = {0: 0, 1: 5, 2: 20, 3: 40, 4: 70, 5: 110};

class Store {
    // Пауза
    pause = false;

    matrixLength = (levels.length - 1) * 2;

    tankD = 50;
    baseD = 800;
    baseR = this.baseD / 2;

    // Объект содержит все уровни с полным отражение состояния
    matrix;

    mainTank = {
        x: 0,
        y: 0,
        exp: 0,
        lvl: 0,
        R: 25,
        angle: 0
    };

    upgradeTree = {0: 'light'};

    // Позиция на миникарте текущего уровня
    y = 0;
    x = 0;

    // Координаты курсора
    mouse = {x: 0, y: 0};

    // Координаты текущего уровня
    currentBasePosition = {x: 0, y: 0};

    // Объект с летящими пулями
    bullets = {};

    // Функция обновления компонента содержащего пули.
    updateBulletPlace;

    // Функция обновления базового компонента, используется при смене уровня
    screenUpdate;

    // Улучшаем танк
    upgrade;

    // переменная состояния перемещения между уровнями
    travel = false;

    // Функция обновления панели опыта
    setExp;

    // Функция активирующая меню выбора
    select = () => null;

    //
    current;

    changeBaseCords = (coordinates) => {
        this.currentBasePosition = ({x: coordinates.x + this.baseR, y: coordinates.y + this.baseR});
    };

    setMouse = e => {
        this.mouse = {x: e.x, y: e.y}
    };

    checkIn = (type, id, coordinates, burst) => {
        this.current[type][id].coordinates = coordinates;
        this.current[type][id].burst = burst;
    };

    checkOut = (type, id) => {
        delete this.matrix[`${this.x}-${this.y}`][type][id];
    };


    toEmpty = () => {
        if (Object.keys(this.matrix[`${this.x}-${this.y}`].enemy).length === 0) {
            this.matrix[`${this.x}-${this.y}`].empty = true;
        }
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

    enemyHit = (x, y, damage) => {
        let pos = this.mainTank;
        let R = this.mainTank.R;
        x = x + this.currentBasePosition.x;
        y = y + this.currentBasePosition.y;
        if (pos.x - R < x && x < pos.x + R && pos.y - R < y && y < pos.y + R) {
            this.addExp(-damage);
            return true;
        }
    };

    initLevels = () => {
        for (let i of levels) {
            let count = 1;
            i.enemy = {};
            i.empty = Object.keys(i.enemies).length === 0;
            for (let j in i.enemies) {
                while (i.enemies[j] > 0) {
                    i.enemy[count] = JSON.parse(JSON.stringify(enemies[j]));
                    i.enemies[j]--;
                    count++;
                }

            }
        }
    };

    init = () => {
        const a = levels.length;
        this.initLevels();
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
        this.startX = this.x;
        this.y = +a - 1;
        this.startY = this.y;
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
            if (+Math.abs(x) >= +Math.abs(y)) {
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
        this.screenUpdate(`${this.x}-${this.y}`);
        return delta;
    };

    addExp = async (exp) => {

        this.mainTank.exp += exp;

        if (this.mainTank.exp < 0) this.mainTank.exp = 0;
        if (this.mainTank.exp > lvl[5]) this.mainTank.exp = lvl[5];

        if (
            this.mainTank.exp >= lvl[this.mainTank.lvl + 1] &&
            this.mainTank.lvl < 4
        ) {
            console.log(this.mainTank.lvl);
            this.mainTank.lvl += 1;

            if (!this.upgradeTree[this.mainTank.lvl]) {
                this.pause = true;
                this.select(true);

                this.setExp(100);

                await this.selectMenu();
            }

            this.upgrade(this.mainTank.lvl);
        }

        exp = 100 * (this.mainTank.exp - lvl[this.mainTank.lvl]) / (lvl[this.mainTank.lvl + 1] - lvl[this.mainTank.lvl]);

        this.setExp(exp);
    };

    delay = ms => {
        return new Promise(r => setTimeout(() => r(), ms))
    };

    selectMenu = async () => {
        if (this.pause) {
            await this.delay(100);
            return await this.selectMenu();
        } else {
            return 1;
        }
    };

    changeClass = newClass => {
        this.upgradeTree[this.mainTank.lvl] = newClass;
        this.select(false);
        this.pause = false;
    }
}

export default new Store();