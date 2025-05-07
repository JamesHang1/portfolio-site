import { useContext } from "react";
import GenericUtils from "@@/globals/genericUtils";
import { ActiveHeroes } from "@@/globals/types";
import { AppContext } from "../context";
import StateActions from "../context/actions";

export default function GetHeroButton({ className }: { className?: string}) {
    const { state, dispatch } = useContext(AppContext);
    const {
        activeHeroes,
        heroHistory,
        maxHeroRepeat
    }: {
        activeHeroes: ActiveHeroes,
        heroHistory: string[],
        maxHeroRepeat: number
    } = state;

    const getRandomHero = () => {
        const maxHeroHistoryLength = Math.min(heroHistory.length, maxHeroRepeat);
        const nonRepeatList = heroHistory.slice(0, maxHeroHistoryLength);
        const validHeroes = Object.entries(activeHeroes).filter(([heroName, isActive]) => !nonRepeatList.includes(heroName) && isActive);

        const heroIndex = GenericUtils.getRandomInt(0, validHeroes.length - 1);
        const newRandomHero = validHeroes[heroIndex]?.[0];

        if (newRandomHero) {
            dispatch(StateActions.addToHeroHistory(newRandomHero));
        }
    };

    return (
        <button
            className={`${className} bg-sky-700 border-2 border-white text-white font-bold rounded-sm cursor-pointer p-4 w-full text-xl hover:border-sky-300 hover:bg-sky-800`}
            onClick={getRandomHero}
        >
            Get Random Hero
        </button>
    );
}
