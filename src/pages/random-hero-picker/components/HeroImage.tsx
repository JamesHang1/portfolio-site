import { useContext } from "react";
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

    return (
        <button
            className={`w-fit sm:w-full box-shad hocus:drop-shadow-[0_0_6px_white] rounded-sm flex flex-row items-center shrink-0 text-nowrap font-medium transition-all overflow-hidden cursor-pointer border-r-4 ${isActive ? 'bg-white text-black border-green-500' : 'bg-white/50 text-black/75 border-gray-400'}`}
            onClick={toggleHero}
        >
            <Image
                className={`transition-all ${isActive ? '' : 'opacity-75 grayscale-75'}`}
                src={iconSrc || owLogo}
                width="50"
                height="50"
                alt={`${name} headshot`}
            />
            <div className="pl-2 pr-4 font-semibold text-wrap text-left leading-none hidden md:block [font-size:clamp(14px,1.9vw,16px)]">{name}</div>
        </button>
    );
};

export default HeroImage;
