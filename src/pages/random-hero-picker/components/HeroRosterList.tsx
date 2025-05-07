import HeroImage from "@rhp/components/HeroImage";
import Image, { StaticImageData } from "next/image";
import { useContext } from "react";
import { AppContext } from "../context";
import { Roles } from "@/src/globals/types";
import StateActions from "../context/actions";

type Roster = {
    name: string;
    role: string;
    iconSrc: string | StaticImageData | null;
};

export default function HeroRosterList({ roster }: { roster: Roster[] }) {
    const { state, dispatch } = useContext(AppContext);
    const roles: Roles = state.roles;

    const role = roster[0].role;
    const roleConfig = roles.find(({ id: roleId }) => roleId === role);

    return (
        <div>
            <div className="flex flex-col pb-4 gap-1 items-center sm:max-md:items-start md:flex-row md:gap-2">
                <div className="flex gap-2 items-center max-md:text-center">
                    {roleConfig?.roleIcon && <Image className="w-5 h-5" width={20} height={20} src={roleConfig.roleIcon} alt={roleConfig.id + ' icon'} aria-hidden />}
                    <h3 className="font-bold text-2xl">{roleConfig?.displayNamePlural || "Heroes"}</h3>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="bg-sky-700 text-white font-bold h-fit px-2 rounded-md text-sdm cursor-pointer hover:bg-sky-800 hover:scale-[1.02]"
                        onClick={() => dispatch(StateActions.setRoleAvailability(roleConfig?.id, true))}
                    >
                        Select All
                    </button>
                    <button
                        type="button"
                        className="bg-sky-700 text-white font-bold h-fit px-2 rounded-md text-sdsm cursor-pointer hover:bg-sky-800 hover:scale-[1.02]"
                        onClick={() => dispatch(StateActions.setRoleAvailability(roleConfig?.id, false))}
                    >
                        Deselect All
                    </button>
                </div>
            </div>
            <ul className=" gap-4 max-sm:flex max-sm:flex-wrap max-sm:justify-center sm:grid sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {roster.map((heroProps) => (
                    <li key={heroProps.name} className="">
                        <HeroImage {...heroProps} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
