import { ReactElement, useContext } from "react";
import Image, { StaticImageData } from "next/image";
import owLogo from '@/public/images/overwatch/ow_logo_placeholder.svg';
import { AppContext } from "@/src/pages/random-hero-picker/context";
import StateActions from "@/src/pages/random-hero-picker/context/actions";
// import { HeroState } from "@/src/globals/types";

const HeroImage = (
    { name, iconSrc }: { name: string, iconSrc: string | StaticImageData | null }
) => {
    const { state, dispatch } = useContext(AppContext);

    const isActive = !!state.activeHeroes[name];

    const toggleHero = () => {
        dispatch(StateActions.toggleHeroAvailability(name));
    }

    let heroName: string | ReactElement[] = name;
    if (heroName.includes('_')) {
        const heroNameSegments = heroName.split('_');
        heroName = heroNameSegments.map((segment, index) => <span key={segment + index} className="inline-block">{segment}</span>)
    }

    return (
        <button
            className={`group relative w-fit sm:w-full box-shad hover:drop-shadow-[0_0_6px_white] rounded-sm flex flex-row items-center shrink-0 text-nowrap font-medium md:transition-all overflow-hidden cursor-pointer border-r-4 ${isActive ? 'bg-white text-black border-green-500' : 'bg-white/50 text-black/75 border-gray-400'}`}
            onClick={toggleHero}
        >
            <Image
                className={`w-20 h-20 md:w-12 md:h-12 transition-all ${isActive ? '' : 'opacity-75 grayscale-75'}`}
                src={iconSrc || owLogo}
                width="80"
                height="80"
                alt={`${name} headshot`}
            />
            <div className="max-md:absolute max-md:bg-white/25 max-md:drop-shadow-[0_0_3px_white] max-md:px-1 max-md:py-0.5 max-md:w-full bottom-0 left-0 md:pl-2 md:pr-2 font-semibold text-wrap text-left leading-none text-sm md:text-base">{heroName}</div>
        </button>
    );
};

export default HeroImage;
