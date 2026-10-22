import colors from '../../config/colors';
import Bubble from '../Base/Bubbles/Bubble';
import GunView from '../Base/Guns/GunView';

/**
 * Внешний вид противников по типу из config/enemies.
 * Было по классу-наследнику Enemy на каждый вид.
 */
const enemyArt = {
    plainEnemy: () => <Bubble w={30} color={colors.enemyColor1}/>,

    lightEnemy: owner => (
        <>
            <Bubble w={40} color={colors.enemyColor1}/>
            <GunView type={'enemyGun'} parent={'enemy'} owner={owner} offset={{x: 0, y: 0}}/>
        </>
    ),

    heavyEnemy: owner => (
        <>
            <Bubble w={60} color={colors.enemyColor1}/>
            <GunView type={'enemyHeavyGun'} parent={'enemy'} owner={owner} offset={{x: 0, y: 0}}/>
        </>
    ),

    machineGunEnemy: owner => (
        <>
            <Bubble left={12} top={7} w={40 / 1.5} color={colors.enemyColor1}/>
            <Bubble left={-12} top={7} w={40 / 1.5} color={colors.enemyColor1}/>
            <Bubble left={0} top={-12} w={40 / 1.5} color={colors.enemyColor1}/>
            <GunView type={'enemyMachineGun'} parent={'enemy'} owner={owner} offset={{x: 0, y: 0}}/>
        </>
    ),

    minerEnemy: owner => (
        <>
            <Bubble left={0} top={-10} w={40 / 1.9} color={colors.enemyColor1}/>
            <Bubble left={17} top={5} w={40 / 2} color={colors.enemyColor1}/>
            <Bubble left={-17} top={5} w={40 / 2} color={colors.enemyColor1}/>
            <Bubble left={15} top={20} w={40 / 2} color={colors.enemyColor2}/>
            <Bubble left={-15} top={20} w={40 / 2} color={colors.enemyColor2}/>
            <GunView type={'minelayer'} parent={'enemy'} owner={owner} offset={{x: 0, y: 15}}/>
        </>
    )
};

export default enemyArt;
