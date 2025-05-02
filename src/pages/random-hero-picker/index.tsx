import { AppProvider } from "@rhp/context";
import RandomHeroPickerApp from "@rhp/components/App";

const RandomHeroPicker = () => {
    return (
        <AppProvider>
            <RandomHeroPickerApp />
        </AppProvider>
    )
}

export default RandomHeroPicker;
