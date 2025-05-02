export type Characters = {
  name: string;
  role: string;
  iconSrc: string;
  portraitSrc?: string;
  perks?: {
    level: number;
    options: string[];
  }[];
}[];

export type Roles = {
  id: string;
  roleIcon: string | null;
  displayNameSingular: string;
  displayNamePlural: string;
}[];

export type Config = {
  header: string;
  logo: string | null;
  roles: Roles;
  characters: Characters;
};

export type ActiveHeroes = {
  [key: string]: boolean
}

export type HeroState = {
  characters: Characters,
  roles: Roles,
  config: object,
  activeHeroes: ActiveHeroes,
  heroHistory: string[],
  maxHeroRepeat: number
};

export type Action = {
  type: string,
  activeHeroes: object,
  heroName: string,
  maxHeroRepeat: number,
  config: Config,
  roleId: string,
  isActive: boolean
};
