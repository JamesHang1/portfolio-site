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
            <h2 className="font-bold text-4xl">{activeHeroName?.replaceAll('_', '')}</h2>
            {currentHero && <Image className="mt-2 w-full border-2 border-white bg-white" width="200" height="200" src={currentHero.portraitSrc || currentHero.iconSrc} alt={currentHero.name + " portrait"} />}
        </div>
    );
};

export default ActiveHero;
