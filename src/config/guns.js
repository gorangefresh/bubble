/**
 * Орудия: скорострельность (мс между выстрелами), урон и тип снаряда.
 * Раньше эти три числа объявлялись в каждом из восьми классов-наследников.
 */
const guns = {
    // Орудия героя — стреляют по зажатой кнопке мыши.
    baseGun: {fireRate: 400, damage: 1, bullet: 'bullet'},
    heavyGun: {fireRate: 400, damage: 3, bullet: 'bigBullet'},
    machineGun: {fireRate: 230, damage: 1, bullet: 'bullet'},
    heavyMachineGun: {fireRate: 230, damage: 3, bullet: 'bigBullet'},
    rocketLauncher: {fireRate: 1000, damage: 2, bullet: 'hunter'},

    // Орудия противника — стреляют сами по таймеру.
    enemyGun: {fireRate: 1300, damage: 1, bullet: 'bullet', auto: true},
    enemyHeavyGun: {fireRate: 1300, damage: 3, bullet: 'bigBullet', auto: true},
    enemyMachineGun: {fireRate: 300, damage: 1, bullet: 'bullet', auto: true},

    // Минный постановщик: `auto` + неподвижная мина. Его носят и минёр,
    // и тяжёлый танк героя третьего уровня — урон определяется стороной
    // стрелка, а не самой пушкой.
    minelayer: {fireRate: 1300, damage: 5, bullet: 'mine', auto: true}
};

export default guns;
