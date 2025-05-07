import { HeroState } from "@/src/globals/types";
import { AppContext } from "@/src/pages/random-hero-picker/context";
import Image from "next/image";
import { useContext } from "react";

const ActiveHero = ({ className = '' }: { className?: string }) => {
    const { state }: { state: HeroState } = useContext(AppContext);
    const { heroHistory }: { heroHistory: string[] } = state;

    const activeHeroName = heroHistory[0];

    const currentHero = state.characters.find(({ name }: { name: string }) => name === activeHeroName);

    return (
        <div className={className}>
            {currentHero && <Image priority loading="eager" className="w-full border-2 border-white bg-white" width="300" height="300" src={currentHero.portraitSrc || currentHero.iconSrc} alt={currentHero.name + " portrait"} />}
            <h2 className="min-h-20 my-4 font-bold text-center text-3xl md:text-4xl">{activeHeroName?.replaceAll('_', '')}</h2>
        </div>
    );
};

export default ActiveHero;
