/**
 * Палитра — единственный источник цветов в проекте.
 *
 * До рефакторинга цвета жили в трёх местах: const.js, хардкод в MiniMap.jsx
 * и hex-литералы по всем .scss. Теперь так: JS берёт hex прямо отсюда
 * (нужен для SVG fill и для сборки id градиентов), а SCSS читает те же
 * значения через CSS-переменные --c-*, которые проставляет applyPalette().
 */

// Базовая гамма: от самого светлого к самому тёмному.
const ramp = {
    color1: '#d4f4f0',
    color2: '#88c4be',
    color3: '#1f615f',
    color4: '#0c3e3e',
    color5: '#072928'
};

// Производные оттенки. Раньше считались в SCSS через lighten(), который
// задеприкейчен в Dart Sass; значения здесь — ровно то, что выдавал lighten,
// поэтому внешний вид не изменился.
const shades = {
    color3Light2: '#216967',  // lighten(color3, 2%)
    color3Light10: '#2b8885', // lighten(color3, 10%)
    color3Light15: '#329b98', // lighten(color3, 15%)
    color4Light2: '#0e4747'   // lighten(color4, 2%)
};

// Акценты.
const accents = {
    blue: '#7aa5c4',
    orange: '#ffa461',
    green: '#6cc286',
    pink: '#ff7d8d',
    yellow: '#fffd8e'
};

const palette = {
    ...ramp,
    ...shades,
    ...accents,

    // Семантические имена поверх гаммы. Пушки и корпус героя — это не
    // «color5» и «color3» по смыслу, поэтому у них свои ключи.
    gunColor2: ramp.color5,
    gunColor3: ramp.color5,
    heroColor2: ramp.color3,

    enemyColor1: '#b5fffd',
    enemyColor2: '#62a4ff',

    travelColor: '#fafafa',

    // Пули адресуются динамически: cst[parent + 'BulletColor' + n],
    // где parent — 'hero' или 'enemy'. Все шесть ключей обязательны.
    heroBulletColor1: accents.pink,
    heroBulletColor2: accents.pink,
    heroBulletColor3: accents.pink,
    enemyBulletColor1: '#191a3a',
    enemyBulletColor2: '#1b1c3e',
    enemyBulletColor3: '#1a1b3b',

    rocketColor: accents.pink,

    // Вспышка мины противника.
    mineBlink: '#c62735',

    // Миникарта. Было захардкожено прямо в MiniMap.jsx.
    mapBase: ramp.color1,
    mapCurrent: ramp.color4
};

/**
 * Прокидывает палитру в CSS как --c-<ключ>, чтобы SCSS не держал копию
 * тех же hex. Вызывается один раз синхронно до первого рендера.
 */
export function applyPalette(target = document.documentElement) {
    for (const [name, value] of Object.entries(palette)) {
        target.style.setProperty(`--c-${name}`, value);
    }
}

export default palette;
