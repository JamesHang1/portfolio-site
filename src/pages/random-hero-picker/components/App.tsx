import { useContext, useEffect } from "react";
import { AppContext } from "@rhp/context";
import StateActions from "@rhp/context/actions";
import { getOverwatchConfig } from "@rhp/utils/apiUtils";
import HeroRosterList from "@rhp/components/HeroRosterList";
import HeroHistory from "@rhp/components/HeroHistory";
import ActiveHero from "@rhp/components/ActiveHero";
import { Characters, Roles } from "@/src/globals/types";
import Header from "./Header";
import GetHeroButton from "./GetHeroButton";

const configsList = [
    'Overwatch',
    'Marvel Rivals',
    'Apex Legends',
    'Valorant'
];

let renders = 0;

const RandomHeroPickerApp = () => {
    const { state, dispatch } = useContext(AppContext);
    const {
        characters,
        roles,
        heroHistory,
        maxHeroRepeat
    }: {
        characters: Characters,
        roles: Roles,
        heroHistory: string[],
        maxHeroRepeat: number
    } = state;

    // const [test, setTest] = useLocalStorage('test', 'testValue');

    useEffect(() => {
        (async function fetchData() {
            const config = await getOverwatchConfig();

            dispatch(StateActions.setConfiguration(config));
        })();
    }, []);

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
        <main className="mx-auto px-4 w-full xl:w-7xl">
            <Header />
            <div className="flex flex-wrap justify-center gap-x-6 mb-8 text-bold text-xl text-center text-sky-500">
                {configsList.map((configLink, index) => <a className="hocus:cursor-pointer hocus:underline" key={configLink + index} href={'/random-hero-picker?config=' + configLink.replaceAll(' ', '').toLowerCase()}>{configLink}</a>)}
            </div>
            {rosters && heroHistory.length
                ? (
                    <div className="flex flex-col sm:flex-row items-start justify-center gap-12 sm:gap-4 lg:gap-8">
                        <div className="max-xs:flex-col max-xs:items-center max-sm:flex max-sm:w-full max-sm:gap-4 grow-1 md:w-[30%] lg:w-1/4">
                            <div className="max-sm:flex-grow">
                                <ActiveHero />
                                <GetHeroButton />
                            </div>
                            <div className="max-sm:shrink-0 max-sm:w-fit sm:mt-4">
                                <h3 className="font-bold text-lg sm:text-xl">Max Repeat Count:</h3> 
                                <div className="flex flex-row gap-x-2 items-center">
                                    <button className="p-3 bg-black text-white border-white border-2 rounded-sm transition-all hover:border-sky-300" onClick={() => updateMaxHeroRepeat(true)}>
                                        <div className="border-[16px] border-x-[12px] border-x-black/0 border-t-sky-500 border-b-0 my-1" />
                                    </button>
                                    <div className="text-center text-5xl min-w-14">{maxHeroRepeat}</div>
                                    <button className="p-3 bg-black text-white border-white border-2 rounded-sm transition-all hover:border-sky-300" onClick={() => updateMaxHeroRepeat()}>
                                        <div className="border-[16px] border-x-[12px] border-x-black/0 border-b-sky-500 border-t-0 my-1" />
                                    </button>
                                </div>
                                <HeroHistory className="mt-4" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 justify-center shrink-0 md:w-[70%] lg:w-3/4">
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
