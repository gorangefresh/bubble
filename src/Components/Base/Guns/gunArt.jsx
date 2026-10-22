import colors from '../../../config/colors';
import Bubble from '../Bubbles/Bubble';
import GunBubble from '../Bubbles/GunBubble';

/**
 * Внешний вид орудий по типу из config/guns. Было по классу на каждое,
 * и в каждом — свои fireRate/damage/bullet вперемешку с разметкой.
 *
 * Орудия героя собраны из GunBubble, орудия противника — из Bubble
 * (у него дополнительно есть подсветка кромки). Так было изначально.
 */
const gunArt = {
    baseGun: () => (
        <>
            <GunBubble color={colors.color5} w={15} left={0} top={2}/>
            <GunBubble color={colors.color5} w={10} left={0} top={-10}/>
            <GunBubble color={colors.heroBulletColor1} w={10} left={0} top={1}/>
        </>
    ),

    heavyGun: () => (
        <>
            <GunBubble color={colors.color5} w={20} left={0} top={10}/>
            <GunBubble color={colors.pink} w={15} left={0} top={10}/>
            <GunBubble color={colors.color5} w={10} left={10} top={-3}/>
            <GunBubble color={colors.color5} w={10} left={-10} top={-3}/>
        </>
    ),

    machineGun: () => (
        <>
            <GunBubble color={colors.gunColor2} w={15} left={0} top={8}/>
            <GunBubble color={colors.gunColor2} w={15} left={0} top={0}/>
            <GunBubble color={colors.gunColor2} w={10} left={0} top={-10}/>
            <GunBubble color={colors.heroBulletColor1} w={10} left={0} top={5}/>
            <GunBubble color={colors.heroBulletColor1} w={10} left={0} top={1}/>
        </>
    ),

    heavyMachineGun: () => (
        <>
            <GunBubble color={colors.gunColor2} w={20} left={0} top={15}/>
            <GunBubble color={colors.heroBulletColor1} w={15} left={0} top={15}/>
            <GunBubble color={colors.gunColor2} w={10} left={6} top={8}/>
            <GunBubble color={colors.gunColor2} w={10} left={-6} top={8}/>
            <GunBubble color={colors.gunColor2} w={10} left={8} top={3}/>
            <GunBubble color={colors.gunColor2} w={10} left={-8} top={3}/>
            <GunBubble color={colors.gunColor2} w={10} left={8} top={-3}/>
            <GunBubble color={colors.gunColor2} w={10} left={-8} top={-3}/>
        </>
    ),

    rocketLauncher: () => (
        <>
            <GunBubble color={colors.gunColor2} w={14} left={0} top={15}/>
            <GunBubble color={colors.gunColor2} w={7} left={5} top={0}/>
            <GunBubble color={colors.gunColor2} w={7} left={-5} top={0}/>
            <GunBubble color={colors.gunColor2} w={7} left={6} top={5}/>
            <GunBubble color={colors.gunColor2} w={7} left={-6} top={5}/>
            <GunBubble color={colors.gunColor2} w={7} left={5} top={10}/>
            <GunBubble color={colors.gunColor2} w={7} left={-5} top={10}/>
            <GunBubble color={colors.heroBulletColor1} w={9} left={0} top={13}/>
        </>
    ),

    enemyGun: () => (
        <>
            <Bubble color={colors.orange} w={20} left={0} top={2}/>
            <Bubble color={colors.orange} w={12} left={0} top={-10}/>
        </>
    ),

    enemyHeavyGun: () => (
        <>
            <Bubble color={colors.orange} w={30} left={0} top={2}/>
            <Bubble color={colors.orange} w={20} left={0} top={-12}/>
        </>
    ),

    enemyMachineGun: () => (
        <>
            <Bubble color={colors.gunColor2} w={20} left={0} top={2}/>
            <Bubble color={colors.gunColor2} w={10} left={0} top={-10}/>
        </>
    ),

    minelayer: () => (
        <>
            <Bubble color={colors.gunColor2} w={15} left={12} top={0}/>
            <Bubble color={colors.gunColor2} w={15} left={-12} top={0}/>
            <Bubble color={colors.gunColor3} w={10} left={-6} top={-1} className={'anim-run'}/>
        </>
    )
};

export default gunArt;
