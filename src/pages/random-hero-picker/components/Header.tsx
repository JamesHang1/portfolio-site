import { useContext } from "react";
import { AppContext } from "../context";

export default function Header() {
    const { state } = useContext(AppContext);
    const headerText = state?.config?.header || "Hero Picker";

    return <h1 className="pt-8 pb-1 text-4xl font-bold flex justify-center">Random {headerText}</h1>;
}
