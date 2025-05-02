import { AppContext } from "@/src/pages/random-hero-picker/context";
import StateActions from "@/src/pages/random-hero-picker/context/actions";
import { useContext } from "react";

const HeroHistory = ({ className = '' }: { className?: string }) => {
    const { state, dispatch } = useContext(AppContext);
    const {
        heroHistory,
        maxHeroRepeat
    }: {
        activeHeroes: object,
        heroHistory: string[],
        maxHeroRepeat: number
    } = state;

    const maxHeroHistoryLength = Math.min(heroHistory.length, maxHeroRepeat);
    const nonRepeatList = heroHistory.slice(0, maxHeroHistoryLength);

    const clearHeroHistory = () => {
        dispatch(StateActions.clearHeroHistory());
    };

    return (
        <div className={className}>
            <h4 className="text-bold text-2xl font-bold">History:</h4>
            <ul>
                {nonRepeatList.slice(1).map((name, i) => <li key={name + i}>&bull; {name}</li>)}
            </ul>
            <button
                className="px-2 py-1 mt-4 bg-black border-white hover:bg-blue-950 text-white border-2 rounded-s hover:border-gray-500 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
                onClick={clearHeroHistory}
                disabled={heroHistory.length <= 1}
            >
                Clear History
            </button>
        </div>
    );
};

export default HeroHistory;