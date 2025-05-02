import { Config } from "@/src/globals/types";

const SET_CONFIGURATION = 'SET_CONFIGURATION';
const setConfiguration = (config: Config) => ({
    type: SET_CONFIGURATION,
    config
});

const SET_ACTIVE_HEROES = 'SET_ACTIVE_HEROES';
const setActiveHeroes = (activeHeroes: object) => ({
    type: SET_ACTIVE_HEROES,
    activeHeroes
});

const TOGGLE_HERO_AVAILABILITY = 'TOGGLE_HERO_AVAILABILITY';
const toggleHeroAvailability = (heroName: string) => ({
    type: TOGGLE_HERO_AVAILABILITY,
    heroName
});

const SET_ROLE_AVAILABILITY = 'SET_ROLE_AVAILABILITY';
const setRoleAvailability = (roleId: string, isActive: boolean = false) => ({
    type: SET_ROLE_AVAILABILITY,
    roleId,
    isActive
});

const RESET_ACTIVE_HEROES = 'RESET_ACTIVE_HEROES';
const resetActiveHeroes = () => ({
    type: RESET_ACTIVE_HEROES
});

const ADD_TO_HERO_HISTORY = 'ADD_TO_HERO_HISTORY';
const addToHeroHistory = (heroName: string) => ({
    type: ADD_TO_HERO_HISTORY,
    heroName
});

const CLEAR_HERO_HISTORY = 'CLEAR_HERO_HISTORY';
const clearHeroHistory = () => ({
    type: CLEAR_HERO_HISTORY
});

const SET_MAX_HERO_REPEAT = 'SET_MAX_HERO_REPEAT';
const setMaxHeroRepeat = (maxHeroRepeat: number) => ({
    type: SET_MAX_HERO_REPEAT,
    maxHeroRepeat
});

const StateActions = {
    SET_CONFIGURATION,
    setConfiguration,
    SET_ACTIVE_HEROES,
    setActiveHeroes,
    TOGGLE_HERO_AVAILABILITY,
    toggleHeroAvailability,
    SET_ROLE_AVAILABILITY,
    setRoleAvailability,
    RESET_ACTIVE_HEROES,
    resetActiveHeroes,
    ADD_TO_HERO_HISTORY,
    addToHeroHistory,
    CLEAR_HERO_HISTORY,
    clearHeroHistory,
    SET_MAX_HERO_REPEAT,
    setMaxHeroRepeat
}

export default StateActions;
