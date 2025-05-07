import { Action, ActiveHeroes, Characters, Roles, HeroState as State } from '@@/globals/types';
import StateActions from './actions';
import GenericUtils from '@/src/globals/genericUtils';

export const INITIAL_STATE: State = {
  characters: [],
  roles: [],
  config: {},
  activeHeroes: {},
  heroHistory: [],
  maxHeroRepeat: 5
};

const StateReducers = (state: State, action: Action) => {
  switch (action.type) {
    case StateActions.SET_CONFIGURATION:
      const {
        characters,
        roles,
        ...config
      }: {
        characters: Characters,
        roles: Roles
      } = action.config
      
      const activeHeroes: ActiveHeroes = {};
      characters.forEach(({ name }: { name: string }) => {
        activeHeroes[name] = true;
      });

      const randomHero = characters[GenericUtils.getRandomInt(0, characters.length - 1)].name;
      const heroHistory = [randomHero];

      return {
        ...state,
        characters,
        roles,
        config,
        activeHeroes,
        heroHistory
      };
    case StateActions.SET_ACTIVE_HEROES:
      return {
        ...state,
        activeHeroes: action.activeHeroes
      };
    case StateActions.TOGGLE_HERO_AVAILABILITY:
      const toggledHeroBool = !state.activeHeroes[action.heroName];

      return {
        ...state,
        activeHeroes: {
          ...state.activeHeroes,
          [action.heroName]: toggledHeroBool
        }
      };
    case StateActions.SET_ROLE_AVAILABILITY:
      const activeRoleHeroes: ActiveHeroes = {};
      const charactersWithRole = state.characters.filter(({ role }) => action.roleId === role );
      charactersWithRole.forEach(({ name }: { name: string }) => {
        activeRoleHeroes[name] = action.isActive;
      });

      return {
        ...state,
        activeHeroes: {
          ...state.activeHeroes,
          ...activeRoleHeroes
        }
      };
    case StateActions.RESET_ACTIVE_HEROES:
      const resetActiveHeroes: ActiveHeroes = {};
      Object.keys(state.activeHeroes).forEach((key) => {
        resetActiveHeroes[key] = true;
      });

      return {
        ...state,
        activeHeroes: resetActiveHeroes
      };
    case StateActions.ADD_TO_HERO_HISTORY:
      const addHeroHistory = [...state.heroHistory];
      addHeroHistory.unshift(action.heroName);

      return {
        ...state,
        heroHistory: addHeroHistory
      };
    case StateActions.CLEAR_HERO_HISTORY:
      return {
        ...state,
        heroHistory: state.heroHistory.slice(0, 1)
      };
    case StateActions.SET_MAX_HERO_REPEAT:
      const newMaxHeroRepeat = Math.min(Math.max(action.maxHeroRepeat, 1), Object.keys(state.activeHeroes).length - 1);

      return {
        ...state,
        maxHeroRepeat: newMaxHeroRepeat
      };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export default StateReducers;
