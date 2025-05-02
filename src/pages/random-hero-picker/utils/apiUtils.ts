import { Config } from "@/src/globals/types";

export const getOverwatchConfig = async () => {
    try {
        const res = await fetch('/api/overwatchConfig');
        const config: Config = await res.json();
    
        return config;
    } catch (e) {
        console.log(e);

        return {};
    }
};