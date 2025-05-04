import { useContext, useEffect } from "react";
import GenericUtils from "@@/globals/genericUtils";
import { AppContext } from "@rhp/context";
import StateActions from "@rhp/context/actions";
import { getOverwatchConfig } from "@rhp/utils/apiUtils";
import HeroRosterList from "@rhp/components/HeroRosterList";
import HeroHistory from "@rhp/components/HeroHistory";
import ActiveHero from "@rhp/components/ActiveHero";
import { Characters, Roles } from "@/src/globals/types";
import Header from "./Header";

const configsList = [
    'Overwatch',
    'Marvel Rivals',
    'Apex Legends',
    'Valorant'
];

let renders = 0;

type ActiveHeroes = {
    [key: string]: boolean
}

const RandomHeroPickerApp = () => {
    const { state, dispatch } = useContext(AppContext);
    const {
        characters,
        roles,
        activeHeroes,
        heroHistory,
        maxHeroRepeat
    }: {
        characters: Characters,
        roles: Roles,
        activeHeroes: ActiveHeroes,
        heroHistory: string[],
        maxHeroRepeat: number
    } = state;

    // const [test, setTest] = useLocalStorage('test', 'testValue');

    const maxHeroHistoryLength = Math.min(heroHistory.length, maxHeroRepeat);
    const nonRepeatList = heroHistory.slice(0, maxHeroHistoryLength);

    useEffect(() => {
        (async function fetchData() {
            const config = await getOverwatchConfig();

            dispatch(StateActions.setConfiguration(config));
        })()
    }, []);

    useEffect(() => {
        if (characters.length) {
            getRandomHero();
        }
    }, [characters])

    const getRandomHero = () => {
        const validHeroes = Object.entries(activeHeroes).filter(([heroName, isActive]) => !nonRepeatList.includes(heroName) && isActive);

        const heroIndex = GenericUtils.getRandomInt(0, validHeroes.length - 1);
        const newRandomHero = validHeroes[heroIndex]?.[0];

        if (newRandomHero) {
            dispatch(StateActions.addToHeroHistory(newRandomHero));
        }
    };

    const updateMaxHeroRepeat = (decrease?: boolean) => {
        const newMaxHeroRepeat = decrease ? maxHeroRepeat - 1 : maxHeroRepeat + 1;

        dispatch(StateActions.setMaxHeroRepeat(newMaxHeroRepeat));
    };

    console.log('renders:', ++renders);

    let rosters;
    if (characters.length && roles.length) {
        rosters = roles.map(({ id: roleId }) => characters.filter(({ role }) => role === roleId));
    }

    return (
        <main className="mx-auto p-4 w-full xl:w-7xl">
            <Header />
            <div className="mb-8 text-bold text-xl text-center text-sky-500">
                {configsList.map((configLink, index) => <a className="not-last:pr-4 hocus:cursor-pointer hocus:underline" key={configLink + index} href={'/random-hero-picker?config=' + configLink.replaceAll(' ', '').toLowerCase()}>{configLink}</a>)}
            </div>
            {rosters && heroHistory.length
                ? (
                    <div className="flex flex-col sm:flex-row items-start justify-center gap-4 md:gap-6 lg:gap-8">
                        <div className="md:w-1/4">
                            <ActiveHero />
                            <button className="bg-black border-white hover:bg-blue-950 text-white border-2 rounded-s hover:border-gray-500 transition-all py-4 px-6 my-8 font-bold text-2xl" onClick={getRandomHero}>Get Random Hero</button>
                            <div>
                                <strong>Max Repeat Count:</strong> {maxHeroRepeat}
                                <div className="flex flex-row gap-x-2">
                                    <button className="bg-black border-white hover:bg-blue-950 text-white border-2 rounded-s hover:border-gray-500 transition-all p-2" onClick={() => updateMaxHeroRepeat()}>&#9650;</button>
                                    <button className="bg-black border-white hover:bg-blue-950 text-white border-2 rounded-s hover:border-gray-500 transition-all p-2" onClick={() => updateMaxHeroRepeat(true)}>&#9660;</button>
                                </div>
                            </div>
                            <HeroHistory className="mt-4" />
                        </div>
                        <div className="flex flex-col gap-8 justify-center shrink-0 md:w-3/4">
                            {rosters.map((roleRoster, index) => <HeroRosterList key={roleRoster[0].role + index} roster={roleRoster} />)}
                        </div>
                    </div>
                )
                : <div className="fixed top-1/2 left-1/2 -translate-10 w-20 h-20 border-[16px] border-l-black/0 rounded-full z-50 animate-spin" aria-label="Loading" />
            }
        </main>
    )
}

export default RandomHeroPickerApp;
